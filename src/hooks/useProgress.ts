import { useState, useEffect, useCallback } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const READING_MODULES = [
  'Bienvenida SENA',
  'Conoce tu institución',
  'Derechos y Deberes',
  'Acuerdo 009: Proceso Formativo',
  'Proceso de Certificación',
];

const STORAGE_KEY = 'sena_induction_completed_modules';
const EXAM_RESULT_KEY = 'sena_induction_exam_result';
const EVENT_NAME = 'sena_progress_updated';

function getStoredModules(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getStoredExam(): { score: number; passed: boolean } | null {
  try {
    const raw = localStorage.getItem(EXAM_RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function useProgress() {
  const [completedModules, setCompletedModules] = useState<string[]>(getStoredModules);
  const [examResult, setExamResult] = useState<{ score: number; passed: boolean } | null>(getStoredExam);
  const [loading, setLoading] = useState(false);

  // Sync state whenever other components trigger changes
  useEffect(() => {
    const handleUpdate = () => {
      setCompletedModules(getStoredModules());
      setExamResult(getStoredExam());
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Sync from Firestore if available
  useEffect(() => {
    const syncFromFirestore = async () => {
      const uid = auth.currentUser?.uid || localStorage.getItem('sena_guest_uid');
      if (!uid) return;

      try {
        const docRef = doc(db, 'userProgress', uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data.completedModules)) {
            const combined = Array.from(new Set([...getStoredModules(), ...data.completedModules]));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
            setCompletedModules(combined);
          }
          if (typeof data.examScore === 'number') {
            const examData = { score: data.examScore, passed: !!data.examPassed };
            localStorage.setItem(EXAM_RESULT_KEY, JSON.stringify(examData));
            setExamResult(examData);
          }
        }
      } catch (err) {
        console.warn('Firestore progress sync fallback to localStorage:', err);
      }
    };

    syncFromFirestore();
  }, []);

  const markModuleComplete = useCallback(async (moduleName: string) => {
    const current = getStoredModules();
    if (!current.includes(moduleName)) {
      const updated = [...current, moduleName];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setCompletedModules(updated);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));

      // Attempt background Firestore sync
      try {
        let uid = auth.currentUser?.uid || localStorage.getItem('sena_guest_uid');
        if (!uid) {
          uid = 'guest_' + Math.random().toString(36).substring(2, 9);
          localStorage.setItem('sena_guest_uid', uid);
        }
        const docRef = doc(db, 'userProgress', uid);
        await setDoc(docRef, { userId: uid, completedModules: updated, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (err) {
        console.warn('Firestore write warning (saved locally):', err);
      }
    }
  }, []);

  const saveExamResult = useCallback(async (score: number, passed: boolean) => {
    const payload = { score, passed };
    localStorage.setItem(EXAM_RESULT_KEY, JSON.stringify(payload));
    setExamResult(payload);
    window.dispatchEvent(new CustomEvent(EVENT_NAME));

    try {
      let uid = auth.currentUser?.uid || localStorage.getItem('sena_guest_uid');
      if (!uid) {
        uid = 'guest_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('sena_guest_uid', uid);
      }
      const docRef = doc(db, 'userProgress', uid);
      await setDoc(docRef, { userId: uid, examScore: score, examPassed: passed, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.warn('Firestore write exam warning:', err);
    }
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXAM_RESULT_KEY);
    setCompletedModules([]);
    setExamResult(null);
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }, []);

  const isModuleCompleted = useCallback((name: string) => {
    return completedModules.includes(name);
  }, [completedModules]);

  // Compute percentage based on reading modules (total 5)
  const completedReadingCount = completedModules.filter(m => READING_MODULES.includes(m)).length;
  const progressPercentage = Math.round((completedReadingCount / READING_MODULES.length) * 100);
  const isAllReadingsCompleted = completedReadingCount >= READING_MODULES.length;

  return {
    completedModules,
    markModuleComplete,
    isModuleCompleted,
    progressPercentage,
    completedReadingCount,
    totalReadingModules: READING_MODULES.length,
    isAllReadingsCompleted,
    examResult,
    saveExamResult,
    resetProgress,
    loading,
  };
}

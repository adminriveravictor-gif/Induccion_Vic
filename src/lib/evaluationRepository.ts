import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

export interface ApprenticeProfile {
  documento: string;
  tipoDocumento: string;
  nombreCompleto: string;
  ficha: string;
  email?: string;
  telefono?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemizedResponse {
  questionIndex: number;
  type: 'mc' | 'tf';
  questionText: string;
  context?: string;
  userAnswer: number | boolean;
  correctAnswer: number | boolean;
  userAnswerText: string;
  correctAnswerText: string;
  isCorrect: boolean;
  explanation: string;
}

export interface EvaluationRecord {
  id: string;
  documento: string;
  nombreCompleto: string;
  ficha: string;
  regional?: string;
  centro?: string;
  modalidad?: string;
  jornada?: string;
  nivel?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
  responses: ItemizedResponse[];
}

const APPRENTICE_STORAGE_KEY = 'sena_apprentice_profile';
const EVALUATION_REPO_STORAGE_KEY = 'sena_evaluations_repo';
const EVALUATION_EVENT = 'sena_evaluation_stored';

// ==========================================
// 1. GESTIÓN DEL PERFIL BÁSICO DEL APRENDIZ
// ==========================================

export function getLocalApprenticeProfile(): ApprenticeProfile | null {
  try {
    const raw = localStorage.getItem(APPRENTICE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveApprenticeProfile(profile: Omit<ApprenticeProfile, 'createdAt' | 'updatedAt'>): Promise<ApprenticeProfile> {
  const existing = getLocalApprenticeProfile();
  const fullProfile: ApprenticeProfile = {
    ...profile,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Guardar de inmediato en almacenamiento local para respuesta instantánea
  localStorage.setItem(APPRENTICE_STORAGE_KEY, JSON.stringify(fullProfile));

  // 2. Sincronización asíncrona en Firestore
  try {
    const docRef = doc(db, 'apprentices', profile.documento.trim());
    await setDoc(docRef, fullProfile, { merge: true });
  } catch (err) {
    console.warn('Advertencia guardando perfil en Firestore (guardado en caché local):', err);
  }

  return fullProfile;
}

// =======================================================
// 2. REPOSITORIO DE EVALUACIONES Y RESPUESTAS DETALLADAS
// =======================================================

export function getLocalEvaluations(): EvaluationRecord[] {
  try {
    const raw = localStorage.getItem(EVALUATION_REPO_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Guarda una evaluación completa con todas las respuestas detalladas.
 * Estrategia híbrida: persistencia local inmediata + sincronización en Firestore.
 */
export async function saveEvaluationRecord(
  data: Omit<EvaluationRecord, 'id' | 'submittedAt'>
): Promise<EvaluationRecord> {
  const recordId = `eval_${data.documento}_${Date.now()}`;
  const record: EvaluationRecord = {
    ...data,
    id: recordId,
    submittedAt: new Date().toISOString(),
  };

  // 1. Guardar de inmediato en LocalStorage
  const currentList = getLocalEvaluations();
  const updatedList = [record, ...currentList];
  localStorage.setItem(EVALUATION_REPO_STORAGE_KEY, JSON.stringify(updatedList));

  // Disparar evento para que la interfaz se actualice reactivamente
  window.dispatchEvent(new CustomEvent(EVALUATION_EVENT, { detail: record }));

  // 2. Guardar en Firestore en la colección 'evaluations'
  try {
    const evalDocRef = doc(db, 'evaluations', recordId);
    await setDoc(evalDocRef, record);
  } catch (err) {
    console.warn('Advertencia al guardar en Firestore (respuestas almacenadas en repositorio local):', err);
  }

  return record;
}

/**
 * Consulta las evaluaciones de un aprendiz por documento o ficha
 */
export async function fetchEvaluationsByDocumento(documento: string): Promise<EvaluationRecord[]> {
  const local = getLocalEvaluations().filter(e => e.documento.trim() === documento.trim());

  try {
    const q = query(
      collection(db, 'evaluations'),
      where('documento', '==', documento.trim()),
      limit(20)
    );
    const snap = await getDocs(q);
    const remoteList: EvaluationRecord[] = [];
    snap.forEach(docSnap => {
      remoteList.push(docSnap.data() as EvaluationRecord);
    });

    if (remoteList.length > 0) {
      // Combinar sin duplicados
      const ids = new Set(local.map(l => l.id));
      const combined = [...local];
      remoteList.forEach(r => {
        if (!ids.has(r.id)) {
          combined.push(r);
        }
      });
      // Ordenar por fecha descendente
      combined.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      localStorage.setItem(EVALUATION_REPO_STORAGE_KEY, JSON.stringify(combined));
      return combined;
    }
  } catch (err) {
    console.warn('Lectura remota fallida, usando repositorio local:', err);
  }

  return local;
}

/**
 * Obtiene todas las evaluaciones registradas (para el panel repositorio)
 */
export async function fetchAllEvaluations(): Promise<EvaluationRecord[]> {
  const local = getLocalEvaluations();

  try {
    const q = query(
      collection(db, 'evaluations'),
      orderBy('submittedAt', 'desc'),
      limit(50)
    );
    const snap = await getDocs(q);
    const remoteList: EvaluationRecord[] = [];
    snap.forEach(docSnap => {
      remoteList.push(docSnap.data() as EvaluationRecord);
    });

    if (remoteList.length > 0) {
      const ids = new Set(local.map(l => l.id));
      const combined = [...local];
      remoteList.forEach(r => {
        if (!ids.has(r.id)) {
          combined.push(r);
        }
      });
      combined.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      localStorage.setItem(EVALUATION_REPO_STORAGE_KEY, JSON.stringify(combined));
      return combined;
    }
  } catch (err) {
    console.warn('Lectura general remota fallida, usando repositorio local:', err);
  }

  return local;
}

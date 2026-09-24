import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Home from './pages/Home';
import ApprenticeRegistration from './pages/ApprenticeRegistration';
import Diagnosis from './pages/Diagnosis';
import Induction from './pages/Induction';
import CourseViewer from './pages/CourseViewer';
import FinalExam from './pages/FinalExam';
import EvaluationRepository from './pages/EvaluationRepository';

function DarkModeButton() {
  // Initialize with dark mode forced as requested
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('sena_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    // Default forced dark mode
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sena_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sena_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Modo Oscuro activo (clic para modo claro)" : "Modo Claro activo (clic para modo oscuro)"}
      aria-label="Alternar modo oscuro y claro"
      className="fixed top-4 right-4 z-50 p-3 rounded-full text-white shadow-xl backdrop-blur-md border border-white/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
      style={{
        backgroundColor: 'rgb(57, 169, 0)',
        boxShadow: '0 4px 14px 0 rgba(57, 169, 0, 0.4)',
      }}
    >
      {/*
        "que en el modo claro se habilite el sol y en el modo oscuro se habilite la luna,
        asegúrate de que al dar clic allí, efectivamente se cambie el modo"
      */}
      {isDark ? (
        <Moon size={22} className="text-white drop-shadow" />
      ) : (
        <Sun size={22} className="text-white drop-shadow" />
      )}
    </button>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-[#39A900] selection:text-white">
        <DarkModeButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<ApprenticeRegistration />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/induction" element={<Induction />} />
          <Route path="/course/:moduleName" element={<CourseViewer />} />
          <Route path="/exam" element={<FinalExam />} />
          <Route path="/repository" element={<EvaluationRepository />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

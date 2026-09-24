import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ArrowRight, ShieldCheck, Database, MapPin, UserCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { getLocalApprenticeProfile, ApprenticeProfile, getLocalEvaluations } from '../lib/evaluationRepository';

export default function Home() {
  const [profile, setProfile] = useState<ApprenticeProfile | null>(null);
  const [evaluationCount, setEvaluationCount] = useState<number>(0);

  useEffect(() => {
    setProfile(getLocalApprenticeProfile());
    setEvaluationCount(getLocalEvaluations().length);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center px-4 py-10 transition-colors">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-10 transition-all">
        {/* Banner Institucional SENA */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0"
            style={{ backgroundColor: 'rgb(57, 169, 0)' }}
          >
            <GraduationCap size={28} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#39A900] dark:text-[#52c41a]">
              SENA • Formación Profesional Integral
            </span>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Inducción y Reglamento del Aprendiz
            </h2>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Entorno Interactivo de Inducción: <br />
          <span className="text-[#39A900] dark:text-[#52c41a]">Acuerdo 009 de 2024</span>
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          Bienvenido a la plataforma formativa del SENA. Completa tus datos básicos, realiza tu caracterización institucional, comprende tus derechos y deberes y presenta la evaluación de certificación.
        </p>

        {/* Tarjeta de Aprendiz Registrado (si existe en almacenamiento) */}
        {profile ? (
          <div className="mt-5 p-4 rounded-2xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0">
                <UserCheck size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#39A900] dark:text-green-400 block">
                  Aprendiz Vinculado
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                  {profile.nombreCompleto}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mt-0.5">
                  {profile.tipoDocumento}: {profile.documento} • Ficha: {profile.ficha}
                </p>
              </div>
            </div>
            <Link
              to="/register"
              className="text-xs font-bold text-[#39A900] hover:underline self-end sm:self-center"
            >
              Editar datos
            </Link>
          </div>
        ) : (
          <div className="mt-5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <UserCheck size={20} />
            </div>
            <div className="text-xs">
              <span className="font-bold text-amber-900 dark:text-amber-200 block text-sm">
                Paso Previo Obligatorio
              </span>
              <p className="text-amber-800 dark:text-amber-300 mt-0.5">
                Debes registrar primero tu nombre, número de documento y ficha de caracterización antes de realizar el diagnóstico.
              </p>
            </div>
          </div>
        )}

        {/* Ruta del Proceso Formativo (4 Pasos) */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex flex-col items-center text-center">
            <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center text-[10px] mb-1 font-bold">1</span>
            <span>Registro Datos</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex flex-col items-center text-center">
            <span className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 flex items-center justify-center text-[10px] mb-1 font-bold">2</span>
            <span>Diagnóstico</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex flex-col items-center text-center">
            <span className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 flex items-center justify-center text-[10px] mb-1 font-bold">3</span>
            <span>5 Módulos</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex flex-col items-center text-center">
            <span className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 flex items-center justify-center text-[10px] mb-1 font-bold">4</span>
            <span>Evaluación</span>
          </div>
        </div>

        {/* Botones Principales de Acción */}
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            to="/register"
            className="flex-1 py-3.5 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: 'rgb(57, 169, 0)' }}
          >
            {profile ? 'Ver / Modificar Registro' : '1. Iniciar con Registro del Aprendiz'}
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/diagnosis"
            className="py-3.5 px-5 rounded-xl border border-gray-300 dark:border-gray-600 font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center text-sm"
          >
            2. Ir al Diagnóstico
          </Link>
        </div>

        {/* Acceso Directo al Repositorio de Respuestas y Evaluaciones */}
        <div className="mt-5 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-900 text-amber-400 dark:bg-gray-800 flex items-center justify-center shrink-0">
              <Database size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                  Repositorio de Respuestas y Evaluaciones
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-[#39A900]/10 text-[#39A900] text-[10px] font-black uppercase">
                  {evaluationCount} guardadas
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Almacenamiento seguro, trazabilidad de fichas y descarga de resultados en CSV / JSON.
              </p>
            </div>
          </div>
          <Link
            to="/repository"
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold text-xs shadow transition-colors text-center shrink-0 inline-flex items-center justify-center gap-1.5"
          >
            <Database size={14} className="text-amber-400" /> Consultar Repositorio
          </Link>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ShieldCheck size={14} className="text-[#39A900]" />
          <span>Reglamento del Aprendiz SENA • Acuerdo 009 de 2024</span>
        </div>
      </div>
    </div>
  );
}

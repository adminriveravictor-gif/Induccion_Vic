import { Link, useNavigate } from 'react-router-dom';
import { useProgress, READING_MODULES } from '../hooks/useProgress';
import { CheckCircle2, Lock, ArrowRight, Award, RotateCcw, BookOpen, FileCheck, MapPin, Sparkles, Database, User, IdCard, Hash } from 'lucide-react';
import { getLocalApprenticeProfile } from '../lib/evaluationRepository';

export default function Induction() {
  const navigate = useNavigate();
  const {
    completedModules,
    isModuleCompleted,
    progressPercentage,
    completedReadingCount,
    totalReadingModules,
    isAllReadingsCompleted,
    examResult,
    resetProgress,
  } = useProgress();

  const apprenticeProfile = getLocalApprenticeProfile();

  const diagnosisData = (() => {
    try {
      const saved = localStorage.getItem('sena_diagnosis_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();

  const contenido = {
    titulo: 'Módulo de Inducción Integral (Acuerdo 009 de 2024)',
    descripcion: 'Programa formativo oficial para aprendices e instructores SENA. Conoce la estructura nacional de las 33 Regionales y sus Centros de Formación, tus derechos, deberes, prohibiciones y el proceso de evaluación y certificación según el nuevo reglamento institucional.',
    modulos: READING_MODULES,
  };

  const getModuleDescription = (index: number) => {
    switch (index) {
      case 0:
        return 'Propósito, principios orientadores y comunidad educativa SENA';
      case 1:
        return 'Mapa interactivo de Colombia: 33 Regionales y más de 118 Centros de Formación';
      case 2:
        return 'Módulo interactivo: 24 derechos, 24 deberes y 14 prohibiciones, prueba de conocimientos y refuerzo pedagógico';
      case 3:
        return 'Etapas lectiva y productiva, juicios evaluativos y novedades de formación';
      case 4:
        return 'Requisitos indispensables para titulación y régimen sancionatorio';
      default:
        return '';
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 transition-colors pb-20">
      {/* Encabezado */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] dark:text-[#52c41a] mb-2">
            <BookOpen size={16} /> Inducción General SENA • Presencia Nacional
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#39A900] dark:text-[#52c41a] tracking-tight">
            {contenido.titulo}
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            {contenido.descripcion}
          </p>
        </div>

        <Link
          to="/repository"
          className="self-start md:self-center px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white dark:bg-gray-700 dark:hover:bg-gray-600 text-xs font-bold shadow-md transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Database size={15} className="text-amber-400" />
          <span>Repositorio de Respuestas</span>
        </Link>
      </div>

      {/* Tarjeta de Aprendiz Registrado y Caracterizado */}
      {(apprenticeProfile || diagnosisData?.regional) && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50/60 dark:from-green-950/40 dark:to-gray-800 border border-green-200 dark:border-green-800/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0 shadow-sm">
              <User size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#39A900] dark:text-[#52c41a] uppercase tracking-wide">
                  Aprendiz: {apprenticeProfile?.nombreCompleto || 'Registrado'}
                </span>
                {apprenticeProfile?.ficha && (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/60 text-green-900 dark:text-green-200 font-mono font-bold">
                    Ficha: {apprenticeProfile.ficha}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                {apprenticeProfile && (
                  <span className="font-mono text-[11px]">
                    {apprenticeProfile.tipoDocumento}: {apprenticeProfile.documento}
                  </span>
                )}
                {diagnosisData?.regional && (
                  <span className="ml-2 font-medium text-gray-700 dark:text-gray-200">
                    • Regional {diagnosisData.regional} {diagnosisData.centro ? `(${diagnosisData.centro})` : ''}
                  </span>
                )}
                {diagnosisData?.modalidad && (
                  <span className="ml-1 text-gray-500 dark:text-gray-400">
                    • {diagnosisData.modalidad}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-center">
            <Link
              to="/register"
              className="text-xs font-semibold text-[#39A900] dark:text-green-400 hover:underline"
            >
              Editar registro
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              to="/diagnosis"
              className="text-xs font-semibold text-[#39A900] dark:text-green-400 hover:underline"
            >
              Editar diagnóstico
            </Link>
          </div>
        </div>
      )}

      {/* Barra de Progreso Principal */}
      <div className="mb-8 p-5 bg-gray-50 dark:bg-gray-700/60 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FileCheck className="text-[#39A900]" size={20} />
            Tu Avance de Formación
          </span>
          <span className="text-xl font-extrabold text-[#39A900] dark:text-[#52c41a]">
            {progressPercentage}%
          </span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-600 h-4 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-[#39A900] h-full rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{completedReadingCount} de {totalReadingModules} módulos de lectura completados</span>
          <span>{isAllReadingsCompleted ? '✓ Lecturas completadas al 100%' : 'Faltan lecturas para el examen final'}</span>
        </div>
      </div>

      {/* Botón Iniciar o Continuar Curso */}
      <div className="flex flex-wrap gap-4 items-center mb-10">
        <button
          onClick={() => {
            const firstPending = READING_MODULES.find(m => !completedModules.includes(m)) || READING_MODULES[0];
            navigate(`/course/${encodeURIComponent(firstPending)}`);
          }}
          className="bg-[#39A900] text-white px-7 py-3.5 rounded-xl font-bold hover:bg-[#2d8700] shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 text-base"
        >
          {progressPercentage === 0
            ? 'Iniciar Inducción'
            : isAllReadingsCompleted
            ? 'Repasar Módulos'
            : 'Continuar Inducción'}
          <ArrowRight size={18} />
        </button>

        {progressPercentage > 0 && (
          <button
            onClick={() => {
              if (confirm('¿Estás seguro de reiniciar todo el progreso a 0%?')) {
                resetProgress();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-300"
          >
            <RotateCcw size={14} /> Reiniciar avance (0%)
          </button>
        )}
      </div>

      {/* Lista de Módulos a Realizar */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          Módulos del Curso (en orden secuencial):
        </h2>

        <div className="space-y-3">
          {contenido.modulos.map((modulo, index) => {
            const completed = isModuleCompleted(modulo);
            const isMapModule = modulo === 'Conoce tu institución';
            const isRightsModule = modulo === 'Derechos y Deberes';

            return (
              <Link
                key={index}
                to={`/course/${encodeURIComponent(modulo)}`}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  completed
                    ? 'border-green-300 dark:border-green-800/60 bg-green-50/40 dark:bg-green-950/20 hover:border-green-500'
                    : isMapModule
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-[#39A900]'
                    : isRightsModule
                    ? 'border-purple-300 dark:border-purple-800/70 bg-purple-50/30 dark:bg-purple-950/20 hover:border-purple-500'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700/40 hover:border-[#39A900] dark:hover:border-[#52c41a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm flex items-center justify-center group-hover:bg-[#39A900] group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base text-gray-800 dark:text-gray-200 group-hover:text-[#39A900] dark:group-hover:text-[#52c41a] transition-colors">
                        {modulo}
                      </h3>
                      {isMapModule && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center gap-1">
                          <MapPin size={10} /> Mapa Nacional
                        </span>
                      )}
                      {isRightsModule && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 flex items-center gap-1">
                          <Sparkles size={10} /> Interactivo + Test
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {getModuleDescription(index)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {completed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                      <CheckCircle2 size={14} /> Leído
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-[#39A900] transition-colors font-medium">
                      Leer ➔
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Módulo Final: Evaluación Final */}
          <div className="pt-3">
            {isAllReadingsCompleted ? (
              <Link
                to="/exam"
                className="p-5 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all flex items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center">
                    <Award size={20} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-lg text-amber-900 dark:text-amber-200">
                        Evaluación Final de Validación (25 Preguntas)
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 uppercase">
                        Habilitado
                      </span>
                    </div>
                    <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                      15 preguntas de selección múltiple + 10 de verdadero/falso (incluye preguntas sobre las 33 Regionales SENA). Requiere mínimo 90% para certificar.
                    </p>
                    {examResult && (
                      <p className="text-xs font-bold mt-1 text-[#39A900]">
                        {examResult.passed ? '✓ Aprobado anteriormente con ' : 'Intento previo: '}
                        {examResult.score}/25 aciertos ({Math.round((examResult.score / 25) * 100)}%)
                      </p>
                    )}
                  </div>
                </div>
                <span className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow transition-colors flex items-center gap-1">
                  Presentar Examen ➔
                </span>
              </Link>
            ) : (
              <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/60 opacity-80 flex items-center justify-between cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">
                    <Lock size={18} />
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-gray-600 dark:text-gray-400">
                      Evaluación Final (Examen) — Bloqueado
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Debes completar el 100% de los 5 módulos de lectura para habilitar este examen (Llevas el {progressPercentage}%).
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  {progressPercentage}% / 100%
                </span>
              </div>
            )}

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Database size={13} className="text-[#39A900]" />
                Todas las evaluaciones y respuestas se archivan automáticamente en el Repositorio Central de Aprendices.
              </span>
              <Link
                to="/repository"
                className="font-bold text-[#39A900] dark:text-[#52c41a] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
              >
                Abrir Repositorio de Respuestas ➔
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

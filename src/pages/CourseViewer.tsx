import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { courseContent, SectionItem } from '../data/courseContent';
import { useProgress, READING_MODULES } from '../hooks/useProgress';
import { ChevronDown, ArrowLeft, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import ColombiaMap from '../components/ColombiaMap';
import DerechosDeberesInteractivo from '../components/DerechosDeberesInteractivo';

export default function CourseViewer() {
  const { moduleName } = useParams<{ moduleName: string }>();
  const navigate = useNavigate();
  const { markModuleComplete, isModuleCompleted, progressPercentage, completedReadingCount, totalReadingModules } = useProgress();

  // Accordion state for section items (individual rights, duties, prohibitions)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const content = moduleName ? courseContent[moduleName] : null;

  // Reading sequence indices
  const currentReadingIndex = useMemo(() => {
    return moduleName ? READING_MODULES.indexOf(moduleName) : -1;
  }, [moduleName]);

  const isLastReadingModule = currentReadingIndex === READING_MODULES.length - 1;
  const nextModuleName = useMemo(() => {
    if (currentReadingIndex >= 0 && currentReadingIndex < READING_MODULES.length - 1) {
      return READING_MODULES[currentReadingIndex + 1];
    }
    return null;
  }, [currentReadingIndex]);

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleAllItems = (items: SectionItem[]) => {
    const allOpen = items.every(it => expandedItems[it.id]);
    const nextState: Record<string, boolean> = { ...expandedItems };
    items.forEach(it => {
      nextState[it.id] = !allOpen;
    });
    setExpandedItems(nextState);
  };

  const handleNext = async () => {
    if (moduleName) {
      await markModuleComplete(moduleName);
    }

    if (nextModuleName) {
      navigate(`/course/${encodeURIComponent(nextModuleName)}`);
    } else if (isLastReadingModule) {
      // Completed all 5 reading modules, now go directly to final exam!
      navigate('/exam');
    } else {
      navigate('/induction');
    }
  };

  if (!content || !moduleName) {
    return (
      <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 transition-colors">
        <button
          onClick={() => navigate('/induction')}
          className="mb-4 inline-flex items-center gap-1.5 text-[#39A900] font-semibold hover:underline"
        >
          <ArrowLeft size={18} /> Volver a módulos
        </button>
        <h1 className="text-3xl font-bold text-[#39A900]">Módulo no encontrado</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">El módulo solicitado no está registrado en el contenido.</p>
        <button
          onClick={() => navigate('/induction')}
          className="mt-6 bg-[#39A900] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#2d8700] transition-colors"
        >
          Regresar a Inducción
        </button>
      </div>
    );
  }

  const isCurrentCompleted = isModuleCompleted(moduleName);
  const isConoceTuInstitucion = moduleName === 'Conoce tu institución';
  const isDerechosYDeberes = moduleName === 'Derechos y Deberes';

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 transition-colors pb-20">
      {/* 1. Botón Volver a Módulos */}
      <button
        onClick={() => navigate('/induction')}
        className="mb-4 inline-flex items-center gap-2 text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline text-base transition-colors"
      >
        <ArrowLeft size={18} /> Volver a módulos
      </button>

      {/* 2. Barra de Avance en Porcentaje (justo debajo de 'Volver a módulos' y antes del título) */}
      <div className="mb-6 bg-gray-100 dark:bg-gray-700/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-center text-sm font-semibold mb-2">
          <span className="text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-[#39A900]" />
            Progreso general de lecturas:
          </span>
          <span className="text-[#39A900] dark:text-[#52c41a] font-bold text-base">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 h-3 rounded-full overflow-hidden">
          <div
            className="bg-[#39A900] h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex justify-between">
          <span>{completedReadingCount} de {totalReadingModules} módulos completados</span>
          {isCurrentCompleted && <span className="text-[#39A900] font-medium">✓ Módulo actual completado</span>}
        </p>
      </div>

      {/* 3. Título del Módulo */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-3xl font-extrabold text-[#39A900] dark:text-[#52c41a] tracking-tight">
            {content.title}
          </h1>
          {currentReadingIndex >= 0 && (
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 font-semibold uppercase tracking-wider">
              Tema {currentReadingIndex + 1} de {totalReadingModules}
            </span>
          )}
        </div>
        {content.subtitle && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {content.subtitle}
          </p>
        )}
      </div>

      {/* 4. Contenido de Secciones o Módulo Interactivo */}
      {isDerechosYDeberes ? (
        <DerechosDeberesInteractivo onCompleteModule={() => markModuleComplete(moduleName)} />
      ) : (
        <div className="space-y-6">
          {content.sections.map((section, sIndex) => (
            <div
              key={sIndex}
              className="bg-white dark:bg-gray-700/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Encabezado de Sección */}
              <div className="p-5 bg-gray-50/70 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl font-bold text-[#39A900] dark:text-[#52c41a]">
                  {section.heading}
                </h2>
                {section.items && section.items.length > 0 && (
                  <button
                    onClick={() => toggleAllItems(section.items!)}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                  >
                    Desplegar / Contraer todo
                  </button>
                )}
              </div>

              <div className="p-5">
                {section.body && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-4 font-normal">
                    {section.body}
                  </p>
                )}

                {/* Acordeón para Derechos, Deberes y Prohibiciones individuales */}
                {section.items && section.items.length > 0 && (
                  <div className="space-y-3 mt-3">
                    {section.items.map((item) => {
                      const isOpen = !!expandedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          className={`rounded-lg border transition-all ${
                            isOpen
                              ? 'border-[#39A900] bg-green-50/30 dark:bg-green-950/20 shadow-sm'
                              : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full text-left px-4 py-3.5 flex justify-between items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 hover:text-[#39A900] dark:hover:text-[#52c41a] transition-colors"
                          >
                            <span className="text-base font-medium leading-snug">
                              {item.summary}
                            </span>
                            <span className={`p-1 rounded-full text-[#39A900] dark:text-[#52c41a] transition-transform ${isOpen ? 'rotate-180 bg-green-100 dark:bg-green-900/40' : ''}`}>
                              <ChevronDown size={18} />
                            </span>
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 pt-1 border-t border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 leading-relaxed animate-fadeIn">
                              {item.detail}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. Si es el módulo "Conoce tu institución": Mostrar el mapa de Colombia interactivo con brillo de contorno y centros */}
      {isConoceTuInstitucion && (
        <div className="mt-8">
          <ColombiaMap />
        </div>
      )}

      {/* 6. Botón 'Siguiente' en estricto orden */}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => navigate('/induction')}
          className="w-full sm:w-auto px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center"
        >
          ← Volver al Índice
        </button>

        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#39A900] text-white font-bold hover:bg-[#2d8700] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base"
        >
          {nextModuleName ? (
            <>
              Siguiente Módulo ({nextModuleName})
              <ArrowRight size={18} />
            </>
          ) : isLastReadingModule ? (
            <>
              <Award size={18} />
              Siguiente: Tomar Evaluación Final (100%)
              <ArrowRight size={18} />
            </>
          ) : (
            'Finalizar y Volver a Inducción'
          )}
        </button>
      </div>
    </div>
  );
}

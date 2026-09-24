import { useState, useMemo, useEffect } from 'react';
import {
  ShieldCheck,
  ClipboardList,
  AlertTriangle,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Flame,
  Award,
  ChevronDown,
  RotateCcw,
  BookOpen,
  Download,
  FileCode2,
  ArrowRight,
  ExternalLink,
  Lightbulb,
  Scale
} from 'lucide-react';
import {
  DERECHOS_LIST,
  DEBERES_LIST,
  PROHIBICIONES_LIST,
  QUIZ_QUESTIONS,
  NormItem
} from '../data/derechosDeberesData';

// Web Audio API for subtle, immediate positive/negative sound feedback
function playSound(type: 'correct' | 'wrong' | 'complete') {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (type === 'correct') {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.25); // G5

      osc2.frequency.setValueAtTime(261.63, now); // C4
      osc2.frequency.exponentialRampToValueAtTime(329.63, now + 0.15);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } else if (type === 'wrong') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.28);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'complete') {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.12, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });
    }
  } catch {
    // Ignore audio failures if browser blocks or audio context is disabled
  }
}

interface DerechosDeberesInteractivoProps {
  onCompleteModule?: () => void;
}

export default function DerechosDeberesInteractivo({ onCompleteModule }: DerechosDeberesInteractivoProps) {
  // Main view tab: 'explorador' | 'prueba'
  const [activeTab, setActiveTab] = useState<'explorador' | 'prueba'>('explorador');

  // Sub-filter for explorer: 'derechos' | 'deberes' | 'prohibiciones' | 'todos'
  const [explorerFilter, setExplorerFilter] = useState<'derechos' | 'deberes' | 'prohibiciones'>('derechos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showReinforcement, setShowReinforcement] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  // Filtered items in Explorer
  const currentList = useMemo(() => {
    let list: NormItem[] = [];
    if (explorerFilter === 'derechos') list = DERECHOS_LIST;
    else if (explorerFilter === 'deberes') list = DEBERES_LIST;
    else if (explorerFilter === 'prohibiciones') list = PROHIBICIONES_LIST;

    return list.filter(item => {
      const matchSearch =
        searchQuery.trim() === '' ||
        item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.resumen.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.textoCompleto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.palabrasClave.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === 'todas' || item.categoria === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [explorerFilter, searchQuery, selectedCategory]);

  // Unique categories for the current tab
  const availableCategories = useMemo(() => {
    let list: NormItem[] = [];
    if (explorerFilter === 'derechos') list = DERECHOS_LIST;
    else if (explorerFilter === 'deberes') list = DEBERES_LIST;
    else if (explorerFilter === 'prohibiciones') list = PROHIBICIONES_LIST;
    const cats = Array.from(new Set(list.map(i => i.categoria)));
    return ['todas', ...cats];
  }, [explorerFilter]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  // Particle generator for success celebrations
  const triggerSuccessParticles = () => {
    const colors = ['#39A900', '#52c41a', '#ffd700', '#00b4d8', '#10b981'];
    const newParticles = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 120,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1200);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleVerifyAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const correct = selectedOption === currentQuestion.respuestaCorrecta;
    setIsAnswerSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      playSound('correct');
      triggerSuccessParticles();
      setStreak(prev => prev + 1);
      setScore(prev => prev + 1);
      setShowReinforcement(false);
    } else {
      playSound('wrong');
      setStreak(0);
      setShowReinforcement(true);
    }
  };

  const handleRetryQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setShowReinforcement(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setIsCorrect(null);
      setShowReinforcement(false);
    } else {
      setQuizFinished(true);
      playSound('complete');
      if (onCompleteModule) {
        onCompleteModule();
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setShowReinforcement(false);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
  };

  const handleDownloadJson = () => {
    const link = document.createElement('a');
    link.href = '/acuerdo_009_2024.json';
    link.download = 'Acuerdo_009_2024_Reglamento_Aprendiz_SENA.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Selector Principal de Modo: Explorador Interactivo vs Prueba de Conocimientos */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800/90 p-4 sm:p-5 rounded-2xl border border-green-200 dark:border-green-800/70 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#39A900] dark:text-[#52c41a] mb-1">
            <Scale size={16} /> Acuerdo 009 de 2024 (Reglamento del Aprendiz)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            Módulo Interactivo: Derechos, Deberes y Prohibiciones
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            Explora interactivamente los 24 derechos, 24 deberes y 14 prohibiciones, y valida tu aprendizaje con la prueba pedagógica.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-1.5 rounded-xl border border-gray-200 dark:border-gray-600 shrink-0 shadow-sm">
          <button
            onClick={() => setActiveTab('explorador')}
            className={`px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'explorador'
                ? 'bg-[#39A900] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#39A900] dark:hover:text-white'
            }`}
          >
            <BookOpen size={16} /> Explorador de Normas
          </button>
          <button
            onClick={() => setActiveTab('prueba')}
            className={`px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'prueba'
                ? 'bg-[#39A900] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#39A900] dark:hover:text-white'
            }`}
          >
            <Sparkles size={16} /> Prueba de Conocimientos
            <span className="bg-amber-400 text-gray-900 text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase">
              10 Retos
            </span>
          </button>
        </div>
      </div>

      {/* Botón de Acceso y Descarga del Documento Completo en formato JSON */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-gray-800/80 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
          <FileCode2 size={18} className="text-[#39A900]" />
          <span>Norma oficial digitalizada en formato JSON estructurado:</span>
          <span className="font-mono font-bold bg-green-50 dark:bg-green-950 text-[#39A900] px-2 py-0.5 rounded border border-green-200 dark:border-green-800">
            acuerdo_009_2024.json
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJsonModal(true)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold text-gray-700 dark:text-gray-200 inline-flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink size={14} /> Inspeccionar JSON
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 rounded-lg bg-[#39A900] hover:bg-[#2d8700] text-white font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download size={14} /> Descargar JSON Oficial
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: EXPLORADOR INTERACTIVO                                           */}
      {/* ========================================================================= */}
      {activeTab === 'explorador' && (
        <div className="space-y-6">
          {/* Sub-Pestañas: Derechos (24), Deberes (24), Prohibiciones (14) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                setExplorerFilter('derechos');
                setSelectedCategory('todas');
              }}
              className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                explorerFilter === 'derechos'
                  ? 'border-[#39A900] bg-green-50/70 dark:bg-green-950/40 shadow-md ring-2 ring-[#39A900]/40'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/60 text-[#39A900] flex items-center justify-center font-bold">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    Derechos del Aprendiz
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Artículo 5 (24 Numerales)
                  </p>
                </div>
              </div>
              <span className="text-lg font-black text-[#39A900]">24</span>
            </button>

            <button
              onClick={() => {
                setExplorerFilter('deberes');
                setSelectedCategory('todas');
              }}
              className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                explorerFilter === 'deberes'
                  ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-md ring-2 ring-blue-400/40'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <ClipboardList size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    Deberes del Aprendiz
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Artículo 8 (24 Numerales)
                  </p>
                </div>
              </div>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">24</span>
            </button>

            <button
              onClick={() => {
                setExplorerFilter('prohibiciones');
                setSelectedCategory('todas');
              }}
              className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                explorerFilter === 'prohibiciones'
                  ? 'border-red-500 bg-red-50/70 dark:bg-red-950/40 shadow-md ring-2 ring-red-400/40'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    Prohibiciones
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Artículo 9 (14 Numerales)
                  </p>
                </div>
              </div>
              <span className="text-lg font-black text-red-600 dark:text-red-400">14</span>
            </button>
          </div>

          {/* Barra de Búsqueda y Filtro de Categoría */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Buscar en ${explorerFilter} (ej: discapacidad, uniforme, notas, LMS, plagio)...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    ✕ Limpiar
                  </button>
                )}
              </div>

              {/* Botón rápido para desplegar o contraer todos */}
              <button
                onClick={() => {
                  const allOpen = currentList.every(it => expandedItems[it.id]);
                  const next: Record<string, boolean> = { ...expandedItems };
                  currentList.forEach(it => {
                    next[it.id] = !allOpen;
                  });
                  setExpandedItems(next);
                }}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
              >
                {currentList.every(it => expandedItems[it.id]) ? 'Contraer todo' : 'Desplegar todo'}
              </button>
            </div>

            {/* Categorías (Pills) */}
            <div className="flex flex-wrap gap-1.5 items-center pt-2 border-t border-gray-100 dark:border-gray-700">
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase mr-1">
                Categorías:
              </span>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#39A900] text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat === 'todas' ? 'Todas las categorías' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Tarjetas Interactivas */}
          <div className="space-y-3">
            {currentList.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <HelpCircle size={36} className="mx-auto text-gray-400 mb-2" />
                <h4 className="font-bold text-base text-gray-700 dark:text-gray-200">
                  No se encontraron elementos con ese criterio
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Intenta cambiar el término de búsqueda o seleccionar otra categoría.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('todas');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#39A900] text-white text-xs font-bold"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              currentList.map((item) => {
                const isOpen = !!expandedItems[item.id];
                const badgeColor =
                  item.tipo === 'derecho'
                    ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800'
                    : item.tipo === 'deber'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                    : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800';

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? item.tipo === 'derecho'
                          ? 'border-[#39A900] bg-green-50/20 dark:bg-green-950/20 shadow-md'
                          : item.tipo === 'deber'
                          ? 'border-blue-400 bg-blue-50/20 dark:bg-blue-950/20 shadow-md'
                          : 'border-red-400 bg-red-50/20 dark:bg-red-950/20 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mt-0.5">
                          #{item.numeral}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                              {item.articulo}
                            </span>
                            <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                              {item.categoria}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                            {item.titulo}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {item.resumen}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <span className={`p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-transform inline-block ${isOpen ? 'rotate-180 text-[#39A900]' : ''}`}>
                          <ChevronDown size={20} />
                        </span>
                      </div>
                    </button>

                    {/* Detalle Expandible */}
                    {isOpen && (
                      <div className="px-4 pb-5 pt-1 sm:px-6 border-t border-dashed border-gray-200 dark:border-gray-700 space-y-3 animate-fadeIn">
                        <div className="bg-gray-50 dark:bg-gray-700/60 p-3.5 rounded-xl border border-gray-200/80 dark:border-gray-600 text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-serif">
                          <span className="font-bold block text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-wider mb-1 font-sans">
                            Texto Jurídico Oficial:
                          </span>
                          "{item.textoCompleto}"
                        </div>

                        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                          <Lightbulb size={18} className="shrink-0 text-[#39A900] mt-0.5" />
                          <div>
                            <span className="font-bold block text-[11px] uppercase tracking-wide text-[#39A900] dark:text-[#52c41a]">
                              Clave práctica para tu vida formativa:
                            </span>
                            {item.explicacionModerna}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: PRUEBA INTERACTIVA DE CONOCIMIENTOS (KNOWLEDGE TEST)              */}
      {/* ========================================================================= */}
      {activeTab === 'prueba' && (
        <div className="space-y-6">
          {!quizFinished ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-lg relative overflow-hidden transition-all">
              {/* Partículas de Éxito Flotantes */}
              {particles.map(p => (
                <div
                  key={p.id}
                  className="absolute pointer-events-none w-3 h-3 rounded-full animate-particle z-30"
                  style={{
                    backgroundColor: p.color,
                    left: `calc(50% + ${p.x}px)`,
                    top: `calc(40% + ${p.y}px)`,
                  }}
                />
              ))}

              {/* Cabecera del Quiz: Progreso y Racha */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                    Caso #{currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Aciertos: {score}/{currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)}
                  </span>
                </div>

                {/* Racha de Aciertos con Fuego */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 font-bold text-xs border border-orange-200 dark:border-orange-800">
                  <Flame size={15} className={streak > 0 ? "text-orange-500 animate-bounce" : "text-gray-400"} />
                  <span>Racha: {streak} {streak === 1 ? 'acierto' : 'aciertos'}</span>
                </div>
              </div>

              {/* Barra de Progreso del Quiz */}
              <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-[#39A900] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Tarjeta del Escenario Real */}
              <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-gray-700/60 dark:to-gray-700/40 rounded-xl border border-blue-200/80 dark:border-gray-600 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">
                  <HelpCircle size={15} /> Situación Real en el SENA:
                </div>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
                  "{currentQuestion.contexto}"
                </p>
              </div>

              {/* Pregunta */}
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white mt-5">
                {currentQuestion.pregunta}
              </h3>

              {/* Opciones de Respuesta */}
              <div className="space-y-3 mt-4">
                {currentQuestion.opciones.map((opcion, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = idx === currentQuestion.respuestaCorrecta;

                  let optionStyle =
                    'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500';

                  if (isAnswerSubmitted) {
                    if (isCorrectOption) {
                      optionStyle =
                        'border-green-500 bg-green-50 dark:bg-green-950/60 text-green-900 dark:text-green-200 font-bold shadow-md animate-pop-success ring-2 ring-green-400';
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-900 dark:text-red-200 font-semibold animate-shake ring-2 ring-red-400';
                    } else {
                      optionStyle = 'opacity-50 border-gray-200 dark:border-gray-700';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'border-[#39A900] bg-green-50/50 dark:bg-green-950/30 text-gray-900 dark:text-white ring-2 ring-[#39A900] shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                          isSelected || (isAnswerSubmitted && isCorrectOption)
                            ? 'bg-[#39A900] text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{opcion}</span>
                      </div>

                      {isAnswerSubmitted && isCorrectOption && (
                        <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle size={20} className="text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Botón de Comprobar si no ha enviado */}
              {!isAnswerSubmitted && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleVerifyAnswer}
                    disabled={selectedOption === null}
                    className={`px-7 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md flex items-center gap-2 ${
                      selectedOption !== null
                        ? 'bg-[#39A900] hover:bg-[#2d8700] hover:scale-[1.02] cursor-pointer'
                        : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-400'
                    }`}
                  >
                    Verificar Respuesta
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* EFECTO VISUAL POSITIVO (ACIERTO)                                          */}
              {/* ========================================================================= */}
              {isAnswerSubmitted && isCorrect && (
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/30 border-2 border-[#39A900] shadow-md animate-pop-success">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse-glow">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-green-900 dark:text-green-200">
                          ¡Excelente! Has respondido correctamente
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100 text-[10px] font-black uppercase">
                          +1 Punto
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-green-800 dark:text-green-300 mt-1 leading-relaxed">
                        {currentQuestion.retroalimentacionPositiva}
                      </p>
                      <div className="mt-2 text-xs font-semibold text-green-700 dark:text-green-400 flex items-center gap-1.5">
                        <Scale size={14} /> Fundamento: {currentQuestion.articuloReferencia}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2d8700] text-white font-bold text-sm flex items-center gap-2 shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Siguiente Caso' : 'Ver Resultados Finales'}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* EFECTO VISUAL NEGATIVO + REFUERZO PEDAGÓGICO INMEDIATO (ERROR)           */}
              {/* ========================================================================= */}
              {isAnswerSubmitted && !isCorrect && showReinforcement && (
                <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-red-50 via-rose-50 to-amber-50 dark:from-red-950/40 dark:via-gray-800 dark:to-amber-950/30 border-2 border-red-400 dark:border-red-600 shadow-lg animate-shake">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <AlertTriangle size={22} />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="text-base font-black text-red-900 dark:text-red-200">
                          Respuesta Incorrecta — Refuerzo Pedagógico Oportuno
                        </h4>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300">
                          {currentQuestion.articuloReferencia}
                        </span>
                      </div>

                      {/* 1. ¿Dónde estuvo el error con lenguaje actualizado? */}
                      <div className="mt-3 bg-white/90 dark:bg-gray-700/80 p-3.5 rounded-xl border border-red-200 dark:border-red-800/60">
                        <span className="text-xs font-black text-red-700 dark:text-red-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                          <XCircle size={14} /> ¿Dónde estuvo tu confusión o el error?
                        </span>
                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
                          {currentQuestion.refuerzoPedagogico.dondeEstuvoElError}
                        </p>
                      </div>

                      {/* 2. Fundamento normativo oficial */}
                      <div className="mt-2.5 bg-white/90 dark:bg-gray-700/80 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/60">
                        <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                          <Scale size={14} /> Fundamento Oficial (Acuerdo 009 de 2024):
                        </span>
                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-serif">
                          {currentQuestion.refuerzoPedagogico.fundamentoNormativo}
                        </p>
                      </div>

                      {/* 3. Clave para la vida diaria de aprendiz */}
                      <div className="mt-2.5 bg-emerald-50/90 dark:bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                        <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                          <Lightbulb size={14} /> Clave práctica para tu vida formativa:
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
                          {currentQuestion.refuerzoPedagogico.claveParaTuVida}
                        </p>
                      </div>

                      {/* Botones: Reintentar para afianzar o Pasar al siguiente */}
                      <div className="mt-4 pt-3 border-t border-red-200 dark:border-red-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <button
                          onClick={handleRetryQuestion}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw size={14} /> Intentar nuevamente esta pregunta
                        </button>

                        <button
                          onClick={handleNextQuestion}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
                        >
                          {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Continuar al siguiente caso' : 'Ver Resultados'}
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Pantalla de Resultados Finales del Quiz */
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center max-w-xl mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4 shadow-sm">
                <Award size={36} />
              </div>

              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                ¡Prueba de Conocimientos Culminada!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Evaluación interactiva sobre Derechos, Deberes y Prohibiciones (Acuerdo 009 de 2024).
              </p>

              <div className="my-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 inline-block w-full max-w-xs">
                <div className="text-3xl font-extrabold text-[#39A900]">
                  {score} / {QUIZ_QUESTIONS.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-0.5">
                  {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% de asertividad
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                {score >= 8
                  ? '¡Sobresaliente! Tienes una comprensión sólida de tus garantías y responsabilidades en el SENA.'
                  : 'Buen ejercicio. Recuerda que puedes volver a repasar el explorador de normas o repetir la prueba para afianzar los conceptos pedagógicos.'}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw size={15} /> Repetir Prueba
                </button>

                <button
                  onClick={() => setActiveTab('explorador')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2d8700] text-white text-xs font-bold shadow-md transition-all inline-flex items-center justify-center gap-2"
                >
                  <BookOpen size={15} /> Volver al Explorador de Normas
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL PARA INSPECCIONAR EL JSON OFICIAL COMPLETO */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[85vh] flex flex-col overflow-hidden animate-pop-success">
            <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCode2 size={22} className="text-[#39A900]" />
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    Estructura JSON: Acuerdo 009 de 2024
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Reglamento del Aprendiz SENA digitalizado completo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowJsonModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-800 dark:hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 bg-gray-950 text-gray-200 font-mono text-xs rounded-b-xl leading-relaxed">
              <pre>
{`{
  "acuerdo": {
    "numero": "009 de 2024",
    "fecha": "5 de noviembre de 2024",
    "diarioOficial": "No. 52.947 de 21 de noviembre de 2024",
    "entidad": "Servicio Nacional de Aprendizaje - SENA",
    "descripcion": "Por medio del cual se adopta el Reglamento del Aprendiz SENA...",
    "capitulos": [
      { "capitulo": "I", "titulo": "DEFINICIONES Y PRINCIPIOS (Arts. 1-4)" },
      { "capitulo": "II", "titulo": "DERECHOS DEL APRENDIZ (Art. 5: 24 derechos, Arts. 6-7)" },
      { "capitulo": "III", "titulo": "DEBERES (Art. 8: 24 deberes) Y PROHIBICIONES (Art. 9: 14 prohibiciones)" },
      { "capitulo": "IV", "titulo": "INGRESO, PERMANENCIA, EVALUACIÓN Y CERTIFICACIÓN (Arts. 10-38)" },
      { "capitulo": "V", "titulo": "RÉGIMEN DE FALTAS, MEDIDAS Y SANCIONES (Arts. 39-53)" }
    ]
  }
}`}
              </pre>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Archivo fuente: <code className="text-[#39A900]">/acuerdo_009_2024.json</code>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify({ DERECHOS_LIST, DEBERES_LIST, PROHIBICIONES_LIST }, null, 2));
                    setJsonCopied(true);
                    setTimeout(() => setJsonCopied(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  {jsonCopied ? '✓ Copiado' : 'Copiar Fragmento'}
                </button>
                <button
                  onClick={handleDownloadJson}
                  className="px-4 py-1.5 rounded-lg bg-[#39A900] text-white text-xs font-bold hover:bg-[#2d8700] inline-flex items-center gap-1.5 shadow"
                >
                  <Download size={14} /> Descargar Archivo JSON Completo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Database,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Calendar,
  User,
  Hash,
  Award,
  ChevronDown,
  Building2,
  MapPin,
  RefreshCw,
  Scale
} from 'lucide-react';
import {
  fetchAllEvaluations,
  EvaluationRecord,
  ItemizedResponse
} from '../lib/evaluationRepository';

export default function EvaluationRepository() {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationRecord | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllEvaluations();
      setEvaluations(data);
      if (data.length > 0 && !selectedEvaluation) {
        setSelectedEvaluation(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(ev => {
      const matchSearch =
        searchQuery.trim() === '' ||
        ev.nombreCompleto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.documento.includes(searchQuery.trim()) ||
        ev.ficha.includes(searchQuery.trim()) ||
        (ev.regional && ev.regional.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.centro && ev.centro.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'passed' && ev.passed) ||
        (statusFilter === 'failed' && !ev.passed);

      return matchSearch && matchStatus;
    });
  }, [evaluations, searchQuery, statusFilter]);

  const handleDownloadAllJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(evaluations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `repositorio_evaluaciones_sena_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCsv = () => {
    if (evaluations.length === 0) return;
    const headers = ['ID', 'Documento', 'Nombre', 'Ficha', 'Regional', 'Centro', 'Puntaje', 'Total', 'Porcentaje', 'Aprobado', 'Fecha'];
    const rows = evaluations.map(e => [
      e.id,
      `"${e.documento}"`,
      `"${e.nombreCompleto}"`,
      `"${e.ficha}"`,
      `"${e.regional || ''}"`,
      `"${e.centro || ''}"`,
      e.score,
      e.totalQuestions,
      `${e.percentage}%`,
      e.passed ? 'SI' : 'NO',
      `"${new Date(e.submittedAt).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte_evaluaciones_sena_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-white dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 transition-colors pb-24">
      {/* Botón Volver */}
      <button
        onClick={() => navigate('/induction')}
        className="mb-4 inline-flex items-center gap-1.5 text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline text-sm"
      >
        <ArrowLeft size={16} /> Volver a Inducción
      </button>

      {/* Encabezado */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] dark:text-[#52c41a] mb-1">
            <Database size={16} /> Repositorio Oficial de Respuestas y Evaluaciones
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Repositorio de Evaluaciones del Módulo
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            Registro auditable de respuestas consignadas, métricas por aprendiz y trazabilidad de fichas de formación.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={loadData}
            title="Refrescar datos"
            className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-[#39A900]' : ''} />
          </button>
          <button
            onClick={handleExportCsv}
            disabled={evaluations.length === 0}
            className="px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            <FileText size={15} /> Exportar CSV
          </button>
          <button
            onClick={handleDownloadAllJson}
            disabled={evaluations.length === 0}
            className="px-4 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2d8700] text-white text-xs font-bold shadow-sm transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download size={15} /> Descargar JSON Completo
          </button>
        </div>
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="bg-gray-50 dark:bg-gray-700/60 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-3 text-gray-400" size={17} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, cédula, ficha de caracterización o centro..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[#39A900]"
          />
        </div>

        <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-[#39A900] text-white shadow-xs'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Todos ({evaluations.length})
          </button>
          <button
            onClick={() => setStatusFilter('passed')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'passed'
                ? 'bg-green-600 text-white shadow-xs'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Aprobados ({evaluations.filter(e => e.passed).length})
          </button>
          <button
            onClick={() => setStatusFilter('failed')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'failed'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            No Aprobados ({evaluations.filter(e => !e.passed).length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-500">
          <RefreshCw size={28} className="animate-spin mx-auto text-[#39A900] mb-2" />
          <p className="text-sm font-semibold">Cargando repositorio de evaluaciones...</p>
        </div>
      ) : filteredEvaluations.length === 0 ? (
        <div className="p-10 text-center bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <Database size={40} className="mx-auto text-gray-400 mb-2" />
          <h3 className="font-bold text-base text-gray-700 dark:text-gray-200">
            No se han registrado evaluaciones en el repositorio todavía
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Cuando un aprendiz complete el registro básico y presente la Evaluación Final de 25 preguntas, las respuestas se almacenarán automáticamente en este repositorio.
          </p>
          <button
            onClick={() => navigate('/exam')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-[#39A900] text-white text-xs font-bold hover:bg-[#2d8700] transition-colors"
          >
            Ir a Presentar Evaluación
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Izquierda: Lista de Evaluaciones Registradas */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Registros Almacenados ({filteredEvaluations.length}):
            </h3>

            <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
              {filteredEvaluations.map((ev) => {
                const isSelected = selectedEvaluation?.id === ev.id;
                return (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedEvaluation(ev)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#39A900] bg-green-50/70 dark:bg-green-950/40 shadow-md ring-2 ring-[#39A900]/40'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                          ev.passed ? 'bg-green-600' : 'bg-red-500'
                        }`}>
                          {ev.passed ? '✓' : '✕'}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">
                            {ev.nombreCompleto}
                          </h4>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                            Doc: {ev.documento} • Ficha: {ev.ficha}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          ev.passed
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300'
                        }`}>
                          {ev.score} / {ev.totalQuestions}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(ev.submittedAt).toLocaleDateString()} {new Date(ev.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        {ev.percentage}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Columna Derecha: Detalle de Respuestas del Aprendiz Seleccionado */}
          <div className="lg:col-span-2">
            {selectedEvaluation ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm space-y-6">
                {/* Cabecera del Aprendiz Seleccionado */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-gray-900 dark:text-white">
                        {selectedEvaluation.nombreCompleto}
                      </h2>
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase ${
                        selectedEvaluation.passed
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border border-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300'
                      }`}>
                        {selectedEvaluation.passed ? 'Aprobado (Certificado)' : 'No Aprobado'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300 font-mono">
                        Documento: {selectedEvaluation.documento}
                      </span>
                      <span>•</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300 font-mono">
                        Ficha: {selectedEvaluation.ficha}
                      </span>
                      {selectedEvaluation.regional && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> Regional {selectedEvaluation.regional}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/60 p-3 rounded-xl border border-gray-200 dark:border-gray-600 text-right shrink-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Puntaje Obtenido:</div>
                    <div className="text-xl font-black text-[#39A900]">
                      {selectedEvaluation.score} / {selectedEvaluation.totalQuestions} ({selectedEvaluation.percentage}%)
                    </div>
                  </div>
                </div>

                {/* Lista Completa de Respuestas Almacenadas */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                    <span>Desglose de Respuestas Consignadas ({selectedEvaluation.responses?.length || 0}):</span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      Verde = Correcta | Rojo = Incorrecta
                    </span>
                  </h3>

                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    {selectedEvaluation.responses?.map((item, rIdx) => (
                      <div
                        key={rIdx}
                        className={`p-4 rounded-xl border text-xs sm:text-sm transition-all ${
                          item.isCorrect
                            ? 'border-green-300 dark:border-green-800 bg-green-50/30 dark:bg-green-950/20'
                            : 'border-red-300 dark:border-red-800 bg-red-50/30 dark:bg-red-950/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className="font-bold text-gray-700 dark:text-gray-300">
                            Pregunta #{item.questionIndex} {item.context ? `(${item.context})` : ''}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.isCorrect
                              ? 'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100'
                              : 'bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-100'
                          }`}>
                            {item.isCorrect ? 'Acierto ✓' : 'Fallo ✕'}
                          </span>
                        </div>

                        <p className="text-gray-900 dark:text-gray-100 font-semibold mb-3 leading-snug">
                          {item.questionText}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className={`p-2.5 rounded-lg border ${
                            item.isCorrect
                              ? 'bg-white dark:bg-gray-800 border-green-300 dark:border-green-700'
                              : 'bg-red-100/70 dark:bg-red-950/60 border-red-300 dark:border-red-700 text-red-900 dark:text-red-200'
                          }`}>
                            <span className="font-bold block text-[10px] uppercase text-gray-500 dark:text-gray-400">
                              Respuesta del Aprendiz:
                            </span>
                            {item.userAnswerText}
                          </div>

                          <div className="p-2.5 rounded-lg border bg-white dark:bg-gray-800 border-green-300 dark:border-green-700 text-green-900 dark:text-green-200">
                            <span className="font-bold block text-[10px] uppercase text-gray-500 dark:text-gray-400">
                              Respuesta Correcta Institucional:
                            </span>
                            {item.correctAnswerText}
                          </div>
                        </div>

                        {item.explanation && (
                          <div className="mt-2.5 pt-2 border-t border-gray-200/60 dark:border-gray-700/60 text-[11px] text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                            <Scale size={13} className="shrink-0 text-[#39A900] mt-0.5" />
                            <span>
                              <strong>Fundamento:</strong> {item.explanation}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                Selecciona una evaluación para ver el desglose detallado de las 25 respuestas.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

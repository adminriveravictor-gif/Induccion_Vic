import { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserCheck, MapPin, Building2, CheckCircle2, Info, User, IdCard, Hash, AlertCircle } from 'lucide-react';
import { REGIONALES_SENA, getCentrosPorRegional } from '../data/senaRegionales';
import { getLocalApprenticeProfile } from '../lib/evaluationRepository';

export default function Diagnosis() {
  const navigate = useNavigate();
  const apprenticeProfile = useMemo(() => getLocalApprenticeProfile(), []);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('sena_diagnosis_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      modalidad: '',
      regional: '',
      centro: '',
      nivel: '',
      jornada: '',
      campesena: '',
      fullPopular: '',
      necesidadRefuerzo: false,
    };
  });

  // Lista dependiente de centros de formación según la regional seleccionada
  const centrosDisponibles = useMemo(() => {
    if (!formData.regional) return [];
    return getCentrosPorRegional(formData.regional);
  }, [formData.regional]);

  // Si cambia la regional y el centro seleccionado previamente no pertenece a ella, limpiarlo
  useEffect(() => {
    if (formData.centro && centrosDisponibles.length > 0 && !centrosDisponibles.includes(formData.centro)) {
      setFormData((prev: typeof formData) => ({ ...prev, centro: '' }));
    }
  }, [centrosDisponibles, formData.centro]);

  // Si la modalidad es virtual, garantizar automáticamente que la jornada sea 'virtual'
  useEffect(() => {
    if (formData.modalidad === 'virtual' && formData.jornada !== 'virtual') {
      setFormData((prev: typeof formData) => ({ ...prev, jornada: 'virtual' }));
    }
  }, [formData.modalidad, formData.jornada]);

  const handleModalidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModalidad = e.target.value;
    setFormData((prev: typeof formData) => ({
      ...prev,
      modalidad: selectedModalidad,
      // Si escoge modalidad virtual, asigna automáticamente la jornada virtual.
      // Si cambia de virtual a otra modalidad (presencial/a distancia), limpia la jornada para que elija una adecuada.
      jornada: selectedModalidad === 'virtual' ? 'virtual' : (prev.jornada === 'virtual' ? '' : prev.jornada),
    }));
  };

  const handleRegionalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setFormData((prev: typeof formData) => ({
      ...prev,
      regional: selected,
      centro: '', // Resetea el centro al cambiar de regional para garantizar consistencia estricta
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar diagnóstico en localStorage
    try {
      localStorage.setItem('sena_diagnosis_data', JSON.stringify(formData));
    } catch {
      // ignore
    }
    navigate('/induction');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 flex flex-col items-center justify-center transition-colors pb-16">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-10 transition-all">
        {/* Navegación y pasos */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-1.5 text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline text-sm cursor-pointer"
          >
            <ArrowLeft size={16} /> Modificar Datos Básicos
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            Inicio
          </button>
        </div>

        {/* Indicador de Pasos */}
        <div className="mb-6 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <Link to="/register" className="text-gray-500 hover:text-[#39A900] flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px]">✓</span>
              Paso 1: Datos Básicos
            </Link>
            <span className="text-[#39A900] dark:text-[#52c41a] flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center text-[10px]">2</span>
              Paso 2: Diagnóstico
            </span>
            <span className="text-gray-400 flex items-center gap-1 hidden sm:flex">
              <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-500 flex items-center justify-center text-[10px]">3</span>
              Paso 3: Inducción
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
            <div className="bg-[#39A900] h-full rounded-full w-2/3 transition-all duration-300" />
          </div>
        </div>

        {/* Tarjeta de Aprendiz Vinculado (o advertencia si falta) */}
        {apprenticeProfile ? (
          <div className="mb-6 p-3.5 rounded-2xl bg-green-50/80 dark:bg-green-950/40 border border-green-200 dark:border-green-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0">
                <User size={16} />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block text-sm leading-tight">
                  {apprenticeProfile.nombreCompleto}
                </span>
                <span className="text-gray-600 dark:text-gray-300 font-mono text-[11px]">
                  {apprenticeProfile.tipoDocumento}: {apprenticeProfile.documento} • Ficha: {apprenticeProfile.ficha}
                </span>
              </div>
            </div>
            <Link
              to="/register"
              className="text-xs font-semibold text-[#39A900] dark:text-[#52c41a] hover:underline whitespace-nowrap"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600 shrink-0" />
              <span>Aún no has registrado tu nombre y ficha de caracterización.</span>
            </div>
            <Link
              to="/register"
              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold whitespace-nowrap"
            >
              Registrar ahora
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: 'rgb(57, 169, 0)' }}
          >
            <UserCheck size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Diagnóstico del Aprendiz
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Caracterización formativa: Regional, Centro, Modalidad y Jornada
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
                Modalidad de Formación:
              </label>
              <select
                value={formData.modalidad}
                onChange={handleModalidadChange}
                className="border border-gray-300 dark:border-gray-600 p-2.5 w-full rounded-xl bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#39A900] outline-none text-sm transition-all"
                required
              >
                <option value="">Seleccione modalidad</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
                <option value="adistancia">A distancia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center justify-between">
                <span>Jornada:</span>
                {formData.modalidad === 'virtual' && (
                  <span className="text-[11px] font-semibold text-[#39A900] bg-green-50 dark:bg-green-950/60 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">
                    Fijada en Virtual
                  </span>
                )}
              </label>
              <select
                value={formData.jornada}
                onChange={(e) => setFormData({ ...formData, jornada: e.target.value })}
                className={`border p-2.5 w-full rounded-xl text-sm transition-all outline-none ${
                  formData.modalidad === 'virtual'
                    ? 'border-green-400 bg-green-50/50 dark:bg-green-950/20 text-gray-900 dark:text-green-200 font-medium focus:ring-2 focus:ring-[#39A900]'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#39A900]'
                }`}
                required
              >
                <option value="" disabled={formData.modalidad === 'virtual'}>
                  {formData.modalidad === 'virtual' ? 'Jornada Virtual (Activa)' : 'Seleccione jornada'}
                </option>
                <option value="diurna" disabled={formData.modalidad === 'virtual'}>
                  Diurna {formData.modalidad === 'virtual' ? '(Inhabilitada para virtual)' : ''}
                </option>
                <option value="nocturna" disabled={formData.modalidad === 'virtual'}>
                  Nocturna {formData.modalidad === 'virtual' ? '(Inhabilitada para virtual)' : ''}
                </option>
                <option value="mixta" disabled={formData.modalidad === 'virtual'}>
                  Mixta {formData.modalidad === 'virtual' ? '(Inhabilitada para virtual)' : ''}
                </option>
                <option value="virtual">Virtual</option>
              </select>
              {formData.modalidad === 'virtual' && (
                <p className="mt-1.5 text-xs text-green-700 dark:text-green-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="shrink-0 text-[#39A900]" />
                  Jornada Virtual habilitada automáticamente. Las demás jornadas han sido inhabilitadas.
                </p>
              )}
            </div>
          </div>

          {/* Regional SENA (33 Regionales) y Centro de Formación Dependiente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#39A900]" />
                  Regional SENA:
                </span>
                <span className="text-[11px] font-normal text-gray-400">
                  (33 Regionales)
                </span>
              </label>
              <select
                value={formData.regional}
                onChange={handleRegionalChange}
                className="border border-gray-300 dark:border-gray-600 p-2.5 w-full rounded-xl bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#39A900] outline-none text-sm transition-all"
                required
              >
                <option value="">Seleccione una regional...</option>
                {REGIONALES_SENA.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
              {formData.regional && (
                <p className="mt-1.5 text-xs text-green-700 dark:text-green-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 size={13} />
                  Regional {formData.regional} ({centrosDisponibles.length} centros)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 size={15} className="text-[#39A900]" />
                  Centro de Formación:
                </span>
                {formData.regional && (
                  <span className="text-[11px] font-semibold text-[#39A900]">
                    {centrosDisponibles.length} {centrosDisponibles.length === 1 ? 'disponible' : 'disponibles'}
                  </span>
                )}
              </label>
              <select
                value={formData.centro}
                onChange={(e) => setFormData({ ...formData, centro: e.target.value })}
                disabled={!formData.regional}
                className={`border p-2.5 w-full rounded-xl text-sm transition-all outline-none ${
                  !formData.regional
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#39A900]'
                }`}
                required
              >
                {!formData.regional ? (
                  <option value="">Primero seleccione una Regional...</option>
                ) : (
                  <>
                    <option value="">Seleccione su centro de formación...</option>
                    {centrosDisponibles.map((centro) => (
                      <option key={centro} value={centro}>
                        {centro}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {!formData.regional && (
                <p className="mt-1.5 text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <Info size={12} /> Seleccione una regional para habilitar los centros correspondientes
                </p>
              )}
              {formData.regional && !formData.centro && (
                <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Info size={13} /> Elija el centro de la Regional {formData.regional}
                </p>
              )}
              {formData.centro && (
                <p className="mt-1.5 text-xs text-green-700 dark:text-green-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 size={13} /> Centro seleccionado
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
                Nivel de Formación:
              </label>
              <select
                value={formData.nivel}
                onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                className="border border-gray-300 dark:border-gray-600 p-2.5 w-full rounded-xl bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#39A900] outline-none text-sm transition-all"
                required
              >
                <option value="">Seleccione</option>
                <option value="tecnico">Técnico</option>
                <option value="tecnologo">Tecnólogo</option>
                <option value="auxiliar">Auxiliar</option>
                <option value="operario">Operario</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
                Línea CampeSENA:
              </label>
              <select
                value={formData.campesena}
                onChange={(e) => setFormData({ ...formData, campesena: e.target.value })}
                className="border border-gray-300 dark:border-gray-600 p-2.5 w-full rounded-xl bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#39A900] outline-none text-sm transition-all"
                required
              >
                <option value="">Seleccione</option>
                <option value="no">No aplica</option>
                <option value="si">Sí, CampeSENA</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
                Full Popular:
              </label>
              <select
                value={formData.fullPopular}
                onChange={(e) => setFormData({ ...formData, fullPopular: e.target.value })}
                className="border border-gray-300 dark:border-gray-600 p-2.5 w-full rounded-xl bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#39A900] outline-none text-sm transition-all"
                required
              >
                <option value="">Seleccione</option>
                <option value="no">No aplica</option>
                <option value="si">Sí, Full Popular</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: 'rgb(57, 169, 0)' }}
            >
              Completar y Pasar a Inducción
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

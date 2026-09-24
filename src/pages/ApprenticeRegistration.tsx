import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, IdCard, Hash, Mail, Phone, CheckCircle2, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { getLocalApprenticeProfile, saveApprenticeProfile } from '../lib/evaluationRepository';

export default function ApprenticeRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    ficha: '',
    email: '',
    telefono: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const existing = getLocalApprenticeProfile();
    if (existing) {
      setFormData({
        nombreCompleto: existing.nombreCompleto || '',
        tipoDocumento: existing.tipoDocumento || 'CC',
        numeroDocumento: existing.documento || '',
        ficha: existing.ficha || '',
        email: existing.email || '',
        telefono: existing.telefono || '',
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombreCompleto.trim()) {
      setErrorMsg('Por favor ingresa tus nombres y apellidos completos.');
      return;
    }
    if (!formData.numeroDocumento.trim()) {
      setErrorMsg('Por favor ingresa tu número de documento de identidad.');
      return;
    }
    if (!formData.ficha.trim()) {
      setErrorMsg('Por favor ingresa tu número de ficha de caracterización.');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveApprenticeProfile({
        nombreCompleto: formData.nombreCompleto.trim(),
        tipoDocumento: formData.tipoDocumento,
        documento: formData.numeroDocumento.trim(),
        ficha: formData.ficha.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
      });

      // Continuar al paso 2: Diagnóstico
      navigate('/diagnosis');
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un error guardando tus datos. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center transition-colors pb-16">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-10 transition-all">
        {/* Botón Volver */}
        <button
          onClick={() => navigate('/')}
          className="mb-5 inline-flex items-center gap-1.5 text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline text-sm"
        >
          <ArrowLeft size={16} /> Volver al Inicio
        </button>

        {/* Indicador de Pasos del Proceso Formativo */}
        <div className="mb-6 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-[#39A900] dark:text-[#52c41a] flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center text-[10px]">1</span>
              Paso 1: Datos Básicos
            </span>
            <span className="text-gray-400 dark:text-gray-400 flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex items-center justify-center text-[10px]">2</span>
              Paso 2: Diagnóstico
            </span>
            <span className="text-gray-400 dark:text-gray-400 flex items-center gap-1 hidden sm:flex">
              <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex items-center justify-center text-[10px]">3</span>
              Paso 3: Inducción
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
            <div className="bg-[#39A900] h-full rounded-full w-1/3 transition-all duration-300" />
          </div>
        </div>

        {/* Encabezado */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0"
            style={{ backgroundColor: 'rgb(57, 169, 0)' }}
          >
            <User size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Registro del Aprendiz
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-green-100 dark:bg-green-950 text-[#39A900] border border-green-200 dark:border-green-800">
                Paso Previo
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Consigna tus datos de identificación personal y ficha de formación para vincular tu evaluación institucional.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-xs sm:text-sm flex items-center gap-2 animate-shake">
            <ShieldAlert size={18} className="shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre Completo */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
              <User size={15} className="text-[#39A900]" />
              Nombres y Apellidos Completos:
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              placeholder="Ej: Juan Camilo Pérez Gómez"
              className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
              required
            />
          </div>

          {/* Tipo y Número de Documento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                <IdCard size={15} className="text-[#39A900]" />
                Tipo Doc:
                <span className="text-red-500">*</span>
              </label>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
                required
              >
                <option value="CC">C.C. - Cédula de Ciudadanía</option>
                <option value="TI">T.I. - Tarjeta de Identidad</option>
                <option value="CE">C.E. - Cédula de Extranjería</option>
                <option value="PPT">PPT - Permiso Protección Temporal</option>
                <option value="PAS">Pasaporte</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                <IdCard size={15} className="text-[#39A900]" />
                Número de Documento:
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                placeholder="Ej: 1024567890"
                className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
                required
              />
            </div>
          </div>

          {/* Ficha de Caracterización */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Hash size={15} className="text-[#39A900]" />
                Ficha de Caracterización (Código de Grupo):
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] text-gray-400 font-normal">
                (Número de ficha SOFIA Plus / Zajuna)
              </span>
            </label>
            <input
              type="text"
              name="ficha"
              value={formData.ficha}
              onChange={handleChange}
              placeholder="Ej: 2874192"
              className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#39A900] transition-all font-mono"
              required
            />
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
              Este número identifica tu grupo formativo y permite vincular tus evaluaciones y respuestas con tu ficha.
            </p>
          </div>

          {/* Datos Complementarios (Correo y Teléfono) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                <Mail size={15} className="text-gray-400" />
                Correo Electrónico (Opcional):
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@misena.edu.co"
                className="border border-gray-300 dark:border-gray-600 p-2.5 w-full rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                <Phone size={15} className="text-gray-400" />
                Teléfono de Contacto (Opcional):
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 3101234567"
                className="border border-gray-300 dark:border-gray-600 p-2.5 w-full rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <CheckCircle2 size={14} className="text-[#39A900]" />
              Datos protegidos por la Ley 1581 de Protección de Datos
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ backgroundColor: 'rgb(57, 169, 0)' }}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar y Continuar al Diagnóstico'}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

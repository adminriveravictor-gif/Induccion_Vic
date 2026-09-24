import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  RotateCcw,
  HelpCircle,
  Compass,
  Sparkles,
  PartyPopper,
  Trophy,
  CloudRain,
  Frown,
  Smile,
  HeartCrack,
  Database,
} from 'lucide-react';
import { saveEvaluationRecord, getLocalApprenticeProfile } from '../lib/evaluationRepository';

// Web Audio API Sound Effects
function playHappyFanfare() {
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    // Cheerful, joyful fanfare arpeggio (C5 -> E5 -> G5 -> C6 -> E6 sparkle)
    const notes = [
      { f: 523.25, start: 0, dur: 0.16 }, // C5
      { f: 659.25, start: 0.14, dur: 0.16 }, // E5
      { f: 783.99, start: 0.28, dur: 0.2 }, // G5
      { f: 1046.5, start: 0.48, dur: 0.45 }, // C6
      { f: 1318.51, start: 0.62, dur: 0.55 }, // E6
    ];

    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.start);

      gain.gain.setValueAtTime(0.18, now + n.start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.start);
      osc.stop(now + n.start + n.dur);
    });
  } catch {
    // Ignore audio failures
  }
}

function playSadMelody() {
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    // Mournful, sad descending minor notes: D4 -> C4 -> Bb3 -> A3 with gentle downward pitch slide
    const notes = [
      { f: 293.66, start: 0, dur: 0.35 }, // D4
      { f: 261.63, start: 0.35, dur: 0.35 }, // C4
      { f: 233.08, start: 0.7, dur: 0.4 }, // Bb3
      { f: 207.65, start: 1.1, dur: 0.75 }, // G#3 (sad, unresolved drop)
    ];

    notes.forEach((n, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, now + n.start);
      if (idx === notes.length - 1) {
        osc.frequency.linearRampToValueAtTime(n.f - 24, now + n.start + n.dur);
      }

      gain.gain.setValueAtTime(0.11, now + n.start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.start);
      osc.stop(now + n.start + n.dur);
    });
  } catch {
    // Ignore audio failures
  }
}

interface QuestionMC {
  type: 'mc';
  q: string;
  context?: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface QuestionTF {
  type: 'tf';
  q: string;
  context?: string;
  answer: boolean;
  explanation: string;
}

type Question = QuestionMC | QuestionTF;

const questions: Question[] = [
  // 15 Selección Múltiple con Casos de Estudio, Normativa y Estructura Territorial SENA
  {
    type: 'mc',
    context: 'Conoce tu Institución: Cobertura Nacional',
    q: '1. De acuerdo con el directorio oficial del SENA, ¿cuántas Regionales conforman la presencia operativa y territorial de la entidad en todo el país?',
    options: [
      '15 regionales agrupadas únicamente por grandes zonas geográficas.',
      '33 Regionales: una en cada uno de los 32 departamentos del país y una exclusiva para el Distrito Capital (Bogotá).',
      '20 regionales situadas solamente en capitales metropolitanas.',
      'Solo 5 regionales correspondientes a las macro-regiones naturales.',
    ],
    answer: 1,
    explanation: 'El SENA hace presencia en todo el territorio nacional a través de 33 Regionales (los 32 departamentos de Colombia más el Distrito Capital).',
  },
  {
    type: 'mc',
    context: 'Conoce tu Institución: Centros de Formación',
    q: '2. ¿Aproximadamente cuántos Centros de Formación Profesional Integral tiene el SENA distribuidos en las 33 Regionales del territorio colombiano?',
    options: [
      'Más de 118 Centros de Formación con talleres, laboratorios y ambientes especializados.',
      'Exactamente 33 centros, uno solo por departamento.',
      'Solo 40 centros administrados por cooperativas privadas.',
      '10 centros ubicados únicamente en la zona andina.',
    ],
    answer: 0,
    explanation: 'El SENA cuenta con más de 118 Centros de Formación Profesional Integral que abarcan todas las ramas productivas y tecnológicas del país.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Integridad Académica',
    q: '3. Carlos copia el proyecto final de su compañero y lo entrega en la plataforma virtual presentándolo como propio. Según el Art. 9 del Acuerdo 009, ¿qué conducta comete y qué gravedad reviste?',
    options: [
      'Una falta leve solucionable con una disculpa verbal.',
      'Plagio de material, considerada una falta grave/gravísima que atenta contra la honestidad académica.',
      'Un derecho a la libre expresión y colaboración estudiantil.',
      'Una falta que solo acarrea sanción si el compañero presenta denuncia penal.',
    ],
    answer: 1,
    explanation: 'El plagio total o parcial de evidencias o trabajos es una prohibición expresa (Art. 9) y constituye una falta contra el orden académico.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Asistencia y Deserción',
    q: '4. Andrea deja de asistir a su formación presencial durante tres (3) días hábiles consecutivos sin reportar ni justificar su ausencia. ¿Qué novedad formativa se inicia según el reglamento?',
    options: [
      'Se le otorga automáticamente un aplazamiento por 6 meses.',
      'Se configura causal de deserción y se inicia el trámite formal de notificación y debido proceso al aprendiz.',
      'No ocurre nada, los aprendices tienen derecho a ausentarse libremente sin límite.',
      'Se le impone una sanción monetaria en bienestar institucional.',
    ],
    answer: 1,
    explanation: 'La inasistencia injustificada por tres (3) días consecutivos en formación presencial configura causal de deserción reglamentaria.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Seguridad y Salud',
    q: '5. En el taller de soldadura, Julián observa que las máquinas requieren careta de seguridad y guantes térmicos que no le han sido suministrados. ¿A qué derecho consagrado en el Art. 5 puede apelar?',
    options: [
      'Derecho a retirarse permanentemente del SENA sin culminar el proceso.',
      'Derecho a recibir oportunamente los elementos de protección personal (EPP) requeridos para salvaguardar su integridad física.',
      'Derecho a exigir que el instructor realice la práctica en su lugar.',
      'Derecho a no ser evaluado durante el trimestre.',
    ],
    answer: 1,
    explanation: 'El Artículo 5 consagra el derecho a recibir oportunamente los EPP necesarios para la formación práctica.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Convivencia y Sustancias',
    q: '6. Durante un receso, un aprendiz ingresa bebidas alcohólicas en su morral para consumirlas en las instalaciones del Centro. ¿Cuál es el tratamiento normativo de esta situación?',
    options: [
      'Está permitido siempre que sea en horario de descanso y fuera del aula.',
      'Es una prohibición absoluta (Art. 9) tipificada como falta gravísima que puede acarrear cancelación de matrícula.',
      'Solo se sanciona si el personero estudiantil lo autoriza.',
      'Es un derecho de libre desarrollo de la personalidad exento de normas internas.',
    ],
    answer: 1,
    explanation: 'Ingresar, comercializar o consumir bebidas alcohólicas o sustancias psicoactivas en el SENA es una prohibición estricta (Art. 9).',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Evaluación del Aprendizaje',
    q: '7. Mariana recibe juicio de "No Aprobado" en una evidencia y considera que sustentó adecuadamente. ¿Qué trámite reglamentario debe adelantar para ejercer su debido proceso?',
    options: [
      'Publicar una denuncia en redes sociales institucionales.',
      'Solicitar formalmente por escrito la revisión y retroalimentación al instructor dentro de los dos (2) días hábiles siguientes a la notificación.',
      'Suspender su asistencia hasta que el Centro le asigne otro instructor.',
      'Exigir que se le califique con un número del 1 al 5.',
    ],
    answer: 1,
    explanation: 'El aprendiz tiene derecho a solicitar la revisión de sus evaluaciones por escrito ante el instructor respetando los conductos y plazos establecidos.',
  },
  {
    type: 'mc',
    context: 'Conoce tu Institución: Vocación Productiva Regional',
    q: '8. Centros de formación como el Centro Nacional de Hotelería, Turismo y Alimentos (D.C.), el Centro ASTIN (Valle) o el Centro La Salada (Antioquia), ¿a qué principio territorial obedecen?',
    options: [
      'A la especialización formativa adaptada a las necesidades productivas, tecnológicas y laborales de cada región.',
      'A decisiones aisladas sin pertinencia con las empresas locales.',
      'A programas exclusivamente teóricos sin ambientes prácticos.',
      'A convenios que prohíben la matrícula de aprendices de otras regiones.',
    ],
    answer: 0,
    explanation: 'Cada Centro de Formación en las Regionales SENA responde a la vocación socioeconómica y productiva de su territorio.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Enfoque Diferencial',
    q: '9. Un aprendiz con baja visión se matricula en un tecnólogo virtual. Según los Principios Orientadores (Art. 3) y Derechos (Art. 5), ¿qué debe garantizarle el SENA?',
    options: [
      'Sugerirle que abandone el programa tecnológico.',
      'Inclusión social y enfoque diferencial con ajustes razonables en materiales didácticos, plataformas accesibles y acompañamiento.',
      'Eximirlo de adquirir las competencias del programa.',
      'Cobrarle un rubro adicional por adaptación de software accesible.',
    ],
    answer: 1,
    explanation: 'Los principios de Inclusión y Enfoque Diferencial obligan a la institución a garantizar accesibilidad y ajustes razonables.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Juicio Evaluativo',
    q: '10. En la formación por competencias del SENA, ¿cuáles son los únicos juicios cualitativos oficiales emitidos sobre los resultados de aprendizaje alcanzados?',
    options: [
      'Excelente, Sobresaliente, Aceptable o Insuficiente.',
      'Calificaciones numéricas en escala de 0 a 100 puntos.',
      'Juicios cualitativos de "Aprobado" o "No Aprobado".',
      'Apto, No Apto o Pendiente de Juicio.',
    ],
    answer: 2,
    explanation: 'El SENA evalúa cualitativamente emitiendo exclusivamente el juicio de APROBADO o NO APROBADO.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Plan de Mejoramiento',
    q: '11. Si un aprendiz no logra superar un resultado de aprendizaje en el tiempo estipulado, ¿qué medida pedagógica y formativa concertada debe formular el instructor?',
    options: [
      'Cancelación inmediata y automática de la matrícula.',
      'Un Plan de Mejoramiento académico con actividades complementarias y cronograma específico para alcanzar la competencia.',
      'Cobro monetario para el siguiente trimestre.',
      'Asignación de sanciones disciplinarias en la hoja de vida.',
    ],
    answer: 1,
    explanation: 'El Plan de Mejoramiento es la medida pedagógica formativa concertada para subsanar deficiencias y alcanzar el resultado de aprendizaje.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Garantías Disciplinarias',
    q: '12. Ante una presunta falta grave o gravísima, ¿qué garantía constitucional y reglamentaria ampara al aprendiz durante todo el Comité de Evaluación?',
    options: [
      'El derecho a no ser convocado a la sesión.',
      'El Debido Proceso: derecho a conocer los cargos y pruebas, ser escuchado en descargos, controvertir señalamientos e interponer recursos.',
      'El derecho a exigir la aprobación automática del curso.',
      'La exención total de investigación por ser estudiante.',
    ],
    answer: 1,
    explanation: 'El Debido Proceso garantiza la presunción de inocencia, descargos, contradicción de pruebas y derecho a la defensa.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Requisitos de Certificación',
    q: '13. Para obtener el título o certificado de formación profesional (Art. 19), ¿en qué plataforma estatal es requisito indispensable registrarse y actualizar la hoja de vida?',
    options: [
      'En redes sociales institucionales.',
      'En la Agencia Pública de Empleo (APE) del SENA.',
      'En la Registraduría Nacional del Estado Civil.',
      'En la Cámara de Comercio del municipio.',
    ],
    answer: 1,
    explanation: 'El registro y actualización en la Agencia Pública de Empleo (APE) del SENA es requisito legal indispensable para la certificación (Art. 19).',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Medidas Sancionatorias',
    q: '14. Cuando un aprendiz comete una falta gravísima comprobada tras surtirse el debido proceso, ¿cuáles son las medidas sancionatorias previstas en el reglamento?',
    options: [
      'Pena privativa de la libertad y multas bancarias.',
      'Condicionamiento de matrícula o Cancelación de la matrícula con inhabilidad temporal para ingresar al SENA.',
      'Trabajos de servicio comunitario forzado.',
      'Retención indefinida de documentos de identidad.',
    ],
    answer: 1,
    explanation: 'Las sanciones disciplinarias oficiales contempladas son el condicionamiento de matrícula y la cancelación definitiva de matrícula.',
  },
  {
    type: 'mc',
    context: 'Caso de Estudio: Trámites Administrativos',
    q: '15. Sofía cambia de domicilio a otra ciudad y necesita continuar su mismo programa de formación en el Centro SENA de su nueva residencia. ¿Qué trámite debe gestionar?',
    options: [
      'Novedad académica de Traslado de Centro de Formación, acreditando paz y salvos y sujeta a disponibilidad de cupo.',
      'Volver a inscribirse a través de convocatoria pública desde el primer trimestre.',
      'Pedirle a un compañero que asista virtualmente en su nombre.',
      'Comprar un cupo en la administración del nuevo centro.',
    ],
    answer: 0,
    explanation: 'El traslado es la novedad reglamentaria que permite solicitar cambio de jornada, sede o Centro de formación.',
  },

  // 10 Preguntas de Verdadero / Falso
  {
    type: 'tf',
    context: 'Conoce tu Institución: Cobertura Territorial',
    q: '16. El SENA cuenta con presencia formativa en la totalidad de los 32 departamentos de Colombia y el Distrito Capital a través de sus 33 Regionales.',
    answer: true,
    explanation: 'Verdadero: El SENA cubre el 100% de la geografía nacional con sus 33 Regionales oficiales.',
  },
  {
    type: 'tf',
    context: 'Conoce tu Institución: Descentralización',
    q: '17. Los más de 118 Centros de Formación del SENA están ubicados únicamente en las cuatro ciudades principales (Bogotá, Medellín, Cali y Barranquilla).',
    answer: false,
    explanation: 'Falso: El SENA tiene Centros de Formación en municipios intermedios, zonas rurales y regiones apartadas como Amazonas, Guainía, Vaupés, San Andrés y La Guajira.',
  },
  {
    type: 'tf',
    context: 'Principios y Normativa',
    q: '18. El debido proceso es un derecho fundamental irrenunciable que debe respetarse en toda actuación académica o disciplinaria en el SENA.',
    answer: true,
    explanation: 'Verdadero: El debido proceso garantiza presunción de inocencia, notificación oportuna, descargos y recursos en cualquier actuación.',
  },
  {
    type: 'tf',
    context: 'Deberes y Tiempos',
    q: '19. El aprendiz tiene un plazo de hasta quince (15) días hábiles para presentar al instructor los soportes de justificación formal de una inasistencia.',
    answer: false,
    explanation: 'Falso: Las inasistencias deben justificarse dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho.',
  },
  {
    type: 'tf',
    context: 'Convivencia Institucional',
    q: '20. El consumo y comercialización de bebidas alcohólicas está permitido dentro de las sedes del SENA durante celebraciones recreativas de aprendices.',
    answer: false,
    explanation: 'Falso: El consumo, porte y comercialización de alcohol o psicoactivos está terminantemente prohibido en todo momento y lugar en el SENA.',
  },
  {
    type: 'tf',
    context: 'Sistema de Evaluación',
    q: '21. La evaluación del aprendizaje en el SENA se califica con notas numéricas cuantitativas de 1.0 a 5.0 en el boletín final.',
    answer: false,
    explanation: 'Falso: La formación profesional integral del SENA maneja exclusivamente juicios cualitativos: APROBADO o NO APROBADO.',
  },
  {
    type: 'tf',
    context: 'Deberes del Aprendiz',
    q: '22. Es un deber obligatorio del aprendiz mantener sus datos de contacto, residencia y seguridad social actualizados permanentemente en el sistema de gestión académica.',
    answer: true,
    explanation: 'Verdadero: El Art. 8 consagra la actualización periódica de datos como deber obligatorio del aprendiz.',
  },
  {
    type: 'tf',
    context: 'Etapa Productiva',
    q: '23. La etapa productiva es voluntaria y el aprendiz puede titularse cursando únicamente la etapa lectiva si cuenta con buenas calificaciones.',
    answer: false,
    explanation: 'Falso: La etapa productiva es de obligatorio cumplimiento para la titulación en los programas de formación laboral y tecnológica.',
  },
  {
    type: 'tf',
    context: 'Falta Disciplinaria',
    q: '24. Suplantar la identidad de un compañero o permitir ser suplantado en evaluaciones o listas de asistencia se tipifica como una falta grave/gravísima.',
    answer: true,
    explanation: 'Verdadero: La suplantación de identidad viola la fe pública y es una falta sancionable que puede causar cancelación definitiva de matrícula.',
  },
  {
    type: 'tf',
    context: 'Criterio de Aprobación',
    q: '25. Para aprobar la evaluación final de inducción y certificar satisfactoriamente el curso, se requiere responder acertadamente al menos el 90% de las preguntas (mínimo 23 de 25 aciertos).',
    answer: true,
    explanation: 'Verdadero: El criterio institucional exige un mínimo de 90% (23 respuestas correctas) para aprobar el curso.',
  },
];

const PASSING_SCORE = 23; // 25 * 0.9 = 22.5 => 23 correct

export default function FinalExam() {
  const navigate = useNavigate();
  const { isAllReadingsCompleted, progressPercentage, saveExamResult } = useProgress();

  const [answers, setAnswers] = useState<Record<number, number | boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [passed, setPassed] = useState(false);

  // Particle layers for visual celebration (happy) and rain/tears (sad)
  interface Particle {
    id: number;
    left: number;
    delay: number;
    duration: number;
    color: string;
    size: number;
    shape: 'square' | 'circle' | 'strip';
  }

  interface Raindrop {
    id: number;
    left: number;
    delay: number;
    duration: number;
    opacity: number;
  }

  const [confettiList, setConfettiList] = useState<Particle[]>([]);
  const [raindropList, setRaindropList] = useState<Raindrop[]>([]);

  const triggerHappyEffects = () => {
    playHappyFanfare();
    const colors = [
      '#39A900',
      '#52c41a',
      '#FFD700',
      '#F59E0B',
      '#38BDF8',
      '#EC4899',
      '#10B981',
      '#8B5CF6',
    ];
    const shapes: Array<'square' | 'circle' | 'strip'> = ['square', 'circle', 'strip'];
    const list: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 96 + 2,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 7 + Math.floor(Math.random() * 8),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setConfettiList(list);
    setRaindropList([]);
  };

  const triggerSadEffects = () => {
    playSadMelody();
    const list: Raindrop[] = Array.from({ length: 36 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 96 + 2,
      delay: Math.random() * 1.8,
      duration: 1.8 + Math.random() * 1.2,
      opacity: 0.45 + Math.random() * 0.45,
    }));
    setRaindropList(list);
    setConfettiList([]);
  };

  // If user hasn't completed all readings, block exam access
  if (!isAllReadingsCompleted) {
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 transition-colors flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
          <AlertTriangle size={32} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Acceso Restringido a la Evaluación Final
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mb-4 leading-relaxed">
          Para presentar la Evaluación Final de Conocimientos debes haber completado previamente el <strong>100% de los 5 módulos de lectura</strong> (incluyendo <em>Conoce tu institución</em>).
        </p>
        <div className="bg-gray-100 dark:bg-gray-700/60 p-4 rounded-xl w-full max-w-sm mb-6 border border-gray-200 dark:border-gray-600">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Tu avance actual:</p>
          <div className="text-2xl font-black text-[#39A900]">{progressPercentage}%</div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 h-2.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#39A900] h-full rounded-full" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
        <button
          onClick={() => navigate('/induction')}
          className="bg-[#39A900] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2d8700] transition-colors shadow-md"
        >
          Volver y Completar Módulos
        </button>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === questions.length;

  const handleSubmit = async () => {
    if (!isComplete) {
      alert(`Por favor responde todas las preguntas antes de enviar. Has respondido ${answeredCount} de ${questions.length}.`);
      return;
    }

    let calculatedScore = 0;
    questions.forEach((q, i) => {
      const userAns = answers[i];
      if (userAns === q.answer) {
        calculatedScore++;
      }
    });

    const calculatedPct = Math.round((calculatedScore / questions.length) * 100);
    const hasPassed = calculatedScore >= PASSING_SCORE;

    setScore(calculatedScore);
    setPercentage(calculatedPct);
    setPassed(hasPassed);
    setSubmitted(true);

    if (hasPassed) {
      triggerHappyEffects();
    } else {
      triggerSadEffects();
    }

    // Save result via useProgress hook
    await saveExamResult(calculatedScore, hasPassed);

    // Guardar en el Repositorio Central de Evaluaciones y Respuestas (local + Firestore)
    try {
      const itemizedResponses = questions.map((q, i) => {
        const userAns = answers[i];
        const isCorrect = userAns === q.answer;
        let userAnsText = '';
        let correctAnsText = '';

        if (q.type === 'mc') {
          userAnsText = typeof userAns === 'number' ? q.options[userAns] : 'Sin respuesta';
          correctAnsText = q.options[q.answer];
        } else {
          userAnsText = userAns === true ? 'Verdadero' : userAns === false ? 'Falso' : 'Sin respuesta';
          correctAnsText = q.answer === true ? 'Verdadero' : 'Falso';
        }

        return {
          questionIndex: i + 1,
          type: q.type,
          questionText: q.q,
          context: q.context,
          userAnswer: userAns,
          correctAnswer: q.answer,
          userAnswerText: userAnsText,
          correctAnswerText: correctAnsText,
          isCorrect,
          explanation: q.explanation,
        };
      });

      const profile = getLocalApprenticeProfile();
      const diagnosis = (() => {
        try {
          const saved = localStorage.getItem('sena_diagnosis_data');
          return saved ? JSON.parse(saved) : null;
        } catch {
          return null;
        }
      })();

      await saveEvaluationRecord({
        documento: profile?.documento || 'No_identificado',
        nombreCompleto: profile?.nombreCompleto || 'Aprendiz SENA',
        ficha: profile?.ficha || 'General',
        regional: diagnosis?.regional || '',
        centro: diagnosis?.centro || '',
        modalidad: diagnosis?.modalidad || '',
        jornada: diagnosis?.jornada || '',
        nivel: diagnosis?.nivel || '',
        score: calculatedScore,
        totalQuestions: questions.length,
        percentage: calculatedPct,
        passed: hasPassed,
        responses: itemizedResponses,
      });
    } catch (err) {
      console.warn('Error al almacenar en el repositorio:', err);
    }

    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setPercentage(0);
    setPassed(false);
    setConfettiList([]);
    setRaindropList([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 transition-colors pb-20">
      {/* Botón Volver */}
      <button
        onClick={() => navigate('/induction')}
        className="mb-4 inline-flex items-center gap-1.5 text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline"
      >
        <ArrowLeft size={18} /> Volver a Inducción
      </button>

      {/* Encabezado */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <Award size={16} /> Evaluación Oficial de Inducción SENA
        </div>
        <h1 className="text-3xl font-extrabold text-[#39A900] dark:text-[#52c41a] tracking-tight">
          Evaluación Final: Reglamento y Presencia Territorial
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Esta prueba consta de <strong>25 preguntas</strong> (15 de selección múltiple y 10 de verdadero/falso) basadas en las 33 Regionales del SENA, derechos, deberes y el Acuerdo 009 de 2024. Para certificar debes obtener una calificación igual o superior al <strong>90% (mínimo 23 aciertos)</strong>.
        </p>
      </div>

      {/* Tarjeta de Resultados al Enviar */}
      {submitted && (
        <>
          {/* ========================================================================= */}
          {/* EFECTO ALEGRE (APROBADO)                                                   */}
          {/* ========================================================================= */}
          {passed ? (
            <div className="mb-10 p-6 sm:p-8 rounded-3xl border-2 border-[#39A900] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/60 dark:via-emerald-950/40 dark:to-gray-800 shadow-2xl animate-pop-success relative overflow-hidden">
              {/* Confeti Flotante */}
              {confettiList.length > 0 && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                  {confettiList.map((p) => (
                    <div
                      key={p.id}
                      className="absolute top-0 animate-confetti"
                      style={{
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        backgroundColor: p.color,
                        width: p.shape === 'strip' ? `${p.size * 0.4}px` : `${p.size}px`,
                        height: p.shape === 'strip' ? `${p.size * 2}px` : `${p.size}px`,
                        borderRadius: p.shape === 'circle' ? '9999px' : '2px',
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative z-10">
                {/* Trofeo Alegre Animado */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-yellow-950 flex items-center justify-center shadow-lg animate-happy-bounce">
                    <Trophy size={42} className="text-yellow-900" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
                    🎉
                  </span>
                  <span className="absolute -bottom-1 -left-1 text-xl animate-pulse">
                    ⭐
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <span className="px-3 py-1 rounded-full bg-green-200 dark:bg-green-800/80 text-green-950 dark:text-green-100 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <Sparkles size={14} className="text-amber-500 animate-spin" /> ¡Misión Cumplida!
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-black uppercase tracking-wide">
                      🏆 Inducción Aprobada
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-green-900 dark:text-green-100 tracking-tight">
                    ¡SÍ SE PUDO! 🎉 ¡FELICITACIONES, APROBASTE LA EVALUACIÓN!
                  </h2>

                  <p className="text-sm sm:text-base text-green-800 dark:text-green-200 mt-2 leading-relaxed font-normal">
                    ¡Excelente trabajo, aprendiz! Demostraste un dominio integral sobre el <strong>Acuerdo 009 de 2024</strong>, tus derechos, deberes, prohibiciones y la presencia de las 33 Regionales del SENA. Tu resultado ha sido registrado y estás formalmente capacitado para iniciar tu etapa formativa con total éxito.
                  </p>

                  {/* Estadísticas de Calificación */}
                  <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <div className="px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-sm border border-green-200 dark:border-green-800 text-green-900 dark:text-green-200 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-[#39A900]" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Tu Puntaje:</span>
                      <span className="font-black text-lg text-[#39A900]">
                        {score} / 25 ({percentage}%)
                      </span>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-sm border border-green-200 dark:border-green-800 text-xs font-semibold text-gray-600 dark:text-gray-300">
                      <span>Requisito de Certificación: </span>
                      <span className="font-bold text-gray-900 dark:text-white">90% (23 aciertos)</span>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-4 border-t border-green-200/80 dark:border-green-800/60">
                    <button
                      onClick={() => navigate('/induction')}
                      className="bg-[#39A900] hover:bg-[#2d8700] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Award size={18} /> Ir a Resumen de Inducción
                    </button>

                    <button
                      onClick={() => navigate('/repository')}
                      className="px-5 py-3 rounded-xl bg-gray-900 hover:bg-black text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Database size={16} className="text-[#39A900]" /> Ver en Repositorio de Respuestas
                    </button>

                    <button
                      onClick={triggerHappyEffects}
                      className="px-5 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-green-300 dark:border-green-700 font-bold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <PartyPopper size={16} className="text-amber-500" /> ¡Lanzar Confeti y Celebrar de Nuevo!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* EFECTO TRISTE (NO APROBADO)                                                */
            /* ========================================================================= */
            <div className="mb-10 p-6 sm:p-8 rounded-3xl border-2 border-rose-400 dark:border-rose-600 bg-gradient-to-br from-rose-50/90 via-slate-50 to-blue-50/70 dark:from-rose-950/40 dark:via-slate-900/60 dark:to-blue-950/30 shadow-2xl animate-shake relative overflow-hidden">
              {/* Lluvia de Lágrimas Flotante */}
              {raindropList.length > 0 && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                  {raindropList.map((r) => (
                    <div
                      key={r.id}
                      className="absolute top-0 animate-rain flex flex-col items-center"
                      style={{
                        left: `${r.left}%`,
                        animationDelay: `${r.delay}s`,
                        animationDuration: `${r.duration}s`,
                        opacity: r.opacity,
                      }}
                    >
                      <span className="text-blue-400 dark:text-blue-300 text-xl drop-shadow select-none">
                        💧
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative z-10">
                {/* Avatar Triste Animado */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-200 to-indigo-100 dark:from-rose-900/60 dark:to-slate-800 text-rose-700 dark:text-rose-300 flex items-center justify-center shadow-md animate-sad-droop">
                    <span className="text-4xl select-none" role="img" aria-label="Carita triste">
                      😢
                    </span>
                  </div>
                  <span className="absolute -top-2 -right-2 text-2xl animate-pulse">
                    🌧️
                  </span>
                  <span className="absolute -bottom-1 -left-1 text-xl">
                    💔
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <span className="px-3 py-1 rounded-full bg-rose-200 dark:bg-rose-900/80 text-rose-950 dark:text-rose-100 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <Frown size={14} className="text-rose-600 dark:text-rose-400" /> ¡No te rindas!
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-black uppercase tracking-wide">
                      Meta mínima: 90% (23 / 25)
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-rose-950 dark:text-rose-100 tracking-tight">
                    ¡OH NO! 😢 NO SE ALCANZÓ EL MÍNIMO PARA APROBAR
                  </h2>

                  <p className="text-sm sm:text-base text-rose-900/90 dark:text-rose-200/90 mt-2 leading-relaxed font-normal">
                    Sentimos que esta vez no hayas alcanzado la meta requerida, ¡pero el tropiezo es parte fundamental del aprendizaje! En el SENA valoramos tu esfuerzo y perseverancia. Obtuviste <strong>{score} de 25 aciertos</strong> ({percentage}%).
                  </p>

                  <div className="mt-3 p-3.5 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p className="font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                      <CloudRain size={16} /> Clave pedagógica para tu revancha:
                    </p>
                    <p>
                      Revisa a continuación cada una de las preguntas que respondiste incorrectamente (resaltadas en rojo con su explicación detallada). Una vez repases los conceptos, repite la prueba con toda la confianza.
                    </p>
                  </div>

                  {/* Estadísticas de Calificación */}
                  <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <div className="px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-sm border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 flex items-center gap-2">
                      <XCircle size={18} className="text-rose-600" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Tu resultado:</span>
                      <span className="font-black text-lg text-rose-600 dark:text-rose-400">
                        {score} / 25 ({percentage}%)
                      </span>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-sm border border-rose-200 dark:border-rose-800 text-xs font-semibold text-gray-600 dark:text-gray-300">
                      <span>Te faltaron: </span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">{Math.max(0, 23 - score)} aciertos</span>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-4 border-t border-rose-200/80 dark:border-rose-800/60">
                    <button
                      onClick={handleRetry}
                      className="bg-rose-600 hover:bg-rose-700 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw size={18} /> 💪 ¡Ánimo! Repetir Evaluación Ahora
                    </button>

                    <button
                      onClick={() => navigate('/repository')}
                      className="px-4 py-3 rounded-xl bg-gray-900 hover:bg-black text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Database size={16} className="text-amber-400" /> Ver en Repositorio de Respuestas
                    </button>

                    <button
                      onClick={triggerSadEffects}
                      className="px-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 font-semibold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <CloudRain size={16} className="text-blue-500" /> Ver Lluvia de Ánimo
                    </button>

                    <button
                      onClick={() => navigate('/induction')}
                      className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      Volver a Repasar Módulos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Indicador flotante de avance de preguntas */}
      {!submitted && (
        <div className="sticky top-4 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <HelpCircle size={18} className="text-[#39A900]" />
            <span>Preguntas respondidas:</span>
            <span className="text-[#39A900] font-bold">
              {answeredCount} / {questions.length}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {isComplete ? '✓ Todas respondidas' : `Faltan ${questions.length - answeredCount}`}
          </span>
        </div>
      )}

      {/* Lista de Preguntas */}
      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAns = answers[index];
          const isAnswered = userAns !== undefined;
          const isCorrect = submitted && userAns === question.answer;

          return (
            <div
              key={index}
              className={`p-5 rounded-xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-green-400 bg-green-50/20 dark:bg-green-950/10'
                    : 'border-red-400 bg-red-50/20 dark:bg-red-950/10'
                  : isAnswered
                  ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700/30'
              }`}
            >
              {question.context && (
                <span className="text-xs font-bold uppercase tracking-wider text-[#39A900] dark:text-[#52c41a] block mb-1">
                  {question.context}
                </span>
              )}

              <p className="font-bold text-base text-gray-900 dark:text-gray-100 mb-4 leading-snug">
                {question.q}
              </p>

              {/* Opciones Tipo Selección Múltiple */}
              {question.type === 'mc' && (
                <div className="space-y-2.5">
                  {question.options.map((option, optIdx) => {
                    const isSelected = userAns === optIdx;
                    const isOptCorrect = submitted && question.answer === optIdx;
                    return (
                      <label
                        key={optIdx}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          submitted
                            ? isOptCorrect
                              ? 'border-green-500 bg-green-100/50 dark:bg-green-900/30 text-green-900 dark:text-green-100 font-semibold'
                              : isSelected
                              ? 'border-red-500 bg-red-100/50 dark:bg-red-900/30 text-red-900 dark:text-red-100'
                              : 'border-gray-200 dark:border-gray-600 opacity-60'
                            : isSelected
                            ? 'border-[#39A900] bg-green-50 dark:bg-green-950/30 font-medium'
                            : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q_${index}`}
                          checked={isSelected}
                          disabled={submitted}
                          onChange={() => setAnswers(prev => ({ ...prev, [index]: optIdx }))}
                          className="mt-1 accent-[#39A900]"
                        />
                        <span className="text-sm leading-relaxed">{option}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Opciones Tipo Verdadero / Falso */}
              {question.type === 'tf' && (
                <div className="flex flex-wrap gap-4 mt-2">
                  {[true, false].map((val) => {
                    const isSelected = userAns === val;
                    const isOptCorrect = submitted && question.answer === val;
                    return (
                      <label
                        key={String(val)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${
                          submitted
                            ? isOptCorrect
                              ? 'border-green-500 bg-green-100/50 dark:bg-green-900/30 text-green-900 dark:text-green-100 font-bold'
                              : isSelected
                              ? 'border-red-500 bg-red-100/50 dark:bg-red-900/30 text-red-900 dark:text-red-100'
                              : 'border-gray-200 dark:border-gray-600 opacity-60'
                            : isSelected
                            ? 'border-[#39A900] bg-green-50 dark:bg-green-950/30 font-bold text-[#39A900]'
                            : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q_${index}`}
                          checked={isSelected}
                          disabled={submitted}
                          onChange={() => setAnswers(prev => ({ ...prev, [index]: val }))}
                          className="accent-[#39A900]"
                        />
                        <span className="text-sm font-semibold">{val ? 'Verdadero' : 'Falso'}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Retroalimentación formativa tras enviar */}
              {submitted && (
                <div
                  className={`mt-4 pt-3 border-t text-xs leading-relaxed ${
                    isCorrect
                      ? 'border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
                      : 'border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
                  }`}
                >
                  <p className="font-bold mb-0.5">
                    {isCorrect ? '✓ Respuesta correcta' : '✗ Respuesta incorrecta'}:
                  </p>
                  <p>{question.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón de Envío */}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => navigate('/induction')}
          className="w-full sm:w-auto px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          ← Volver a Módulos
        </button>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold shadow-md transition-all text-base ${
              isComplete
                ? 'bg-[#39A900] text-white hover:bg-[#2d8700] hover:shadow-lg'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {isComplete ? 'Enviar Evaluación Final (25 / 25)' : `Completar preguntas (${answeredCount} / 25)`}
          </button>
        ) : !passed ? (
          <button
            onClick={handleRetry}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow transition-all inline-flex items-center justify-center gap-2 text-base"
          >
            <RotateCcw size={18} /> Reintentar Evaluación
          </button>
        ) : (
          <button
            onClick={() => navigate('/induction')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-[#39A900] text-white hover:bg-[#2d8700] shadow-md transition-all text-base"
          >
            Finalizar y Guardar Certificado ✓
          </button>
        )}
      </div>
    </div>
  );
}

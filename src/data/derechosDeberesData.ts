export interface NormItem {
  id: string;
  numeral: number;
  articulo: string;
  tipo: 'derecho' | 'deber' | 'prohibicion';
  categoria: string;
  titulo: string;
  resumen: string;
  textoCompleto: string;
  explicacionModerna: string;
  icono?: string;
  palabrasClave: string[];
}

export interface QuizQuestion {
  id: string;
  contexto: string;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  tipoNorma: 'derecho' | 'deber' | 'prohibicion' | 'procedimiento';
  articuloReferencia: string;
  refuerzoPedagogico: {
    dondeEstuvoElError: string;
    fundamentoNormativo: string;
    claveParaTuVida: string;
  };
  retroalimentacionPositiva: string;
}

export const DERECHOS_LIST: NormItem[] = [
  {
    id: "der-1",
    numeral: 1,
    articulo: "Artículo 5, Numeral 1",
    tipo: "derecho",
    categoria: "Académico e Inducción",
    titulo: "Inducción integral y oportuna",
    resumen: "Conocer el reglamento, bienestar, organización del SENA y ruta de certificación.",
    textoCompleto: "Recibir una inducción que le permita conocer el reglamento del aprendiz, el plan nacional integral de bienestar al aprendiz, la organización de la entidad, así como los requisitos y procedimientos necesarios para culminar su proceso de formación y obtener la certificación o título respectivo.",
    explicacionModerna: "Desde tu primer día, tienes derecho a saber claramente cómo funciona el SENA, qué se espera de ti y qué beneficios tienes a tu disposición.",
    palabrasClave: ["inducción", "reglamento", "bienestar", "certificación", "inicio"]
  },
  {
    id: "der-2",
    numeral: 2,
    articulo: "Artículo 5, Numeral 2",
    tipo: "derecho",
    categoria: "Académico e Inducción",
    titulo: "Formación profesional integral de calidad",
    resumen: "Disposición oportuna de instructores capacitados, recursos físicos y tecnológicos.",
    textoCompleto: "Recibir formación profesional integral de calidad, consecuente con el programa de formación mediante la disposición oportuna de talento humanos, físicos y tecnológicos suficientes para el desarrollo del proceso formativo, según se dispone en los procedimientos institucionales.",
    explicacionModerna: "Tu formación debe ser de alto nivel: instructores competentes, talleres equipados y herramientas pedagógicas pertinentes.",
    palabrasClave: ["calidad", "instructores", "tecnología", "ambientes"]
  },
  {
    id: "der-3",
    numeral: 3,
    articulo: "Artículo 5, Numeral 3",
    tipo: "derecho",
    categoria: "Identidad Institucional",
    titulo: "Acreditación como aprendiz SENA",
    resumen: "Ser acreditado formalmente con carné físico o digital ante dependencias y entidades externas.",
    textoCompleto: "Ser acreditado como aprendiz del SENA ante dependencias internas y externas cuando sea requerido.",
    explicacionModerna: "El SENA debe expedirte tu carné de aprendiz para identificarte en sedes, convenios, transporte o eventos empresariales.",
    palabrasClave: ["carné", "acreditación", "identificación", "estatus"]
  },
  {
    id: "der-4",
    numeral: 4,
    articulo: "Artículo 5, Numeral 4",
    tipo: "derecho",
    categoria: "Recursos y Ambientes",
    titulo: "Acceso a infraestructura y recursos didácticos",
    resumen: "Tener a disposición instalaciones, bibliotecas físicas y digitales y recursos del Centro.",
    textoCompleto: "Tener a su alcance y disposición la infraestructura, recursos físicos, técnicos, tecnológicos, didácticos, y bibliográficos del Centro de Formación, que sean requeridos para su proceso de formación, de acuerdo con la modalidad y programa de formación. Utilizar las instalaciones y la dotación del Centro de Formación o de otros ambientes donde la entidad desarrolle acciones de formación; para los programas con modalidad virtual y a distancia el SENA, el aprendiz podrá disponer de los recursos requeridos para la formación; conforme con la reglamentación respectiva.",
    explicacionModerna: "Puedes usar libremente las salas de cómputo, talleres, bibliotecas digitales (SBS) y conectividad dispuesta en los Centros.",
    palabrasClave: ["infraestructura", "biblioteca", "talleres", "conectividad", "LMS"]
  },
  {
    id: "der-5",
    numeral: 5,
    articulo: "Artículo 5, Numeral 5",
    tipo: "derecho",
    categoria: "Seguridad y Salud (SST)",
    titulo: "Elementos de Protección Personal (EPP)",
    resumen: "Recibir del Centro los EPP requeridos para talleres y prácticas para salvaguardar tu integridad.",
    textoCompleto: "Recibir oportunamente, del Centro de Formación, los elementos de protección personal requeridos para la ejecución de actividades propias del programa de formación, que permitan salvaguardar su integridad física, en los ambientes de formación del SENA o de otras entidades y lugares donde se desarrolle formación presencial.",
    explicacionModerna: "Si tu programa incluye trabajo de laboratorio o taller con maquinaria, el Centro debe suministrarte los equipos de protección adecuados para cuidar tu vida.",
    palabrasClave: ["EPP", "protección", "seguridad", "talleres", "salud"]
  },
  {
    id: "der-6",
    numeral: 6,
    articulo: "Artículo 5, Numeral 6",
    tipo: "derecho",
    categoria: "Bienestar e Inclusión",
    titulo: "Beneficios del Plan Integral de Bienestar",
    resumen: "Acceder a apoyos de sostenimiento, monitorías, deporte, salud, cultura y recreación.",
    textoCompleto: "Disfrutar de los beneficios del plan nacional integral de bienestar al aprendiz de su Centro de Formación, orientado a promover su permanencia y certificación en la formación profesional integral, conforme a la normatividad vigente.",
    explicacionModerna: "Tienes derecho a postularte a subsidios, apoyos de alimentación, transporte, actividades artísticas, torneos y atención psicológica.",
    palabrasClave: ["bienestar", "apoyos", "sostenimiento", "deporte", "cultura", "salud"]
  },
  {
    id: "der-7",
    numeral: 7,
    articulo: "Artículo 5, Numeral 7",
    tipo: "derecho",
    categoria: "Formación Humana",
    titulo: "Orientación humanista, ocupacional y actitudinal",
    resumen: "Acompañamiento integral que impulse tu perfil laboral y tu crecimiento personal.",
    textoCompleto: "Recibir orientación humanista, ocupacional y actitudinal que estimule su desarrollo personal, su perfil ocupacional.",
    explicacionModerna: "El SENA no solo enseña técnica; también te orienta en proyecto de vida, ética profesional y habilidades socioemocionales para el empleo.",
    palabrasClave: ["orientación", "humanismo", "perfil ocupacional", "habilidades blandas"]
  },
  {
    id: "der-8",
    numeral: 8,
    articulo: "Artículo 5, Numeral 8",
    tipo: "derecho",
    categoria: "Bienestar e Inclusión",
    titulo: "Inclusión y ajustes razonables por discapacidad",
    resumen: "Reconocimiento y adecuación de materiales, espacios y evaluaciones para personas con discapacidad.",
    textoCompleto: "Reconocerse y ser reconocido como persona con discapacidad en caso de serlo, mediante el registro de su respectiva condición o discapacidad en el sistema de gestión académica administrativa; como resultado de su libre elección, expresión y de su autorreconocimiento. Ser reconocido como aprendiz con discapacidad, cuando la tuviere, respetando su integridad física y mental, con el propósito de fomentar la inclusión social en los diferentes escenarios en que participa. Solicitar los ajustes razonables requeridos y pertinentes en su proceso de formación, que posibiliten su participación, progreso, permanencia y certificación en la formación; de acuerdo con la normatividad vigente.",
    explicacionModerna: "Si tienes alguna discapacidad, el SENA debe garantizarte adaptaciones curriculares, tecnológicas y de accesibilidad para tu éxito.",
    palabrasClave: ["discapacidad", "ajustes razonables", "inclusión", "accesibilidad"]
  },
  {
    id: "der-9",
    numeral: 9,
    articulo: "Artículo 5, Numeral 9",
    tipo: "derecho",
    categoria: "Bienestar e Inclusión",
    titulo: "Enfoque diferencial para grupos protegidos",
    resumen: "Atención prioritaria y con enfoque diferencial para víctimas, comunidades étnicas y vulnerables.",
    textoCompleto: "Reconocerse y ser reconocido como persona que pertenece a los grupos poblacionales de especial protección por parte del Estado, mediante el registro de su respectiva condición en el sistema de gestión académica administrativa; como resultado de su libre elección, expresión y de su autorreconocimiento. Ser reconocido como aprendiz en condición de vulnerabilidad cuando la tuviere, con el propósito de fomentar la inclusión social en los diferentes escenarios en que participa; de acuerdo con la normatividad vigente.",
    explicacionModerna: "Protección especial para comunidades indígenas, afrodescendientes, víctimas del conflicto, campesinos y sectores vulnerables.",
    palabrasClave: ["enfoque diferencial", "vulnerabilidad", "grupos protegidos", "víctimas"]
  },
  {
    id: "der-10",
    numeral: 10,
    articulo: "Artículo 5, Numeral 10",
    tipo: "derecho",
    categoria: "Debido Proceso y Garantías",
    titulo: "Garantía plena al Debido Proceso",
    resumen: "Derecho a la defensa, contradicción, presunción de inocencia y ser escuchado con pruebas.",
    textoCompleto: "Tener el debido proceso en las diferentes etapas de la formación, en los procesos administrativos y disciplinarios; hacer uso en todo momento del derecho de defensa y contradicción, con observancia de los principios de convivencia y las normas establecidas en este reglamento.",
    explicacionModerna: "Nadie puede sancionarte sin antes escucharte formalmente, notificarte con pruebas y permitirte presentar tus descargos en Comité.",
    palabrasClave: ["debido proceso", "defensa", "contradicción", "presunción de inocencia"]
  },
  {
    id: "der-11",
    numeral: 11,
    articulo: "Artículo 5, Numeral 11",
    tipo: "derecho",
    categoria: "Debido Proceso y Garantías",
    titulo: "Notificación de novedades y sanciones",
    resumen: "Ser informado oportunamente por escrito de cualquier decisión académica o disciplinaria.",
    textoCompleto: "Ser notificado de las novedades académicas, administrativas o disciplinarias y de las sanciones, cuando estas ocurran.",
    explicacionModerna: "Toda decisión de la Subdirección o Comité debe comunicarse formalmente a tu correo institucional o domicilio con los plazos legales.",
    palabrasClave: ["notificación", "sanciones", "novedades", "comunicación"]
  },
  {
    id: "der-12",
    numeral: 12,
    articulo: "Artículo 5, Numeral 12",
    tipo: "derecho",
    categoria: "Participación y Trámites",
    titulo: "Peticiones respetuosas y respuesta oportuna",
    resumen: "Hacer solicitudes respetuosas y recibir respuestas claras dentro de los términos legales.",
    textoCompleto: "Ser escuchado y atendido en sus peticiones respetuosas, por parte de los directivos, instructores y personal administrativo en sus diferentes instancias, cuando lo requiera, y a recibir atención y respuesta oportuna a sus solicitudes.",
    explicacionModerna: "Tienes derecho a formular derechos de petición y solicitudes académicas y recibir respuesta puntual de tus instructores y directivos.",
    palabrasClave: ["peticiones", "respuesta oportuna", "atención al ciudadano", "PQRS"]
  },
  {
    id: "der-13",
    numeral: 13,
    articulo: "Artículo 5, Numeral 13",
    tipo: "derecho",
    categoria: "Convivencia y Protección",
    titulo: "Rutas de atención frente a vulneración de derechos o acoso",
    resumen: "Asesoría para activar protocolos contra acoso sexual, discriminación o maltrato.",
    textoCompleto: "Recibir asesoría del Centro de Formación para activar rutas de atención que le permita denunciar la presunta vulneración de un derecho, trato, propuestas, acosos o actos inmorales por parte de cualquier miembro de la comunidad educativa o visitantes en la Entidad, de acuerdo con protocolo adoptado por la entidad.",
    explicacionModerna: "El SENA cuenta con un protocolo estricto (Ley 2365 de 2024) para protegerte y acompañarte ante cualquier caso de acoso, violencia o acoso sexual.",
    palabrasClave: ["acoso sexual", "rutas de atención", "protección", "denuncia", "respeto"]
  },
  {
    id: "der-14",
    numeral: 14,
    articulo: "Artículo 5, Numeral 14",
    tipo: "derecho",
    categoria: "Académico e Inducción",
    titulo: "Participación en autoevaluación e instructores calificados",
    resumen: "Evaluar tu programa de formación y contar con instructores de alta idoneidad técnica.",
    textoCompleto: "Participar activa y objetivamente en el mejoramiento continuo a través de los procesos de autoevaluación del programa de formación y tener instructores con alto nivel de experticia técnica y pedagógica.",
    explicacionModerna: "Tu opinión cuenta en las encuestas de evaluación docente e institucional para mejorar la calidad educativa del Centro.",
    palabrasClave: ["autoevaluación", "instructores", "calidad", "mejora continua"]
  },
  {
    id: "der-15",
    numeral: 15,
    articulo: "Artículo 5, Numeral 15",
    tipo: "derecho",
    categoria: "Evaluación y Calificaciones",
    titulo: "Evaluación objetiva y entrega de resultados en 8 días hábiles",
    resumen: "Conocer calificaciones y juicios evaluativos en un plazo máximo de 8 días hábiles.",
    textoCompleto: "Ser evaluado objetiva e integralmente, con base en los criterios de evaluación, los resultados de aprendizaje y la ruta formativa de su programa de formación, según los procedimientos institucionales; y conocer los resultados de las evaluaciones dentro de los ocho (8) días hábiles siguientes a su realización.",
    explicacionModerna: "Tu instructor debe publicar o informarte tus notas en máximo 8 días hábiles tras la presentación de la evidencia en Zajuna o taller.",
    palabrasClave: ["evaluación", "8 días hábiles", "calificación", "criterios"]
  },
  {
    id: "der-16",
    numeral: 16,
    articulo: "Artículo 5, Numeral 16",
    tipo: "derecho",
    categoria: "Evaluación y Calificaciones",
    titulo: "Revisión respetuosa de evaluaciones",
    resumen: "Pedir revisión motivada de una nota en desacuerdo e incluso solicitar segundo evaluador.",
    textoCompleto: "Solicitar respetuosamente la revisión de las evaluaciones correspondientes, si considera que el resultado no es objetivo, de acuerdo con lo establecido en este reglamento.",
    explicacionModerna: "Si consideras injusta una nota, tienes 2 días hábiles para pedir revisión y si persiste la duda, un segundo evaluador designado.",
    palabrasClave: ["revisión", "segundo evaluador", "reclamo", "calificación"]
  },
  {
    id: "der-17",
    numeral: 17,
    articulo: "Artículo 5, Numeral 17",
    tipo: "derecho",
    categoria: "Etapa Productiva",
    titulo: "Información y orientación sobre etapa productiva",
    resumen: "Recibir asesoría sobre modalidades productivas (contrato, proyecto, monitoría, pasantía).",
    textoCompleto: "Recibir información y orientación acerca de las diferentes opciones para desarrollar la etapa productiva, los derechos, obligaciones y plazos para su desarrollo o realización, y demás condiciones conducentes a la culminación del proceso, su certificación o titulación.",
    explicacionModerna: "La coordinación y el responsable de contrato deben orientarte a tiempo sobre cómo vincularte con empresas o proyectos productivos.",
    palabrasClave: ["etapa productiva", "contrato de aprendizaje", "vínculo laboral", "proyecto"]
  },
  {
    id: "der-18",
    numeral: 18,
    articulo: "Artículo 5, Numeral 18",
    tipo: "derecho",
    categoria: "Convivencia y Protección",
    titulo: "Trato digno, respetuoso e igualitario",
    resumen: "Ser tratado con dignidad y justicia por directivos, instructores, pares y administrativos.",
    textoCompleto: "Recibir trato digno, respetuoso, igualitario y justo por parte de todos los integrantes de la comunidad educativa.",
    explicacionModerna: "Nadie puede discriminarte, gritarte o humillarte en ningún espacio físico o virtual del SENA.",
    palabrasClave: ["trato digno", "respeto", "igualdad", "justicia"]
  },
  {
    id: "der-19",
    numeral: 19,
    articulo: "Artículo 5, Numeral 19",
    tipo: "derecho",
    categoria: "Libertades",
    titulo: "Libertad de pensamiento y expresión",
    resumen: "Expresar ideas y opiniones libremente dentro del respeto a los derechos ajenos.",
    textoCompleto: "Expresar con libertad su pensamiento, conocimiento e ideas en el marco del respeto hacia los demás.",
    explicacionModerna: "Puedes debatir, aportar tus ideas y cuestionar constructivamente siempre con respeto y argumentos.",
    palabrasClave: ["libertad de pensamiento", "expresión", "opinión", "debate"]
  },
  {
    id: "der-20",
    numeral: 20,
    articulo: "Artículo 5, Numeral 20",
    tipo: "derecho",
    categoria: "Bienestar e Inclusión",
    titulo: "Participación en estrategias de desarrollo integral",
    resumen: "Acceder a programas y convocatorias que fortalezcan tu ser integral.",
    textoCompleto: "Postularse o participaren aquellas estrategias que el SENA proponga para el fortalecimiento del ser integral del aprendiz, previo cumplimiento de los requisitos que se establezcan.",
    explicacionModerna: "Participar en campeonatos, semilleros de investigación (SENNAPRENDE), ferias y eventos de liderazgo.",
    palabrasClave: ["desarrollo integral", "postulación", "estrategias", "liderazgo"]
  },
  {
    id: "der-21",
    numeral: 21,
    articulo: "Artículo 5, Numeral 21",
    tipo: "derecho",
    categoria: "Participación y Trámites",
    titulo: "Elegir y ser elegido representante o vocero",
    resumen: "Derecho democrático al voto y postulación para liderar tu grupo, jornada o sede.",
    textoCompleto: "Participar en el proceso de elección del representante de aprendiz SENA, para elegir o ser elegido, por medio de la postulación voluntaria o votación para la elección de representante o vocero de los aprendices en las diferentes instancias, de acuerdo con los requisitos, el presente reglamento y el procedimiento establecido por el SENA.",
    explicacionModerna: "Puedes postularte como vocero de tu ficha o como representante de jornada en las elecciones anuales de septiembre.",
    palabrasClave: ["democracia", "representante", "vocero", "votación", "elección"]
  },
  {
    id: "der-22",
    numeral: 22,
    articulo: "Artículo 5, Numeral 22",
    tipo: "derecho",
    categoria: "Evaluación y Calificaciones",
    titulo: "Actividades de formación y evaluaciones supletorias",
    resumen: "Presentar evidencias y exámenes en nueva fecha si justificaste debidamente tu inasistencia.",
    textoCompleto: "Desarrollar las evaluaciones y demás actividades de formación que hayan sido realizadas en su ausencia, en el cronograma establecido por los instructores del equipo ejecutor de su grupo, cuando presente la debida justificación de la inasistencia o incumplimiento, dentro de los términos establecidos en este reglamento.",
    explicacionModerna: "Si faltas por enfermedad justificada, tu instructor debe reprogramar tus exámenes y talleres sin penalizarte la nota.",
    palabrasClave: ["supletorio", "reprogramación", "inasistencia justificada", "cronograma"]
  },
  {
    id: "der-23",
    numeral: 23,
    articulo: "Artículo 5, Numeral 23",
    tipo: "derecho",
    categoria: "Etapa Productiva",
    titulo: "Acompañamiento en la elección de etapa productiva",
    resumen: "Apoyo institucional para definir la mejor alternativa productiva según tu perfil.",
    textoCompleto: "Recibir acompañamiento para la selección de la modalidad de la etapa productiva.",
    explicacionModerna: "Instructores y tutores deben asesorarte para elegir entre contrato de aprendizaje, proyecto productivo o monitoría.",
    palabrasClave: ["acompañamiento", "selección alternativa", "etapa productiva"]
  },
  {
    id: "der-24",
    numeral: 24,
    articulo: "Artículo 5, Numeral 24",
    tipo: "derecho",
    categoria: "Certificación y Graduación",
    titulo: "Obtención de certificación o título profesional",
    resumen: "Recibir tu título o certificado al aprobar el 100% de la formación y cumplir los requisitos.",
    textoCompleto: "Obtener la certificación o título del programa de formación correspondiente, cuando apruebe todos los resultados de aprendizaje y cumpla los demás requisitos institucionales de certificación o titulación y aquellos establecidos por las normas vigentes.",
    explicacionModerna: "La meta máxima: culminar con honores tu formación y recibir tu título oficial sin dilaciones indebidas.",
    palabrasClave: ["título", "certificación", "graduación", "paz y salvo"]
  }
];

export const DEBERES_LIST: NormItem[] = [
  {
    id: "deb-1",
    numeral: 1,
    articulo: "Artículo 8, Numeral 1",
    tipo: "deber",
    categoria: "Compromiso Institucional",
    titulo: "Suscripción del acta de compromiso",
    resumen: "Firmar el compromiso de cumplimiento de deberes y normas al asentar la matrícula.",
    textoCompleto: "Suscribir al momento de asentar la matrícula, el acta de compromiso como aprendiz SENA en cumplimiento de sus obligaciones y deberes en las diferentes acciones, actividades y estrategias durante el proceso de formación.",
    explicacionModerna: "Al legalizar tu matrícula, adquieres oficialmente el deber ético y legal de formarte con responsabilidad.",
    palabrasClave: ["matrícula", "compromiso", "acta", "firma"]
  },
  {
    id: "deb-2",
    numeral: 2,
    articulo: "Artículo 8, Numeral 2",
    tipo: "deber",
    categoria: "Normativa y Convivencia",
    titulo: "Conocer y cumplir el Reglamento del Aprendiz",
    resumen: "Leer, asimilar y respetar las normas institucionales y manuales de convivencia.",
    textoCompleto: "Conocer y cumplir el reglamento del aprendiz y demás normas del SENA asociadas con su proceso formativo.",
    explicacionModerna: "El desconocimiento de la norma no te exime de cumplirla; por eso este módulo interactivo es clave en tu inducción.",
    palabrasClave: ["reglamento", "cumplimiento", "normas", "acuerdo 009"]
  },
  {
    id: "deb-3",
    numeral: 3,
    articulo: "Artículo 8, Numeral 3",
    tipo: "deber",
    categoria: "Ética y Valores",
    titulo: "Actuar con principios y valores institucionales",
    resumen: "Comportarse con respeto, solidaridad, honestidad, justicia y civismo en todo ambiente.",
    textoCompleto: "Actuar siempre teniendo como base los principios y valores institucionales.",
    explicacionModerna: "Ser aprendiz SENA es una marca de orgullo ético ante la sociedad colombiana.",
    palabrasClave: ["valores", "ética", "principios", "convivencia"]
  },
  {
    id: "deb-4",
    numeral: 4,
    articulo: "Artículo 8, Numeral 4",
    tipo: "deber",
    categoria: "Datos y Trámites",
    titulo: "Actualización permanente de datos personales",
    resumen: "Mantener al día correo, teléfono, documento y residencia en sistemas de gestión académica.",
    textoCompleto: "Registrar y mantener actualizados en el sistema de gestión académica administrativa, en el sistema de gestión virtual de aprendices, en la Agencia Pública de Empleo y demás aplicativos de la entidad, sus datos básicos y de contacto como aprendiz, garantizando la veracidad y vigencia de la información registrada. Además, actualizar de oficio o a solicitud del SENA, la información reportada en los aplicativos del SENA en los que se adelanten trámites para aprendices, de acuerdo con la normatividad vigente.",
    explicacionModerna: "Si cambias de celular o de tarjeta a cédula, debes actualizarlo de inmediato en SOFIA Plus / Zajuna / APE para que no pierdas notificaciones o contratos.",
    palabrasClave: ["datos", "actualización", "correo", "teléfono", "SOFIA Plus", "Zajuna", "APE"]
  },
  {
    id: "deb-5",
    numeral: 5,
    articulo: "Artículo 8, Numeral 5",
    tipo: "deber",
    categoria: "Asistencia y Puntualidad",
    titulo: "Asistencia y puntualidad rigurosa",
    resumen: "Llegar a tiempo y participar durante toda la jornada programada en presencial o virtual.",
    textoCompleto: "Asistir con puntualidad a todas las actividades propias del proceso de formación.",
    explicacionModerna: "La puntualidad demuestra profesionalismo tanto en el aula como en las videoconferencias del LMS.",
    palabrasClave: ["puntualidad", "asistencia", "horarios", "responsabilidad"]
  },
  {
    id: "deb-6",
    numeral: 6,
    articulo: "Artículo 8, Numeral 6",
    tipo: "deber",
    categoria: "Académico y Evidencias",
    titulo: "Cumplimiento y entrega oportuna de evidencias",
    resumen: "Presentar talleres, proyectos y evidencias dentro de los plazos del cronograma.",
    textoCompleto: "Cumplir con todas las actividades de su proceso formativo, presentando las evidencias según la planeación pedagógica, guías de aprendizaje y cronograma, en los plazos o en la oportunidad que estas deban presentarse o reportarse, a través de los medios dispuestos para ello.",
    explicacionModerna: "No dejes las tareas para el último minuto; carga tus evidencias en la fecha concertada en la plataforma LMS.",
    palabrasClave: ["evidencias", "cronograma", "guías de aprendizaje", "entregas"]
  },
  {
    id: "deb-7",
    numeral: 7,
    articulo: "Artículo 8, Numeral 7",
    tipo: "deber",
    categoria: "Asistencia y Puntualidad",
    titulo: "Justificación debida de inasistencias e incumplimientos",
    resumen: "Presentar soportes válidos (médicos o de fuerza mayor) en los plazos fijados.",
    textoCompleto: "Justificar debidamente las inasistencias o incumplimientos a las actividades de la formación, en los términos establecidos en el presente reglamento.",
    explicacionModerna: "Si no puedes asistir, avisa con anticipación (si es programada) o aporta tu certificado médico en máximo 5 días hábiles.",
    palabrasClave: ["justificación", "soportes", "incumplimiento", "plazos"]
  },
  {
    id: "deb-8",
    numeral: 8,
    articulo: "Artículo 8, Numeral 8",
    tipo: "deber",
    categoria: "Canales Institucionales",
    titulo: "Conducto regular y reporte oportuno",
    resumen: "Informar situaciones primero al instructor y luego a la coordinación académica.",
    textoCompleto: "Reportar o informar oportunamente ante el instructor como primera instancia, y en segunda instancia al coordinador académico, las situaciones que se presenten en la ejecución de la formación que afecten el desarrollo de la formación.",
    explicacionModerna: "Sigue siempre el conducto regular para resolver dudas o problemas de manera rápida y respetuosa.",
    palabrasClave: ["conducto regular", "instructor", "coordinador", "reporte"]
  },
  {
    id: "deb-9",
    numeral: 9,
    articulo: "Artículo 8, Numeral 9",
    tipo: "deber",
    categoria: "Eventos y Salidas",
    titulo: "Conducta en salidas técnicas y representación",
    resumen: "Cumplir directrices de comportamiento en salidas de campo, intercambios y pasantías.",
    textoCompleto: "Cumplir con la reglamentación y directrices que se emitan para su participación en actividades programadas por el SENA o en las que represente a la entidad, como salidas, pasantías técnicas, intercambios de aprendices a nivel nacional e internacional, así como en las demás de carácter lúdico- pedagógico.",
    explicacionModerna: "Al representar al SENA en una feria, empresa o gira técnica, llevas en alto el nombre institucional.",
    palabrasClave: ["salidas técnicas", "representación", "giras", "pasantías"]
  },
  {
    id: "deb-10",
    numeral: 10,
    articulo: "Artículo 8, Numeral 10",
    tipo: "deber",
    categoria: "Datos y Trámites",
    titulo: "Procedimiento oficial para tramitar novedades",
    resumen: "Solicitar formalmente traslados, aplazamientos, reintegros o retiros por los canales autorizados.",
    textoCompleto: "Cumplir el procedimiento establecido para gestionar las novedades (traslados, aplazamiento, retiro voluntario, reintegro, reingreso y certificación) que presente durante su proceso formativo en los términos establecidos en el presente reglamento.",
    explicacionModerna: "No abandones el programa sin avisar; radica tu solicitud formal en el sistema para no perjudicar tu historial académico.",
    palabrasClave: ["novedades", "traslado", "aplazamiento", "retiro voluntario", "reintegro"]
  },
  {
    id: "deb-11",
    numeral: 11,
    articulo: "Artículo 8, Numeral 11",
    tipo: "deber",
    categoria: "Recursos y Ambientes",
    titulo: "Uso apropiado de ambientes y patrimonio SENA",
    resumen: "Cuidar equipos, maquinaria, herramientas y software evitando daños patrimoniales.",
    textoCompleto: "Hacer uso apropiado de los ambientes de formación SENA y sus componentes (infraestructura física, equipos, maquinarias, herramientas, recursos didácticos, técnicos, tecnológicos y bibliográficos, materiales), disponibles para su proceso de aprendizaje, asumiendo responsabilidad legal en situaciones de utilización inadecuada, uso indebido, daño o pérdida, que deterioran los ambientes de aprendizaje y generan detrimento patrimonial.",
    explicacionModerna: "Las máquinas y computadores del SENA son de todos los colombianos; cuídalos y repórtalos ante cualquier falla.",
    palabrasClave: ["cuidado de equipos", "patrimonio", "ambientes de aprendizaje", "herramientas"]
  },
  {
    id: "deb-12",
    numeral: 12,
    articulo: "Artículo 8, Numeral 12",
    tipo: "deber",
    categoria: "Integridad Académica",
    titulo: "Respeto a derechos de autor y propiedad intelectual",
    resumen: "Citar debidamente materiales, autores, códigos y proyectos generados en la formación.",
    textoCompleto: "Respetar los derechos de autor y demás derechos de propiedad intelectual en los materiales, trabajos, proyectos y demás documentos entregados o generados en el proceso formativo.",
    explicacionModerna: "Cuando uses textos, imágenes, audios o código fuente, da el crédito al creador original conforme a normas APA o licencias abiertas.",
    palabrasClave: ["derechos de autor", "propiedad intelectual", "citas", "honestidad"]
  },
  {
    id: "deb-13",
    numeral: 13,
    articulo: "Artículo 8, Numeral 13",
    tipo: "deber",
    categoria: "Integridad Académica",
    titulo: "Autoría personal de evaluaciones y trabajos",
    resumen: "Hacer tus propias evidencias con creatividad y esfuerzo propio sin copiar ni plagiar.",
    textoCompleto: "Realizar personalmente las evaluaciones, investigaciones, actividades y prácticas de formación, haciendo uso de sus conocimientos, su esfuerzo personal, creatividad y autoría propia, absteniéndose de presentar como propios, escritos, documentos, ¡deas, o resultados que no sean de su autoría.",
    explicacionModerna: "Tus trabajos deben ser producto de tu propio aprendizaje, no de copias, compras de tareas o transcripciones no autorizadas.",
    palabrasClave: ["autoría propia", "esfuerzo personal", "evaluaciones", "creatividad"]
  },
  {
    id: "deb-14",
    numeral: 14,
    articulo: "Artículo 8, Numeral 14",
    tipo: "deber",
    categoria: "Recursos y Ambientes",
    titulo: "Conservación de recursos culturales y ambientales",
    resumen: "Preservar el entorno físico, natural y digital del Centro de Formación.",
    textoCompleto: "Respetar los bienes y recursos culturales, naturales, físicos, digitales, de uso público o privado (en la entidad o fuera de ella) y velar por su conservación, apoyando o colaborando en las acciones que adelante el Centro de Formación para su protección, conservación y buen uso.",
    explicacionModerna: "Apoya el reciclaje, el cuidado de jardines, el ahorro de energía y el respeto por las instalaciones.",
    palabrasClave: ["medio ambiente", "recursos culturales", "conservación", "sostenibilidad"]
  },
  {
    id: "deb-15",
    numeral: 15,
    articulo: "Artículo 8, Numeral 15",
    tipo: "deber",
    categoria: "Seguridad y Salud (SST)",
    titulo: "Uso y promoción de Elementos de Protección Personal",
    resumen: "Portar correctamente los EPP en prácticas de taller conforme a normas de SST.",
    textoCompleto: "Usar apropiadamente y promover el uso de los elementos de protección personal que correspondan a la ejecución de su formación aplicando las buenas prácticas de seguridad y salud en el trabajo definidas por la entidad y por la normatividad para cuidar de su vida, salud e integridad, prevenir riesgos y promover ambientes seguros y saludables.",
    explicacionModerna: "Cascos, gafas, guantes y botas de seguridad no son un adorno: salvan vidas y previenen accidentes graves.",
    palabrasClave: ["EPP", "seguridad y salud", "SST", "prevención", "talleres"]
  },
  {
    id: "deb-16",
    numeral: 16,
    articulo: "Artículo 8, Numeral 16",
    tipo: "deber",
    categoria: "Seguridad y Salud (SST)",
    titulo: "Cumplimiento de protocolos de bioseguridad",
    resumen: "Acatar medidas preventivas sanitarias para cuidar tu salud y la de la comunidad.",
    textoCompleto: "Cumplir con los protocolos de bioseguridad establecidos por la entidad para el ingreso a las instalaciones del SENA o ambientes de formación, con el fin de cuidar de su vida, salud e integridad, prevenir riesgos y promover ambientes seguros y saludables.",
    explicacionModerna: "Respeta las directrices sanitarias y de higiene en laboratorios, cocinas, granjas y aulas.",
    palabrasClave: ["bioseguridad", "salud pública", "higiene", "protocolos"]
  },
  {
    id: "deb-17",
    numeral: 17,
    articulo: "Artículo 8, Numeral 17",
    tipo: "deber",
    categoria: "Etapa Productiva",
    titulo: "Cumplimiento de directrices de etapa productiva",
    resumen: "Seleccionar modalidad con anticipación y entregar bitácoras y evidencias a tiempo.",
    textoCompleto: "Acatar las normativas y directrices establecidas por el SENA para llevar a cabo la etapa productiva, seleccionando con la debida anticipación la modalidad de esta y presentando la evidencia correspondiente de la etapa productiva dentro del plazo máximo establecido por el presente reglamento.",
    explicacionModerna: "Diligencia tus bitácoras quincenales y atiende las visitas de seguimiento de tu instructor de etapa productiva.",
    palabrasClave: ["bitácoras", "etapa productiva", "plazos", "seguimiento"]
  },
  {
    id: "deb-18",
    numeral: 18,
    articulo: "Artículo 8, Numeral 18",
    tipo: "deber",
    categoria: "Etapa Productiva",
    titulo: "Reporte inmediato de alternativas productivas conseguidas",
    resumen: "Avisar de inmediato al Centro si gestionaste por tu cuenta contrato u otra alternativa.",
    textoCompleto: "Si el trámite para la consecución de contrato de aprendizaje o de otra de las alternativas para el desarrollo de la etapa productiva, es realizado directamente por el aprendiz, este deberá informar inmediatamente cuando esto ocurra, a los responsables de apoyar este proceso en el Centro de Formación.",
    explicacionModerna: "Informa a la oficina de relaciones corporativas apenas una empresa te seleccione para legalizar el contrato en el aplicativo.",
    palabrasClave: ["contrato de aprendizaje", "reporte inmediato", "empresa patrocinadora"]
  },
  {
    id: "deb-19",
    numeral: 19,
    articulo: "Artículo 8, Numeral 19",
    tipo: "deber",
    categoria: "Identidad y Seguridad",
    titulo: "Identificación obligatoria al ingresar a sedes",
    resumen: "Portar el carné institucional y atender las indicaciones de portería y seguridad.",
    textoCompleto: "Atender las indicaciones de identificación de usuarios que disponga la entidad para el ingreso a las sedes del SENA y a los ambientes de formación.",
    explicacionModerna: "Muestra tu carné físico o digital en portería para garantizar la seguridad de todas las personas en el Centro.",
    palabrasClave: ["portería", "carné", "identificación", "seguridad"]
  },
  {
    id: "deb-20",
    numeral: 20,
    articulo: "Artículo 8, Numeral 20",
    tipo: "deber",
    categoria: "Indumentaria y Protección",
    titulo: "Porte de prendas de trabajo y no exclusividad de marcas",
    resumen: "Portar elementos de protección. No se exige uniforme de marca exclusiva ni se frena el acceso por razones económicas.",
    textoCompleto: "Portar el conjunto de prendas y elementos de trabajo y protección asociados al proceso formativo. Los elementos de usos distintivo que no se relacionen directamente con la seguridad para el desempeño de las competencias asociadas al programa de formación, y cuando el aprendiz no cuente con las condiciones económicas para acceder al uniforme para el uso diario, no asociado como elemento de protección o exigencia de la empresa patrocinadora, no será causal para que los directores, subdirectores, coordinadores académicos y misionales e instructores, impidan el acceso a los ambientes de formación o actividades propias del proceso formativo. En igual sentido, no se podrá exigir uniformes de una marca específica o de un proveedor definido.",
    explicacionModerna: "El uniforme de diario nunca puede convertirse en una barrera socioeconómica. Nadie te puede obligar a comprarle a un proveedor particular.",
    palabrasClave: ["uniforme", "no marca exclusiva", "acceso a la formación", "ropa de trabajo"]
  },
  {
    id: "deb-21",
    numeral: 21,
    articulo: "Artículo 8, Numeral 21",
    tipo: "deber",
    categoria: "Tecnología y Ambientes Virtuales",
    titulo: "Uso personal e intransferible de plataformas virtuales",
    resumen: "Ingresar con credenciales propias al LMS y no ceder usuarios ni contraseñas a terceros.",
    textoCompleto: "Ingresar debidamente identificado a las plataformas virtuales institucionales, con el respectivo código de acceso, personal e intransferible. El usuario y la contraseña suministrada al aprendiz por la Entidad para el acceso a las plataformas virtuales institucionales son de uso personal y exclusivo, por lo tanto, no debe transferirse a otras personas. El mal uso de esta información es de su competencia directa y asumirá por ello las responsabilidades correspondientes.",
    explicacionModerna: "Tus claves de Zajuna, SOFIA Plus y correo `@misena` son privadas. Eres legalmente responsable de lo que se haga con tu cuenta.",
    palabrasClave: ["plataformas virtuales", "contraseña", "LMS Zajuna", "seguridad digital"]
  },
  {
    id: "deb-22",
    numeral: 22,
    articulo: "Artículo 8, Numeral 22",
    tipo: "deber",
    categoria: "Salud y Seguridad",
    titulo: "Reporte de afectaciones a la salud",
    resumen: "Notificar condiciones médicas o de salud que puedan comprometer tu integridad o la de otros.",
    textoCompleto: "Informar de manera oportuna al Centro de Formación las condiciones de afectación a la salud que comprometan su integridad o la de la comunidad SENA, o interfieran en la ejecución de su proceso de formación.",
    explicacionModerna: "Si tienes una condición médica que requiera primeros auxilios o adaptación de esfuerzos físicos, infórmalo a Bienestar y a tus instructores.",
    palabrasClave: ["salud", "primeros auxilios", "condición médica", "alerta"]
  },
  {
    id: "deb-23",
    numeral: 23,
    articulo: "Artículo 8, Numeral 23",
    tipo: "deber",
    categoria: "Datos y Trámites",
    titulo: "Veracidad en documentos entregados",
    resumen: "Aportar documentación verídica y legal en matrículas, beneficios y solicitudes.",
    textoCompleto: "Hacer entrega oportuna de toda la documentación requerida en los procesos de ingreso, matrícula, formación, certificación y postulación a beneficios, incentivos y apoyos socioeconómicos según programa de formación del SENA. Esta documentación debe ser verdadera y acorde a la normatividad vigente. Es responsabilidad del aprendiz la veracidad de la información que aporta.",
    explicacionModerna: "Certificados de estudio, cartas de estrato o documentos de identidad deben ser 100% auténticos.",
    palabrasClave: ["documentos", "veracidad", "legalidad", "certificados"]
  },
  {
    id: "deb-24",
    numeral: 24,
    articulo: "Artículo 8, Numeral 24",
    tipo: "deber",
    categoria: "Bienestar e Inclusión",
    titulo: "Deberes del aprendiz con discapacidad",
    resumen: "Informar oportunamente para gestionar ajustes razonables, red de apoyo y cuidado de salud.",
    textoCompleto: "Para los aprendices con discapacidad que, como resultado de su libre elección, expresión y voluntariamente decidan auto reconocerse como persona con discapacidad para recibir atención diferencial por parte del SENA, además de los deberes enunciados deberá: a) Informar oportunamente al Centro de Formación sobre su discapacidad, para proceder a la gestión de los ajustes razonables requeridos que le posibiliten la participación, progreso y permanencia en su proceso formativo; b) Hacer partícipe a sus familiares, cuidadores o red de apoyo de los procesos de acompañamiento institucional, como apoyo a su proceso formativo siempre y cuando se requiera; c) Procurar por el cuidado de su salud y bienestar, cumpliendo con sus tratamientos médicos.",
    explicacionModerna: "Trabajar de la mano con el Centro para que se preparen los apoyos pedagógicos y técnicos que necesitas.",
    palabrasClave: ["discapacidad", "ajustes razonables", "red de apoyo", "salud"]
  }
];

export const PROHIBICIONES_LIST: NormItem[] = [
  {
    id: "pro-1",
    numeral: 1,
    articulo: "Artículo 9, Numeral 1",
    tipo: "prohibicion",
    categoria: "Integridad Documental",
    titulo: "Aportar datos o documentos falsos",
    resumen: "Presentar información que difiera de la real para ingreso, matrícula, subsidios o titulación.",
    textoCompleto: "Aportar documentos o registrar información en los sistemas de información del SENA, que difiera de la real, para el ingreso, formación, certificación o titulación; o para obtener cualquier beneficio de esta.",
    explicacionModerna: "Mentir en tu inscripción o falsificar constancias genera cancelación inmediata de matrícula y consecuencias legales.",
    palabrasClave: ["falsedad", "fraude", "documentos falsos", "información inexacta"]
  },
  {
    id: "pro-2",
    numeral: 2,
    articulo: "Artículo 9, Numeral 2",
    tipo: "prohibicion",
    categoria: "Integridad y Ética",
    titulo: "Suplantar identidad en trámites o evaluaciones",
    resumen: "Hacerse pasar por otro aprendiz o permitir que otro realice actividades o trámites por ti.",
    textoCompleto: "Suplantar identidad en cualquier trámite académico o administrativo del SENA.",
    explicacionModerna: "Pedirle a otra persona que ingrese a tu examen en línea o firme asistencias por ti es suplantación de identidad grave.",
    palabrasClave: ["suplantación", "identidad", "examen ajeno", "engaño"]
  },
  {
    id: "pro-3",
    numeral: 3,
    articulo: "Artículo 9, Numeral 3",
    tipo: "prohibicion",
    categoria: "Integridad Documental",
    titulo: "Alterar o sustraer documentos del SENA",
    resumen: "Modificar, destruir o robar actas, certificados o registros oficiales en custodia institucional.",
    textoCompleto: "Alterar, adulterar, falsificar o sustraer documentos públicos o privados emitidos por el SENA o en custodia del SENA.",
    explicacionModerna: "Manipular actas de comité, juicios de evaluación o certificados del sistema es un delito contra la fe pública.",
    palabrasClave: ["alterar", "adulterar", "sustraer", "documentos oficiales"]
  },
  {
    id: "pro-4",
    numeral: 4,
    articulo: "Artículo 9, Numeral 4",
    tipo: "prohibicion",
    categoria: "Integridad Académica",
    titulo: "Plagiar materiales o proyectos formativos",
    resumen: "Copiar evidencias, trabajos en equipo o evaluaciones presentándolas como propias.",
    textoCompleto: "Plagiar, materiales, trabajos y demás documentos generados en los grupos de trabajo o producto del trabajo en equipo institucional, así como en actividades evaluativas del proceso formativo o en concursos, juegos o competencias de cualquier carácter.",
    explicacionModerna: "Copiar y pegar textos enteros de internet o comprar tareas atenta contra el aprendizaje y es causal de sanción.",
    palabrasClave: ["plagio", "copia", "honestidad académica", "trabajos ajenos"]
  },
  {
    id: "pro-5",
    numeral: 5,
    articulo: "Artículo 9, Numeral 5",
    tipo: "prohibicion",
    categoria: "Tecnología y Ciberseguridad",
    titulo: "Uso indebido de internet y TIC institucionales",
    resumen: "Difundir material pornográfico, violento, insultos, calumnias o vulnerar la ciberseguridad.",
    textoCompleto: "Utilizar el internet y demás tecnologías de información y comunicación dispuestas por el SENA en o para el desarrollo de su proceso formativo, con la finalidad de acceder, generar, transmitir, publicar o enviar información confidencial, de circulación restringida, inadecuada, malintencionada, violenta, ilegal, peligrosa, pornográfica, insultos o agresiones por los medios de comunicación físicos o electrónicos, o cualquier actividad que pueda causar daños al nombre, honra o derechos ajenos.",
    explicacionModerna: "El internet y redes del SENA son para formarte: nada de ciberacoso, ofensas en grupos de WhatsApp o contenido inapropiado.",
    palabrasClave: ["ciberacoso", "internet", "redes institucionales", "TIC"]
  },
  {
    id: "pro-6",
    numeral: 6,
    articulo: "Artículo 9, Numeral 6",
    tipo: "prohibicion",
    categoria: "Convivencia y Sustancias",
    titulo: "Consumo, porte o venta de alcohol o psicoactivos",
    resumen: "Ingresar, comercializar o consumir bebidas embriagantes o drogas en sedes físicas o virtuales.",
    textoCompleto: "Ingerir, ingresar, comercializar, promocionar o suministrar bebidas alcohólicas o sustancias psicoactivas, dentro de las instalaciones físicas y virtuales del SENA o en los ambientes formativos SENA, o ingresar a la entidad en estado que indique alteraciones de conducta ocasionadas por el consumo de estas o bajo su efecto.",
    explicacionModerna: "Tolerancia cero a sustancias y alcohol en ambientes de aprendizaje físicos, virtuales o giras técnicas.",
    palabrasClave: ["alcohol", "sustancias psicoactivas", "drogas", "embriaguez"]
  },
  {
    id: "pro-7",
    numeral: 7,
    articulo: "Artículo 9, Numeral 7",
    tipo: "prohibicion",
    categoria: "Seguridad y Vida",
    titulo: "Porte de armas y artefactos peligrosos",
    resumen: "Ingresar armas de fuego, cortopunzantes o explosivos que pongan en riesgo a las personas.",
    textoCompleto: "Ingresar o portar cualquier tipo de armas, objetos cortopunzantes, explosivos u otros artefactos que representen riesgo o puedan ser empleados para atentar contra la vida o la integridad física de las personas. Los miembros de la fuerza pública y organismos de seguridad del Estado que se encuentren en un proceso de aprendizaje, no podrán portar armas en el Centro de Formación.",
    explicacionModerna: "Garantizar que el SENA sea un territorio de paz: prohibido portar armas de cualquier índole.",
    palabrasClave: ["armas", "objetos cortopunzantes", "peligro", "seguridad física"]
  },
  {
    id: "pro-8",
    numeral: 8,
    articulo: "Artículo 9, Numeral 8",
    tipo: "prohibicion",
    categoria: "Uso del Nombre Institucional",
    titulo: "Uso del nombre o recursos para lucro particular",
    resumen: "Hacer negocios privados o con fines de lucro personal usando la marca o ambientes del SENA.",
    textoCompleto: "Utilizar el nombre del SENA, las instalaciones físicas y virtuales, el internet y las tecnologías de información y comunicación del SENA dispuestas para el desarrollo de su proceso de formación, para actividades particulares con o sin ánimo de lucro y que no estén relacionadas con su proceso formativo.",
    explicacionModerna: "No puedes usar las aulas o la marca SENA para comercializar productos ajenos a tus proyectos pedagógicos autorizados.",
    palabrasClave: ["lucro", "negocios privados", "marca SENA", "instalaciones"]
  },
  {
    id: "pro-9",
    numeral: 9,
    articulo: "Artículo 9, Numeral 9",
    tipo: "prohibicion",
    categoria: "Legal y Disciplinario",
    titulo: "Cometer delitos contra la comunidad o la entidad",
    resumen: "Incurrir como autor, cómplice o partícipe en delitos tipificados en el Código Penal.",
    textoCompleto: "Cometer, ser cómplice o copartícipe de delitos contra la comunidad educativa o contra la Institución.",
    explicacionModerna: "Hurtos, extorsiones o lesiones personales además de sanción en el SENA acarrean denuncia ante la Fiscalía General de la Nación.",
    palabrasClave: ["delitos", "cómplice", "código penal", "legalidad"]
  },
  {
    id: "pro-10",
    numeral: 10,
    articulo: "Artículo 9, Numeral 10",
    tipo: "prohibicion",
    categoria: "Patrimonio Institucional",
    titulo: "Dañar o sustraer bienes e infraestructura",
    resumen: "Deteriorar o robar equipos, software, materiales o instalaciones en el SENA o empresas.",
    textoCompleto: "Destruir, sustraer, dañar total o parcialmente instalaciones físicas o virtuales, equipos, materiales, software, elementos y demás bienes o dotación en general del SENA o de instituciones, empresas u otras entidades donde el aprendiz represente la entidad o se desarrollen actividades de aprendizaje, culturales, recreativas, deportivas y sociales, intercambios estudiantiles nacionales o internacionales.",
    explicacionModerna: "Romper pantallas, desvalijar maquinaria o sabotear software genera responsabilidad disciplinaria y económica.",
    palabrasClave: ["daño en bien ajeno", "hurto", "sabotaje", "dotación"]
  },
  {
    id: "pro-11",
    numeral: 11,
    articulo: "Artículo 9, Numeral 11",
    tipo: "prohibicion",
    categoria: "Laicidad y Pluralismo",
    titulo: "Proselitismo político o religioso en ambientes formativos",
    resumen: "Hacer propaganda proselitista dentro de los ambientes de formación presenciales o virtuales.",
    textoCompleto: "Realizar acciones proselitistas de carácter político o religioso dentro de las instalaciones físicas y virtuales del SENA y demás ambientes donde se desarrollen actividades formativas.",
    explicacionModerna: "El SENA respeta todas las creencias personales, pero sus espacios educativos son laicos y libres de campañas políticas partidistas.",
    palabrasClave: ["proselitismo", "política", "religión", "campañas"]
  },
  {
    id: "pro-12",
    numeral: 12,
    articulo: "Artículo 9, Numeral 12",
    tipo: "prohibicion",
    categoria: "Seguridad en Instalaciones",
    titulo: "Ingreso o salida por sitios no autorizados",
    resumen: "Saltar muros, cercas, violentar cerraduras o salir por áreas distintas a portería.",
    textoCompleto: "Ingresar o salir de cualquier instalación del Centro de Formación o de la entidad donde se desarrolle la formación, por sitios diferentes a la portería, saltando muros, cercas o violentando puertas, ventanas y cerraduras.",
    explicacionModerna: "Por tu seguridad física y control institucional, siempre debes ingresar y salir por los accesos peatonales autorizados.",
    palabrasClave: ["saltar muros", "portería", "cerraduras", "acceso ilegal"]
  },
  {
    id: "pro-13",
    numeral: 13,
    articulo: "Artículo 9, Numeral 13",
    tipo: "prohibicion",
    categoria: "Convivencia y Cuidado",
    titulo: "Grafitis, pancartas de acoso o bullying",
    resumen: "Rayar mobiliario o pegar avisos que promuevan hostigamiento, bullying o mobbing.",
    textoCompleto: "Dibujar o escribir sobre cualquier objeto o mueble de las instalaciones físicas y virtuales donde se desarrollan programas de formación; o pegar avisos, carteles, pancartas o análogos en sitios no autorizados. Los lugares autorizados no podrán ser utilizados para publicar mensajes que se constituyan en hostigamiento, acoso de cualquier tipo, (bullying, mobbing) dirigido a integrantes de la comunidad educativa.",
    explicacionModerna: "Cero tolerancia al acoso escolar, burlas o mensajes difamatorios en carteleras físicas o foros virtuales.",
    palabrasClave: ["bullying", "mobbing", "rayar mesas", "carteleras no autorizadas"]
  },
  {
    id: "pro-14",
    numeral: 14,
    articulo: "Artículo 9, Numeral 14",
    tipo: "prohibicion",
    categoria: "Inclusión y Derechos Humanos",
    titulo: "Discriminación por cualquier condición humana",
    resumen: "Discriminar por sexo, etnia, orientación sexual, religión, discapacidad u opinión política.",
    textoCompleto: "Discriminar cualquier miembro de la comunidad SENA por condiciones como: sexo, nacionalidad, origen étnico, lengua, religión, identidad de género, orientación sexual, religión, situación económica, discapacidad, o preferencias políticas.",
    explicacionModerna: "El SENA es un espacio plural y seguro. La discriminación es considerada una falta grave que atenta contra los Derechos Humanos.",
    palabrasClave: ["discriminación", "género", "etnia", "LGBTIQ+", "discapacidad"]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    contexto: "Camila es una aprendiz que no cuenta con los recursos económicos para adquirir el uniforme de uso diario en una tienda específica propuesta por sus compañeros. Su instructor le manifiesta que no puede entrar al ambiente de formación teórica sin esa prenda.",
    pregunta: "¿Qué establece el Acuerdo 009 de 2024 respecto al uso de uniformes y prendas de diario?",
    opciones: [
      "El instructor tiene la potestad de impedirle el ingreso, pues el uniforme de marca es obligatorio.",
      "La carencia de recursos para el uniforme diario no es causal para impedir el acceso a la formación, ni se pueden exigir marcas o proveedores exclusivos.",
      "Camila debe ser sancionada de inmediato con condicionamiento de matrícula por no vestir el uniforme.",
      "El Centro debe expulsarla del programa por no cumplir con la indumentaria reglamentaria."
    ],
    respuestaCorrecta: 1,
    tipoNorma: "deber",
    articuloReferencia: "Artículo 8, Numeral 20",
    refuerzoPedagogico: {
      dondeEstuvoElError: "Es un error creer que el uniforme de diario puede ser una condición excluyente para estudiar en el SENA. El nuevo reglamento protege expresamente a los aprendices contra imposiciones comerciales y barreras económicas.",
      fundamentoNormativo: "El Artículo 8, numeral 20 del Acuerdo 009 de 2024 determina textualmente que la falta de condiciones económicas para adquirir el uniforme de diario 'no será causal para que los directores, subdirectores, coordinadores académicos e instructores impidan el acceso a los ambientes de formación (...) En igual sentido, no se podrá exigir uniformes de una marca específica o de un proveedor definido'.",
      claveParaTuVida: "Lo único estrictamente obligatorio por seguridad son los Elementos de Protección Personal (EPP) en prácticas de riesgo. ¡Nadie puede condicionar tu educación a marcas exclusivas!"
    },
    retroalimentacionPositiva: "¡Correcto! El SENA protege tu derecho a la educación integral y prohíbe que el uniforme de diario se convierta en una barrera económica o en monopolio de proveedores."
  },
  {
    id: "q2",
    contexto: "Carlos entregó una evidencia de aprendizaje en el LMS Zajuna hace 12 días hábiles y su instructor aún no ha registrado la calificación ni ha brindado retroalimentación pedagógica.",
    pregunta: "¿Cuál es el derecho que tiene Carlos según el nuevo Acuerdo 009 de 2024?",
    opciones: [
      "Conocer los resultados y retroalimentación de sus evaluaciones dentro de los ocho (8) días hábiles siguientes a su realización.",
      "Esperar indefinidamente, pues los instructores no tienen un límite de tiempo para registrar notas.",
      "Aceptar que la evidencia se califique automáticamente como No Aprobada si pasan más de 10 días.",
      "Solicitar la cancelación inmediata del programa formativo."
    ],
    respuestaCorrecta: 0,
    tipoNorma: "derecho",
    articuloReferencia: "Artículo 5, Numeral 15",
    refuerzoPedagogico: {
      dondeEstuvoElError: "Muchos aprendices desconocen los plazos institucionales y asumen que el tiempo de evaluación queda al libre criterio del docente. La norma establece un plazo preciso para dar certeza al proceso formativo.",
      fundamentoNormativo: "El Artículo 5, numeral 15 consagra el derecho fundamental de: 'conocer los resultados de las evaluaciones dentro de los ocho (8) días hábiles siguientes a su realización'. Adicionalmente, si existe inconformidad, tienes 2 días hábiles para solicitar revisión formal (Art. 38).",
      claveParaTuVida: "Puedes consultar con respeto y amabilidad a tu instructor el estado de tu calificación citando el término reglamentario de 8 días hábiles."
    },
    retroalimentacionPositiva: "¡Excelente comprensión! El plazo máximo reglamentario para recibir tus resultados evaluativos es de ocho (8) días hábiles."
  },
  {
    id: "q3",
    contexto: "Julián tuvo una urgencia médica y estuvo incapacitado durante 3 días. Desea radicar los documentos correspondientes para justificar su inasistencia.",
    pregunta: "¿Cuál es el término y procedimiento establecido para justificar inasistencias no programadas (fuerza mayor o caso fortuito)?",
    opciones: [
      "Debe avisar dentro del mismo día antes de las 6:00 a.m. o de lo contrario no se recibe.",
      "Debe reportar e informar con los debidos soportes a más tardar dentro de los cinco (5) días hábiles siguientes a su ocurrencia.",
      "Tiene un plazo de dos meses para entregar las fotocopias de su incapacidad.",
      "Las inasistencias por salud no requieren justificación alguna en el SENA."
    ],
    respuestaCorrecta: 1,
    tipoNorma: "procedimiento",
    articuloReferencia: "Artículo 28, Parágrafo 3",
    refuerzoPedagogico: {
      dondeEstuvoElError: "La confusión habitual radica en pensar que solo se puede justificar el mismo día o confundirlo con los plazos de otros reglamentos anteriores. El Acuerdo 009 de 2024 amplió el margen a 5 días hábiles con soporte.",
      fundamentoNormativo: "El Artículo 28, Parágrafo 3 señala con claridad: 'Las inasistencias no programadas deberán ser informadas por el aprendiz al instructor, a más tardar dentro de los cinco (5) días hábiles siguientes a su ocurrencia con los debidos soportes que lo demuestren'.",
      claveParaTuVida: "Solicita siempre tu incapacidad oficial de la EPS o médico competente y remítela por los canales oficiales a tu instructor dentro de los 5 días hábiles para tener derecho a actividades supletorias."
    },
    retroalimentacionPositiva: "¡Muy bien! Cuentas con hasta cinco (5) días hábiles posteriores a la emergencia para allegar tus soportes médicos válidos."
  },
  {
    id: "q4",
    contexto: "Por fallas temporales de internet en su hogar, Daniel le facilita su usuario y contraseña de LMS Zajuna a un compañero para que ingrese a resolver una prueba de conocimientos por él.",
    pregunta: "¿Qué valoración normativa recibe esta acción según el Reglamento del Aprendiz?",
    opciones: [
      "Es una acción colaborativa permitida siempre que haya solidaridad entre compañeros.",
      "Es un incumplimiento al deber de custodia personal de contraseñas y constituye la prohibición grave de suplantación de identidad.",
      "Solo se considera falta si el examen corresponde a la etapa productiva.",
      "Es un derecho respaldado por la autonomía del aprendiz en el Artículo 3."
    ],
    respuestaCorrecta: 1,
    tipoNorma: "prohibicion",
    articuloReferencia: "Artículo 8 (numeral 21) y Artículo 9 (numeral 2)",
    refuerzoPedagogico: {
      dondeEstuvoElError: "Prestar credenciales institucionales o pedir a otro que haga actividades evaluativas no es 'solidaridad', sino una vulneración a la seguridad informática y suplantación de identidad.",
      fundamentoNormativo: "El Artículo 8 numeral 21 advierte que las contraseñas son 'de uso personal y exclusivo, por lo tanto, no debe transferirse a otras personas'. Por su parte, el Artículo 9 numeral 2 prohíbe expresamente 'Suplantar identidad en cualquier trámite académico o administrativo del SENA'.",
      claveParaTuVida: "Si tienes problemas técnicos, comunícalo a tu instructor antes del cierre de la actividad o acude a los ambientes con conectividad de tu Centro de Formación."
    },
    retroalimentacionPositiva: "¡Exacto! Las credenciales institucionales son intransferibles y la suplantación de identidad es una falta de máxima gravedad en el SENA."
  },
  {
    id: "q5",
    contexto: "Un aprendiz de formación presencial deja de asistir a su Centro durante tres (3) días continuos sin comunicarse con sus instructores ni justificar su ausencia con soportes.",
    pregunta: "¿Qué situación reglamentaria se configura de acuerdo con el Artículo 30 del Acuerdo 009 de 2024?",
    opciones: [
      "Se configura automáticamente como Deserción del proceso de formación, calificada como falta grave con recomendación de cancelación de matrícula.",
      "Se considera una pausa académica voluntaria que puede durar hasta un año sin novedades.",
      "El aprendiz recibe un permiso especial automático para reingresar cuando desee.",
      "Solo se configura deserción si las inasistencias superan los 45 días continuos."
    ],
    respuestaCorrecta: 0,
    tipoNorma: "procedimiento",
    articuloReferencia: "Artículo 30, Numeral 1, Literal a",
    refuerzoPedagogico: {
      dondeEstuvoElError: "Muchos aprendices subestiman el control de asistencia presencial. No asistir 3 días continuos sin justificar activa inmediatamente el protocolo legal de deserción institucional.",
      fundamentoNormativo: "El Artículo 30 numeral 1 literal a) especifica que en formación presencial la deserción ocurre al 'tener tres (3) días continuos de inasistencia injustificada o acumular cinco (5) días no continuos de inasistencia injustificada durante todo el proceso de formación'. En caso de confirmarse, se califica como falta grave y da lugar a cancelación de matrícula.",
      claveParaTuVida: "Nunca dejes de reportar tus ausencias. Si tienes dificultades que te impidan asistir, gestiona un aplazamiento justificado antes de perder tu cupo."
    },
    retroalimentacionPositiva: "¡Impecable! 3 días continuos o 5 no continuos de inasistencia injustificada en presencial configuran deserción reglamentaria."
  },
  {
    id: "q6",
    contexto: "Valeria toma fragmentos extensos de varios informes de internet y el trabajo de otro grupo, los pega en su evidencia y los presenta como resultado de su autoría sin citar fuentes.",
    pregunta: "¿Qué precepto normativo infringe Valeria según el Artículo 9 numeral 4?",
    opciones: [
      "Incurre en la Prohibición de Plagio y transgrede el deber de autoría personal y respeto a la propiedad intelectual.",
      "No infringe ninguna norma, puesto que la información en internet es de libre apropiación sin créditos.",
      "Solo se considera infracción si los autores originales tienen patente en Colombia.",
      "Está ejerciendo su derecho a la libre expresión garantizado en el Artículo 5."
    ],
    respuestaCorrecta: 0,
    tipoNorma: "prohibicion",
    articuloReferencia: "Artículo 9 (numeral 4) y Artículo 8 (numeral 12 y 13)",
    refuerzoPedagogico: {
      dondeEstuvoElError: "Creer que tomar textos ajenos sin citar es una práctica aceptable o 'investigación normal' es el origen del plagio. El plagio descalifica el proceso formativo del aprendiz.",
      fundamentoNormativo: "El Artículo 9 numeral 4 prohíbe taxativamente: 'Plagiar materiales, trabajos y demás documentos generados en los grupos de trabajo (...) así como en actividades evaluativas'. Los numerales 12 y 13 del Artículo 8 exigen expresamente autoría propia y respeto a los derechos de autor.",
      claveParaTuVida: "Siempre puedes inspirarte en lecturas e investigaciones, pero cita adecuadamente las fuentes y pon en tus propias palabras tus conclusiones y reflexiones."
    },
    retroalimentacionPositiva: "¡Excelente! La honestidad académica y la autoría propia son pilares inviolables en la formación profesional del SENA."
  },
  {
    id: "q7",
    contexto: "David es un aprendiz que presenta una condición de discapacidad visual. Al iniciar su proceso de formación, solicita al Centro adaptaciones de software lector de pantalla y material accesible.",
    pregunta: "¿Qué respaldo contempla el Artículo 5 numeral 8 para David?",
    opciones: [
      "Es un Derecho fundamental a ser reconocido como persona con discapacidad y solicitar los ajustes razonables necesarios para su progreso y permanencia.",
      "El SENA no está obligado a realizar adaptaciones técnicas para aprendices con discapacidad.",
      "David debe asumir personalmente todos los costos de infraestructura o retirarse voluntariamente.",
      "Las solicitudes de inclusión solo pueden tramitarse una vez finalizada la etapa lectiva."
    ],
    respuestaCorrecta: 0,
    tipoNorma: "derecho",
    articuloReferencia: "Artículo 5, Numeral 8",
    refuerzoPedagogico: {
      dondeEstuvoElError: "Asumir que las personas con discapacidad deben acomodarse solas a las condiciones preexistentes contradice la política nacional de inclusión y la Convención de Derechos Humanos.",
      fundamentoNormativo: "El Artículo 5 numeral 8 consagra el derecho a: 'Solicitar los ajustes razonables requeridos y pertinentes en su proceso de formación, que posibiliten su participación, progreso, permanencia y certificación en la formación; de acuerdo con la normatividad vigente'. Además, cuentan con un vocero diferencial en cada Centro (Art. 7).",
      claveParaTuVida: "El SENA promueve ambientes inclusivos donde la diversidad se atiende con dignidad y ajustes razonables efectivos."
    },
    retroalimentacionPositiva: "¡Muy acertado! Los ajustes razonables son un derecho irrenunciable que garantiza la equidad en el aprendizaje para todos los aprendices."
  },
  {
    id: "q8",
    contexto: "Un instructor sospecha de un comportamiento indebido de un aprendiz y decide expulsarlo verbalmente en el acto, prohibiéndole la entrada al Centro sin citación ni Comité.",
    pregunta: "¿Por qué esta actuación desconoce las normas del Acuerdo 009 de 2024?",
    opciones: [
      "Porque los instructores tienen la potestad de expulsar aprendices de forma inmediata sin trámites.",
      "Porque vulnera el derecho fundamental al Debido Proceso, a la presunción de inocencia y a la sesión de descargos ante el Comité de Evaluación y Seguimiento.",
      "Porque únicamente el representante de los aprendices puede decidir expulsiones directas.",
      "Porque las sanciones disciplinarias solo se pueden imponer a aprendices de modalidad virtual."
    ],
    respuestaCorrecta: 1,
    tipoNorma: "derecho",
    articuloReferencia: "Artículo 5 (numeral 10), Artículos 39, 50 y 51",
    refuerzoPedagogico: {
      dondeEstuvoElError: "Pensar que un docente o coordinador puede 'expulsar' de palabra a un aprendiz desconoce que toda medida disciplinaria requiere un trámite administrativo reglado con garantías constitucionales.",
      fundamentoNormativo: "Los Artículos 5 (num. 10), 39, 50 y 51 consagran que todo aprendiz goza de presunción de inocencia, citación motivada con mínimo 3 días hábiles, sesión de descargos y pruebas ante el Comité de Evaluación y acto administrativo formal de Subdirección con derecho a recursos de reposición y apelación.",
      claveParaTuVida: "Ninguna sanción es válida si no respeta el debido proceso. Tienes derecho a ser escuchado, a presentar tus pruebas y a controvertir las acusaciones."
    },
    retroalimentacionPositiva: "¡Gran claridad jurídica! El Debido Proceso es una garantía constitucional y reglamentaria insoslayable en toda la comunidad SENA."
  },
  {
    id: "q9",
    contexto: "Durante una actividad recreativa en el Centro de Formación, un aprendiz ingresa con una bebida alcohólica disimulada en su termo y la consume con amigos.",
    pregunta: "¿Cómo califica esta conducta el Artículo 9 numeral 6 del Reglamento?",
    opciones: [
      "Está permitido si la jornada es deportiva o cultural fuera de horas de clase.",
      "Es una Prohibición estricta que veta ingerir, ingresar, comercializar o estar bajo efecto de alcohol o psicoactivos en ambientes físicos o virtuales del SENA.",
      "Es un derecho recreativo que solo se sanciona si el aprendiz causa daños materiales.",
      "Se considera una falta leve que no requiere seguimiento pedagógico."
    ],
    respuestaCorrecta: 1,
    tipoNorma: "prohibicion",
    articuloReferencia: "Artículo 9, Numeral 6",
    refuerzoPedagogico: {
      dondeEstuvoElError: "Creer que por tratarse de un evento lúdico, deportivo o viernes de cierre se flexibilizan las normas sobre bebidas alcohólicas es un grave error de convivencia.",
      fundamentoNormativo: "El Artículo 9 numeral 6 prohíbe categóricamente: 'Ingerir, ingresar, comercializar, promocionar o suministrar bebidas alcohólicas o sustancias psicoactivas, dentro de las instalaciones físicas y virtuales del SENA o en los ambientes formativos SENA, o ingresar a la entidad en estado que indique alteraciones de conducta ocasionadas por el consumo de estas'.",
      claveParaTuVida: "Los ambientes del SENA son 100% libres de alcohol y sustancias en todo momento para proteger la vida, el respeto y la integridad de la comunidad."
    },
    retroalimentacionPositiva: "¡Correcto! Las instalaciones físicas y entornos virtuales del SENA son espacios totalmente libres de alcohol y sustancias psicoactivas."
  },
  {
    id: "q10",
    contexto: "Un aprendiz no superó los logros de una competencia y se le suscribe un Plan de Mejoramiento Académico como medida pedagógica formativa.",
    pregunta: "¿Cuál es el plazo máximo reglamentario para la ejecución del Plan de Mejoramiento Académico según el Artículo 46?",
    opciones: [
      "Hasta veinte (20) días calendario contados a partir de su suscripción, sin superar la fecha final de la fase del proyecto.",
      "Puede durar hasta doce (12) meses prorrogables a solicitud del aprendiz.",
      "Debe presentarse en un término improrrogable de 24 horas continuas.",
      "No existe ningún plazo; el aprendiz decide cuándo entregarlo según su ritmo."
    ],
    respuestaCorrecta: 0,
    tipoNorma: "procedimiento",
    articuloReferencia: "Artículo 46, Numeral 1, Literal b",
    refuerzoPedagogico: {
      dondeEstuvoElError: "No tener presente el límite temporal del plan de mejoramiento puede llevar a que se venza el periodo de la fase sin haber demostrado las competencias requeridas.",
      fundamentoNormativo: "El Artículo 46 numeral 1 literal b) estipula que el plan de mejoramiento 'Debe ejecutarse en el tiempo que indique el instructor o el equipo ejecutor, sin que supere el término de veinte (20) días calendario, contados a partir de la fecha de suscripción del plan de mejoramiento y sin que supere la fecha final de la fase del proyecto'.",
      claveParaTuVida: "El plan de mejoramiento es una gran oportunidad de refuerzo pedagógico: acuerda las evidencias con tu instructor y preséntalas dentro de los 20 días asignados."
    },
    retroalimentacionPositiva: "¡Excelente conocimiento reglamentario! El plan de mejoramiento académico tiene un límite máximo de veinte (20) días calendario para su ejecución."
  }
];

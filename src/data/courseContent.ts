export interface SectionItem {
  id: string;
  summary: string;
  detail: string;
}

export interface CourseSection {
  heading: string;
  body?: string;
  items?: SectionItem[];
}

export interface CourseModuleData {
  title: string;
  subtitle?: string;
  sections: CourseSection[];
}

export const courseContent: Record<string, CourseModuleData> = {
  "Bienvenida SENA": {
    title: "Bienvenida y Principios SENA",
    subtitle: "Marco institucional, propósito y principios orientadores según el Acuerdo 009 de 2024",
    sections: [
      {
        heading: "Nuestro Propósito Institucional (Art. 2)",
        body: "El Servicio Nacional de Aprendizaje (SENA) tiene la misión encomendada por el Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para la incorporación de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.",
      },
      {
        heading: "Principios Orientadores (Art. 3)",
        body: "El Reglamento del Aprendiz se fundamenta en principios orientadores irrenunciables que guían toda la labor educativa: Autonomía, Dignidad, Inclusión, Enfoque diferencial, Enfoque territorial, Participación, Desarrollo sostenible y Solidaridad social.",
      },
      {
        heading: "Comunidad Educativa (Art. 4)",
        body: "Está conformada por aprendices, instructores, personal administrativo, directivos, egresados y el sector productivo, quienes de manera armónica participan en la construcción del proyecto formativo institucional.",
      },
    ],
  },
  "Conoce tu institución": {
    title: "Conoce tu institución: Estructura y Cobertura Nacional",
    subtitle: "El SENA cuenta con 33 Regionales distribuidas en los 32 departamentos de Colombia y el Distrito Capital, con más de 118 Centros de Formación",
    sections: [
      {
        heading: "Presencia en Todo el Territorio Nacional",
        body: "El Servicio Nacional de Aprendizaje (SENA) es la institución educativa pública con mayor despliegue territorial de Colombia. Para garantizar el acceso universal a la Formación Profesional Integral, el SENA se organiza operativamente en 33 Regionales (una por cada uno de los 32 departamentos del país y una exclusiva para el Distrito Capital de Bogotá).\n\nCada Regional cuenta con autonomía operativa para articular programas formativos adaptados a las vocaciones productivas de su entorno (agropecuaria, industrial, minero-energética, marítima, turística o de tecnologías de la información).",
      },
      {
        heading: "¿Qué son los Centros de Formación Profesional Integral?",
        body: "Los Centros de Formación son las unidades fundamentales donde se ejecuta la formación presencial, virtual y a distancia. En total existen más de 118 Centros de Formación dotados con talleres, laboratorios de biotecnología, simuladores, granjas experimentales y ambientes de aprendizaje con tecnología de punta.\n\nInteractúa con el croquis interactivo de Colombia a continuación: selecciona cualquier departamento para apreciar el resplandor de su contorno y consultar la lista detallada de sus centros de formación.",
      },
    ],
  },
  "Derechos y Deberes": {
    title: "Derechos, Deberes y Prohibiciones del Aprendiz",
    subtitle: "Módulo interactivo oficial: Explora los 24 derechos, 24 deberes y 14 prohibiciones (Acuerdo 009 de 2024), realiza la prueba de conocimientos con efectos visuales y refuerzo pedagógico oportuno",
    sections: [
      {
        heading: "Derechos del Aprendiz (Art. 5)",
        body: "El SENA garantiza a todos sus aprendices matriculados el ejercicio pleno de sus derechos civiles y académicos. Haz clic en cada uno para ver el detalle normativo:",
        items: [
          {
            id: "der-1",
            summary: "1. Inducción integral y oportuna",
            detail: "Recibir una inducción que le permita conocer el reglamento del aprendiz, el plan nacional integral de bienestar, la organización institucional y los requisitos indispensables para culminar su proceso formativo con éxito.",
          },
          {
            id: "der-2",
            summary: "2. Formación profesional integral de calidad",
            detail: "Acceder a formación de calidad, consecuente con el programa formativo mediante la disposición oportuna de instructores capacitados, recursos físicos, técnicos y tecnológicos suficientes según los procedimientos institucionales.",
          },
          {
            id: "der-3",
            summary: "3. Acreditación institucional como aprendiz",
            detail: "Ser acreditado formalmente con el carné de aprendiz del SENA ante dependencias internas y entidades externas cuando sea requerido durante su vigencia académica.",
          },
          {
            id: "der-4",
            summary: "4. Acceso a infraestructura y recursos didácticos",
            detail: "Tener a disposición la infraestructura, ambientes de formación, bibliotecas físicas y digitales, herramientas tecnológicas y recursos didácticos necesarios para el desarrollo de competencias.",
          },
          {
            id: "der-5",
            summary: "5. Elementos de protección personal (EPP)",
            detail: "Recibir oportunamente del Centro de Formación los elementos de protección personal y bioseguridad requeridos para talleres y prácticas, salvaguardando la integridad física.",
          },
          {
            id: "der-6",
            summary: "6. Beneficios del Plan de Bienestar al Aprendiz",
            detail: "Disfrutar de los programas de apoyo de sostenimiento, monitorías, servicios de salud, deporte, arte, recreación y acompañamiento psicosocial orientados a promover la permanencia y certificación.",
          },
          {
            id: "der-7",
            summary: "7. Orientación humanista, ocupacional y actitudinal",
            detail: "Recibir orientación humanista, ocupacional y actitudinal que estimule el crecimiento ético, la autogestión y el fortalecimiento del perfil ocupacional para el mundo laboral.",
          },
          {
            id: "der-8",
            summary: "8. Enfoque diferencial e inclusión de grupos prioritarios",
            detail: "Reconocerse y ser reconocido con enfoque diferencial en caso de presentar discapacidad o pertenecer a grupos de especial protección constitucional o víctimas del conflicto.",
          },
          {
            id: "der-9",
            summary: "9. Garantía al Debido Proceso",
            detail: "Gozar de la observancia del debido proceso, presunción de inocencia, derecho a la defensa, notificación oportuna y contradicción en todas las etapas formativas y disciplinarias.",
          },
          {
            id: "der-10",
            summary: "10. Notificación oportuna de novedades académicas y recursos",
            detail: "Ser notificado formalmente de las calificaciones, novedades y decisiones administrativas o disciplinarias, contando con los plazos de ley para solicitar aclaraciones o interponer recursos.",
          },
        ],
      },
      {
        heading: "Deberes del Aprendiz (Art. 8)",
        body: "El aprendiz asume la responsabilidad de ser protagonista de su formación. Haz clic en cada deber para ver el detalle normativo:",
        items: [
          {
            id: "deb-1",
            summary: "1. Suscripción del Acta de Compromiso",
            detail: "Suscribir al momento de asentar la matrícula el acta de compromiso como aprendiz SENA, obligándose a cumplir con todas las directrices formativas.",
          },
          {
            id: "deb-2",
            summary: "2. Conocimiento y cumplimiento normativo",
            detail: "Conocer, respetar y acatar el reglamento del aprendiz, manuales de convivencia y demás directrices institucionales asociadas a la formación.",
          },
          {
            id: "deb-3",
            summary: "3. Actuar con principios y valores éticos",
            detail: "Actuar permanentemente fundamentado en los valores de respeto, honestidad, solidaridad, responsabilidad y convivencia pacífica.",
          },
          {
            id: "deb-4",
            summary: "4. Actualización permanente de datos personales",
            detail: "Registrar y mantener actualizados sus datos básicos de contacto, residencia y seguridad social en el sistema de gestión académica (SOFIA Plus / Zajuna).",
          },
          {
            id: "deb-5",
            summary: "5. Asistencia puntual y continua a la formación",
            detail: "Asistir con estricta puntualidad a todas las sesiones presenciales, virtuales o mixtas programadas, permaneciendo durante toda la jornada formativa.",
          },
          {
            id: "deb-6",
            summary: "6. Presentación oportuna de evidencias de aprendizaje",
            detail: "Cumplir con la elaboración y entrega de evidencias de aprendizaje según las fechas estipuladas en el cronograma pedagógico concertado con el instructor.",
          },
          {
            id: "deb-7",
            summary: "7. Justificación debida de inasistencias",
            detail: "Justificar debidamente las inasistencias o incumplimientos ante el instructor o coordinación en un plazo máximo de tres (3) días hábiles posteriores a la ausencia.",
          },
          {
            id: "deb-8",
            summary: "8. Cuidado y custodia de bienes institucionales",
            detail: "Hacer uso adecuado y responsable de los ambientes, materiales, máquinas, equipos e infraestructura del SENA, respondiendo por deterioros causados por mal uso.",
          },
        ],
      },
      {
        heading: "Prohibiciones del Aprendiz (Art. 9)",
        body: "Comportamientos que vulneran el orden académico o la convivencia en la comunidad SENA. Haz clic en cada una para ver el detalle:",
        items: [
          {
            id: "pro-1",
            summary: "1. Aportar información o documentos falsos",
            detail: "Aportar documentación adulterada, falsa o registrar información inexacta en los sistemas institucionales para acceder a matrícula, cupos o beneficios.",
          },
          {
            id: "pro-2",
            summary: "2. Suplantación de identidad en trámites o evidencias",
            detail: "Suplantar o permitir ser suplantado en evaluaciones, firmas, asistencias presenciales, virtuales o trámites ante el SENA.",
          },
          {
            id: "pro-3",
            summary: "3. Plagio total o parcial de materiales",
            detail: "Plagiar, copiar o reproducir obras, investigaciones, códigos o evidencias ajenas presentándolas como propias sin citar la respectiva fuente o autoría.",
          },
          {
            id: "pro-4",
            summary: "4. Consumo, porte o venta de alcohol o psicoactivos",
            detail: "Ingresar, comercializar, suministrar, portar o consumir bebidas alcohólicas o sustancias psicoactivas dentro de las instalaciones físicas o virtuales del SENA.",
          },
          {
            id: "pro-5",
            summary: "5. Porte de armas o elementos peligrosos",
            detail: "Ingresar o portar armas de fuego, armas blancas, objetos cortopunzantes, sustancias explosivas o cualquier artefacto que represente riesgo a la integridad física.",
          },
          {
            id: "pro-6",
            summary: "6. Uso indebido de redes y recursos tecnológicos",
            detail: "Utilizar las redes, plataformas y correos institucionales para difundir contenidos violentos, pornografía, realizar ciberacoso o sabotear sistemas.",
          },
          {
            id: "pro-7",
            summary: "7. Agresiones verbales, físicas o discriminatorias",
            detail: "Propinar agresiones físicas, verbales, psicológicas o realizar actos de intimidación, acoso sexual o discriminación hacia cualquier miembro de la comunidad educativa.",
          },
        ],
      },
    ],
  },
  "Acuerdo 009: Proceso Formativo": {
    title: "El Proceso Formativo",
    subtitle: "Etapas lectiva y productiva, evaluación cualitativa y novedades de formación",
    sections: [
      {
        heading: "Etapas del Proceso Formativo",
        body: "La Formación Profesional Integral comprende dos etapas obligatorias y complementarias:\n1. Etapa Lectiva: Desarrollo teórico-práctico de competencias en ambientes de aprendizaje físicos o virtuales.\n2. Etapa Productiva: Aplicación y consolidación de competencias en escenarios reales del mundo laboral mediante contrato de aprendizaje, vínculo laboral, proyecto productivo, pasantía o monitoría.",
      },
      {
        heading: "Evaluación del Aprendizaje (Art. 32-37)",
        body: "La evaluación es un proceso continuo, participativo y formativo. Los juicios evaluativos emitidos son cualitativos: 'APROBADO' (cuando alcanza los logros esperados) o 'NO APROBADO' (cuando aún no los alcanza). En caso de no aprobación, se concerta un Plan de Mejoramiento formativo.",
      },
      {
        heading: "Novedades Académicas",
        body: "El aprendiz puede gestionar ante el Centro de Formación las siguientes novedades:\n• Traslado: Cambio de jornada, sede o Centro de Formación.\n• Aplazamiento: Suspensión temporal justificada de la matrícula hasta por seis (6) meses prorrogables.\n• Reingreso: Solicitud formal de reactivación tras un aplazamiento.\n• Retiro Voluntario: Solicitud expresa del aprendiz para no continuar en el programa.",
      },
    ],
  },
  "Proceso de Certificación": {
    title: "Proceso de Certificación",
    subtitle: "Requisitos indispensables para titularse y régimen formativo/sancionatorio",
    sections: [
      {
        heading: "Requisitos de Certificación (Art. 19)",
        body: "Para obtener el título o certificado correspondiente, el aprendiz debe cumplir la totalidad de los siguientes requisitos:\n1. Haber aprobado el 100% de los resultados de aprendizaje de la etapa lectiva.\n2. Haber culminado y aprobado a satisfacción la etapa productiva con su respectivo paz y salvo.\n3. Estar debidamente registrado y con hoja de vida actualizada en la Agencia Pública de Empleo (APE) del SENA.\n4. Encontrarse a paz y salvo académico, administrativo, financiero y de bienestar institucional.",
      },
      {
        heading: "Régimen Sancionatorio y Medidas Formativas",
        body: "Cuando se presenten incumplimientos a deberes o prohibiciones, se aplican medidas formativas:\n• Llamado de atención verbal o escrito.\n• Plan de mejoramiento pedagógico o disciplinario.\n\nEn faltas graves o gravísimas con debido proceso en Comité de Evaluación:\n• Condicionamiento de matrícula.\n• Cancelación definitiva de matrícula con sanción de inhabilidad para ingresar al SENA por el término establecido.",
      },
    ],
  },
  "Evaluación Final": {
    title: "Evaluación Final (Examen)",
    subtitle: "Evaluación de validación de conocimientos sobre el Acuerdo 009 de 2024 y la estructura territorial SENA",
    sections: [
      {
        heading: "Instrucciones de la Evaluación Final",
        body: "Esta prueba consta de 25 preguntas (15 de selección múltiple con única respuesta y 10 de verdadero/falso) fundamentadas en casos prácticos del reglamento, derechos, deberes y la estructura de las 33 regionales del SENA. Para aprobar y obtener la constancia de inducción, debes alcanzar una calificación mínima del 90% (23 aciertos).",
      },
    ],
  },
};

export const modulesOrder = [
  'Bienvenida SENA',
  'Conoce tu institución',
  'Derechos y Deberes',
  'Acuerdo 009: Proceso Formativo',
  'Proceso de Certificación',
  'Evaluación Final',
];

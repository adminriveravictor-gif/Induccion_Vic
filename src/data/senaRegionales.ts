export interface CentroFormacion {
  nombre: string;
  municipio?: string;
  enfoque?: string;
}

export interface RegionalSENA {
  id: string;
  nombre: string;
  departamento: string;
  capital: string;
  centros: CentroFormacion[];
  descripcion: string;
  svgPathId: string;
}

// 33 Regionales oficiales del SENA
export const REGIONALES_SENA: readonly string[] = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Distrito Capital",
  "Guainía",
  "Guajira",
  "Guaviare",
  "Huila",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada",
] as const;

// Directorio oficial de Centros de Formación por Regional (118 centros)
export const CENTROS_POR_REGIONAL: Record<string, string[]> = {
  "Amazonas": [
    "Centro para la Biodiversidad y el Turismo del Amazonas"
  ],
  "Antioquia": [
    "Centro de los Recursos Naturales Renovables - La Salada",
    "Centro de Formación Minero Ambiental",
    "Centro del Diseño y Manufactura del Cuero",
    "Centro de Formación en Diseño, Confección y Moda",
    "Centro para el Desarrollo del Hábitat y la Construcción",
    "Centro de Tecnología de la Manufactura Avanzada",
    "Centro Tecnológico del Mobiliario",
    "Centro Textil y de Gestión Industrial",
    "Centro de Comercio",
    "Centro de Servicios de Salud",
    "Centro de Servicios y Gestión Empresarial",
    "Complejo Tecnológico para la Gestión Agroempresarial",
    "Complejo Tecnológico Minero Agroempresarial",
    "Centro de la Innovación, la Agroindustria y la Aviación",
    "Complejo Tecnológico Agroindustrial, Pecuario y Turístico",
    "Complejo Tecnológico, Turístico y Agroindustrial del Occidente Antioqueño"
  ],
  "Arauca": [
    "Centro de Gestión y Desarrollo Agroindustrial de Arauca"
  ],
  "Atlántico": [
    "Centro para el Desarrollo Agroecológico y Agroindustrial",
    "Centro Nacional Colombo Alemán",
    "Centro Industrial y de Aviación",
    "Centro de Comercio y Servicios"
  ],
  "Bolívar": [
    "Centro Agroempresarial y Minero",
    "Centro Internacional Náutico, Fluvial y Portuario",
    "Centro para la Industria Petroquímica",
    "Centro de Comercio y Servicios"
  ],
  "Boyacá": [
    "Centro de Desarrollo Agropecuario y Agroindustrial",
    "Centro Minero",
    "Centro de Gestión Administrativa y Fortalecimiento Empresarial",
    "Centro Industrial de Mantenimiento y Manufactura",
    "Centro de la Innovación Agroindustrial y de Servicios"
  ],
  "Caldas": [
    "Centro para la Formación Cafetera",
    "Centro de Automatización Industrial",
    "Centro de Procesos Industriales y Construcción",
    "Centro de Comercio y Servicios",
    "Centro Pecuario y Agroempresarial"
  ],
  "Caquetá": [
    "Centro Tecnológico de la Amazonia"
  ],
  "Casanare": [
    "Centro Agroindustrial y Fortalecimiento Empresarial de Casanare"
  ],
  "Cauca": [
    "Centro Agropecuario",
    "Centro de Teleinformática y Producción Industrial",
    "Centro de Comercio y Servicios"
  ],
  "Cesar": [
    "Centro Biotecnológico del Caribe",
    "Centro Agroempresarial",
    "Centro de Innovación y de Gestión Empresarial y Cultural"
  ],
  "Chocó": [
    "Centro de Recursos Naturales, Industria y Biodiversidad"
  ],
  "Córdoba": [
    "Centro Agropecuario y de Biotecnología El Porvenir",
    "Centro de Comercio, Industria y Turismo de Córdoba"
  ],
  "Cundinamarca": [
    "Centro Industrial y de Desarrollo Empresarial de Soacha",
    "Centro de Desarrollo Agroindustrial y Empresarial",
    "Centro Agroecológico y Empresarial",
    "Centro de la Tecnología del Diseño y la Productividad Empresarial",
    "Centro de Biotecnología Agropecuaria",
    "Centro de Desarrollo Agroempresarial"
  ],
  "Distrito Capital": [
    "Centro de Tecnologías para la Construcción y la Madera",
    "Centro de Electricidad, Electrónica y Telecomunicaciones",
    "Centro de Gestión Industrial",
    "Centro de Manufactura en Textiles y Cuero",
    "Centro de Tecnologías del Transporte",
    "Centro Metalmecánico",
    "Centro de Materiales y Ensayos",
    "Centro de Diseño y Metrología",
    "Centro para la Industria de la Comunicación Gráfica",
    "Centro de Gestión de Mercados, Logística y Tecnologías de la Información",
    "Centro de Formación de Talento Humano en Salud",
    "Centro de Gestión Administrativa",
    "Centro de Servicios Financieros",
    "Centro Nacional de Hotelería, Turismo y Alimentos",
    "Centro de Formación en Actividad Física y Cultura"
  ],
  "Guainía": [
    "Centro Ambiental y Ecoturístico del Nororiente Amazónico"
  ],
  "Guajira": [
    "Centro Industrial y de Energías Alternativas",
    "Centro Agroempresarial y Acuícola"
  ],
  "Guaviare": [
    "Centro de Desarrollo Agroindustrial, Turístico y Tecnológico del Guaviare"
  ],
  "Huila": [
    "Centro de Formación Agroindustrial",
    "Centro Agroempresarial y Desarrollo Pecuario del Huila",
    "Centro de Desarrollo Agroempresarial y Turístico del Huila",
    "Centro de la Industria, la Empresa y los Servicios",
    "Centro de Gestión y Desarrollo Sostenible Surcolombiano"
  ],
  "Magdalena": [
    "Centro Acuícola y Agroindustrial de Gaira",
    "Centro de Logística y Promoción Ecoturística del Magdalena"
  ],
  "Meta": [
    "Centro Agroindustrial del Meta",
    "Centro de Industria y Servicios del Meta"
  ],
  "Nariño": [
    "Centro Sur Colombiano de Logística Internacional",
    "Centro Agroindustrial y Pesquero de la Costa Pacífica",
    "Centro Internacional de Producción Limpia - Lope"
  ],
  "Norte de Santander": [
    "Centro de Formación para el Desarrollo Rural y Minero",
    "Centro de la Industria, la Empresa y los Servicios"
  ],
  "Putumayo": [
    "Centro Agroforestal y Acuícola Arapaima"
  ],
  "Quindío": [
    "Centro Agroindustrial",
    "Centro para el Desarrollo Tecnológico de la Construcción y la Industria",
    "Centro de Comercio y Turismo"
  ],
  "Risaralda": [
    "Centro Atención Sector Agropecuario",
    "Centro de Diseño e Innovación Tecnológica Industrial",
    "Centro de Comercio y Servicios"
  ],
  "San Andrés": [
    "Centro de Formación Turística, Gente de Mar y de Servicios"
  ],
  "Santander": [
    "Centro Atención Sector Agropecuario",
    "Centro Industrial de Mantenimiento Integral",
    "Centro Industrial del Diseño y la Manufactura",
    "Centro de Servicios Empresariales y Turísticos",
    "Centro Industrial y del Desarrollo Tecnológico",
    "Centro Agroturístico",
    "Centro Agroempresarial y Turístico de los Andes",
    "Centro de Gestión Agroempresarial del Oriente"
  ],
  "Sucre": [
    "Centro de la Innovación, la Tecnología y los Servicios"
  ],
  "Tolima": [
    "Centro Agropecuario La Granja",
    "Centro de Industria y Construcción",
    "Centro de Comercio y Servicios"
  ],
  "Valle del Cauca": [
    "Centro Agropecuario de Buga",
    "Centro Latinoamericano de Especies Menores",
    "Centro Náutico Pesquero de Buenaventura",
    "Centro de Electricidad y Automatización Industrial - CEAI",
    "Centro de la Construcción",
    "Centro de Diseño Tecnológico Industrial",
    "Centro Nacional de Asistencia Técnica a la Industria - ASTIN",
    "Centro de Gestión Tecnológica de Servicios",
    "Centro de Tecnologías Agroindustriales",
    "Centro de Biotecnología Industrial"
  ],
  "Vaupés": [
    "Centro Agropecuario y de Servicios Ambientales “Jiri-Jirimo”"
  ],
  "Vichada": [
    "Centro de Producción y Transformación Agroindustrial de la Orinoquia"
  ]
};

/**
 * Obtiene la lista oficial de centros de formación de una regional.
 * Admite tanto el nombre exacto de la regional (ej: "Caldas") como variantes (ej: "Regional Caldas").
 */
export function getCentrosPorRegional(regional: string): string[] {
  if (!regional) return [];
  const trimmed = regional.trim();
  if (CENTROS_POR_REGIONAL[trimmed]) {
    return CENTROS_POR_REGIONAL[trimmed];
  }
  const clean = trimmed
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/^regional\s+/, '')
    .replace(/^d\.?c\.?$/, 'distrito capital')
    .trim();

  for (const [key, centros] of Object.entries(CENTROS_POR_REGIONAL)) {
    const normKey = key
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .trim();
    if (normKey === clean || normKey.includes(clean) || clean.includes(normKey)) {
      return centros;
    }
  }

  // Alias comunes
  if (clean.includes('guajira')) return CENTROS_POR_REGIONAL['Guajira'] || [];
  if (clean.includes('andres')) return CENTROS_POR_REGIONAL['San Andrés'] || [];
  if (clean.includes('bogota') || clean.includes('distrito')) return CENTROS_POR_REGIONAL['Distrito Capital'] || [];

  return [];
}

export const senaRegionales: RegionalSENA[] = [
  {
    id: "amazonas",
    nombre: "Regional Amazonas",
    departamento: "Amazonas",
    capital: "Leticia",
    svgPathId: "CO-AMA",
    descripcion: "Fomenta la conservación de la biodiversidad, el ecoturismo sostenible y el desarrollo comunitario en la cuenca amazónica.",
    centros: [
      { nombre: "Centro para la Biodiversidad y el Turismo del Amazonas", municipio: "Leticia", enfoque: "Biodiversidad, ecoturismo, recursos ambientales y logística" },
    ]
  },
  {
    id: "antioquia",
    nombre: "Regional Antioquia",
    departamento: "Antioquia",
    capital: "Medellín",
    svgPathId: "CO-ANT",
    descripcion: "Polo de innovación industrial, textil, moda, tecnología avanzada, servicios empresariales y agroindustria.",
    centros: [
      { nombre: "Centro de los Recursos Naturales Renovables - La Salada", municipio: "Caldas", enfoque: "Agropecuario y ambiental" },
      { nombre: "Centro de Formación Minero Ambiental", municipio: "Itagüí", enfoque: "Moda y confección" },
      { nombre: "Centro del Diseño y Manufactura del Cuero", municipio: "Itagüí", enfoque: "Calzado y marroquinería" },
      { nombre: "Centro de Formación en Diseño, Confección y Moda", municipio: "Itagüí", enfoque: "Moda y confección" },
      { nombre: "Centro para el Desarrollo del Hábitat y la Construcción", municipio: "Medellín", enfoque: "Construcción, obras civiles y arquitectura" },
      { nombre: "Centro de Tecnología de la Manufactura Avanzada", municipio: "Medellín", enfoque: "Mecatrónica, automatización y manufactura" },
      { nombre: "Centro Tecnológico del Mobiliario", municipio: "Itagüí", enfoque: "Madera, diseño y mobiliario" },
      { nombre: "Centro Textil y de Gestión Industrial", municipio: "Medellín", enfoque: "Textil y procesos industriales" },
      { nombre: "Centro de Comercio", municipio: "Medellín", enfoque: "Comercio, ventas y mercadeo" },
      { nombre: "Centro de Servicios de Salud", municipio: "Medellín", enfoque: "Salud, enfermería y bioseguridad" },
      { nombre: "Centro de Servicios y Gestión Empresarial", municipio: "Medellín", enfoque: "Gestión, administración y finanzas" },
      { nombre: "Complejo Tecnológico para la Gestión Agroempresarial", municipio: "Medellín", enfoque: "Formación integral profesional, desarrollo tecnológico y competencias laborales" },
      { nombre: "Complejo Tecnológico Minero Agroempresarial", municipio: "Puerto Berrío", enfoque: "Minería y agroempresa Magdalena Medio" },
      { nombre: "Centro de la Innovación, la Agroindustria y la Aviación", municipio: "Rionegro", enfoque: "Aeronáutica, innovación y agroindustria" },
      { nombre: "Complejo Tecnológico Agroindustrial, Pecuario y Turístico", municipio: "Apartadó", enfoque: "Urabá agroindustrial y portuario" },
      { nombre: "Complejo Tecnológico, Turístico y Agroindustrial del Occidente Antioqueño", municipio: "Medellín", enfoque: "Formación integral profesional, desarrollo tecnológico y competencias laborales" },
    ]
  },
  {
    id: "arauca",
    nombre: "Regional Arauca",
    departamento: "Arauca",
    capital: "Arauca",
    svgPathId: "CO-ARA",
    descripcion: "Impulsa la agroindustria, la ganadería sostenible, el sector petrolero y el fortalecimiento productivo llanero.",
    centros: [
      { nombre: "Centro de Gestión y Desarrollo Agroindustrial de Arauca", municipio: "Arauca", enfoque: "Agroindustria, ganadería, administración y servicios" },
    ]
  },
  {
    id: "atlantico",
    nombre: "Regional Atlántico",
    departamento: "Atlántico",
    capital: "Barranquilla",
    svgPathId: "CO-ATL",
    descripcion: "Eje caribeño de desarrollo logístico, portuario, aeronáutico, comercio exterior y tecnología industrial.",
    centros: [
      { nombre: "Centro para el Desarrollo Agroecológico y Agroindustrial", municipio: "Medellín", enfoque: "Construcción, obras civiles y arquitectura" },
      { nombre: "Centro Nacional Colombo Alemán", municipio: "Bogotá D.C.", enfoque: "Cocina, barismo, panadería, hotelería y turismo" },
      { nombre: "Centro Industrial y de Aviación", municipio: "Barranquilla", enfoque: "Aeronáutica, metalmecánica y refrigeración" },
      { nombre: "Centro de Comercio y Servicios", municipio: "Ibagué", enfoque: "Comercio, salud, turismo y administración" },
    ]
  },
  {
    id: "bolivar",
    nombre: "Regional Bolívar",
    departamento: "Bolívar",
    capital: "Cartagena de Indias",
    svgPathId: "CO-BOL",
    descripcion: "Epicentro nacional en industria petroquímica, marítima, portuaria, turismo patrimonial y minería.",
    centros: [
      { nombre: "Centro Agroempresarial y Minero", municipio: "Cartagena (Ternera)", enfoque: "Minería, agroindustria y desarrollo comunitario" },
      { nombre: "Centro Internacional Náutico, Fluvial y Portuario", municipio: "Pasto", enfoque: "Agroecología, lácteos, biotecnología y mecánica" },
      { nombre: "Centro para la Industria Petroquímica", municipio: "Cartagena", enfoque: "Petroquímica, plásticos, instrumentación y procesos químicos" },
      { nombre: "Centro de Comercio y Servicios", municipio: "Ibagué", enfoque: "Comercio, salud, turismo y administración" },
    ]
  },
  {
    id: "boyaca",
    nombre: "Regional Boyacá",
    departamento: "Boyacá",
    capital: "Tunja",
    svgPathId: "CO-BOY",
    descripcion: "Desarrollo minero-energético, agropecuario de clima frío, manufactura industrial y gestión empresarial.",
    centros: [
      { nombre: "Centro de Desarrollo Agropecuario y Agroindustrial", municipio: "Sincelejo", enfoque: "Ganadería de sabana, yuca industrial, piscicultura y alimentos" },
      { nombre: "Centro Minero", municipio: "Sogamoso (Morcá)", enfoque: "Minería bajo tierra, seguridad minera y geología" },
      { nombre: "Centro de Gestión Administrativa y Fortalecimiento Empresarial", municipio: "Arauca", enfoque: "Agroindustria, ganadería, administración y servicios" },
      { nombre: "Centro Industrial de Mantenimiento y Manufactura", municipio: "Barranquilla", enfoque: "Aeronáutica, metalmecánica y refrigeración" },
      { nombre: "Centro de la Innovación Agroindustrial y de Servicios", municipio: "Rionegro", enfoque: "Aeronáutica, innovación y agroindustria" },
    ]
  },
  {
    id: "caldas",
    nombre: "Regional Caldas",
    departamento: "Caldas",
    capital: "Manizales",
    svgPathId: "CO-CAL",
    descripcion: "Cuna de la caficultura tecnificada, biotecnología, automatización industrial y mecatrónica avanzada.",
    centros: [
      { nombre: "Centro para la Formación Cafetera", municipio: "Manizales", enfoque: "Cadena del café, barismo, catación y agroindustria" },
      { nombre: "Centro de Automatización Industrial", municipio: "Manizales", enfoque: "Automatización, mecatrónica y teleinformática" },
      { nombre: "Centro de Procesos Industriales y Construcción", municipio: "Manizales", enfoque: "Química, biotecnología, maderas y construcción" },
      { nombre: "Centro de Comercio y Servicios", municipio: "Ibagué", enfoque: "Comercio, salud, turismo y administración" },
      { nombre: "Centro Pecuario y Agroempresarial", municipio: "La Dorada", enfoque: "Pecuario, pesca, ganadería y logística Magdalena Caldense" },
    ]
  },
  {
    id: "caqueta",
    nombre: "Regional Caquetá",
    departamento: "Caquetá",
    capital: "Florencia",
    svgPathId: "CO-CAQ",
    descripcion: "Puerta de oro de la Amazonía colombiana, especializada en sistemas agroecológicos sostenibles y bioeconomía.",
    centros: [
      { nombre: "Centro Tecnológico de la Amazonia", municipio: "Florencia", enfoque: "Agroforestería, ganadería regenerativa, piscicultura y TIC" },
    ]
  },
  {
    id: "casanare",
    nombre: "Regional Casanare",
    departamento: "Casanare",
    capital: "Yopal",
    svgPathId: "CO-CAS",
    descripcion: "Impulsa la soberanía alimentaria, la cadena arrocera, ganadera, palma de aceite y energías.",
    centros: [
      { nombre: "Centro Agroindustrial y Fortalecimiento Empresarial de Casanare", municipio: "Yopal", enfoque: "Agroindustria, maquinaria pesada, hidrocarburos y gestión" },
    ]
  },
  {
    id: "cauca",
    nombre: "Regional Cauca",
    departamento: "Cauca",
    capital: "Popayán",
    svgPathId: "CO-CAU",
    descripcion: "Fortalece la multiculturalidad indígena y afrodescendiente, teleinformática, café especial y agricultura orgánica.",
    centros: [
      { nombre: "Centro Agropecuario", municipio: "Popayán", enfoque: "Caficultura, agroecología, pecuaria y transformación rural" },
      { nombre: "Centro de Teleinformática y Producción Industrial", municipio: "Popayán", enfoque: "Software, telecomunicaciones, confección y mecatrónica" },
      { nombre: "Centro de Comercio y Servicios", municipio: "Ibagué", enfoque: "Comercio, salud, turismo y administración" },
    ]
  },
  {
    id: "cesar",
    nombre: "Regional Cesar",
    departamento: "Cesar",
    capital: "Valledupar",
    svgPathId: "CO-CES",
    descripcion: "Especializado en operaciones mineras a gran escala, transición energética y biotecnología agropecuaria.",
    centros: [
      { nombre: "Centro Biotecnológico del Caribe", municipio: "Valledupar", enfoque: "Biotecnología, ganadería, agroindustria y energías renovables" },
      { nombre: "Centro Agroempresarial", municipio: "Cartagena (Ternera)", enfoque: "Minería, agroindustria y desarrollo comunitario" },
      { nombre: "Centro de Innovación y de Gestión Empresarial y Cultural", municipio: "Valledupar", enfoque: "Formación integral profesional, desarrollo tecnológico y competencias laborales" },
    ]
  },
  {
    id: "choco",
    nombre: "Regional Chocó",
    departamento: "Chocó",
    capital: "Quibdó",
    svgPathId: "CO-CHO",
    descripcion: "Focalizado en la riqueza biológica del Chocó biogeográfico, etnoeducación, pesca y aprovechamiento forestal responsable.",
    centros: [
      { nombre: "Centro de Recursos Naturales, Industria y Biodiversidad", municipio: "Quibdó", enfoque: "Biodiversidad, minería artesanal sostenible, agroindustria y pesca" },
    ]
  },
  {
    id: "cordoba",
    nombre: "Regional Córdoba",
    departamento: "Córdoba",
    capital: "Montería",
    svgPathId: "CO-COR",
    descripcion: "Capital ganadera y agrícola del Caribe, destacada en biotecnología animal, turismo del Sinú y agroindustria.",
    centros: [
      { nombre: "Centro Agropecuario y de Biotecnología El Porvenir", municipio: "Montería", enfoque: "Reproducción animal, biotecnología, acuicultura y agricultura" },
      { nombre: "Centro de Comercio, Industria y Turismo de Córdoba", municipio: "Montería", enfoque: "Servicios, turismo, comercio e industria textil" },
    ]
  },
  {
    id: "cundinamarca",
    nombre: "Regional Cundinamarca",
    departamento: "Cundinamarca",
    capital: "Bogotá (cobertura departamental)",
    svgPathId: "CO-CUN",
    descripcion: "Articula provincias agroindustriales, floricultura, turismo de naturaleza y centros industriales estratégicos.",
    centros: [
      { nombre: "Centro Industrial y de Desarrollo Empresarial de Soacha", municipio: "Soacha", enfoque: "Manufactura, logística y desarrollo empresarial" },
      { nombre: "Centro de Desarrollo Agroindustrial y Empresarial", municipio: "Villeta", enfoque: "Caña panelera, turismo gualiva y agroindustria" },
      { nombre: "Centro Agroecológico y Empresarial", municipio: "Fusagasugá", enfoque: "Agroecología, turismo del Sumapaz y gestión ambiental" },
      { nombre: "Centro de la Tecnología del Diseño y la Productividad Empresarial", municipio: "Girardot", enfoque: "Turismo, diseño y confección Alto Magdalena" },
      { nombre: "Centro de Biotecnología Agropecuaria", municipio: "Mosquera", enfoque: "Biotecnología vegetal, floricultura e innovación agropecuaria" },
      { nombre: "Centro de Desarrollo Agroempresarial", municipio: "Chía", enfoque: "Agroempresa, servicios y tecnologías Sabana Centro" },
    ]
  },
  {
    id: "distrito_capital",
    nombre: "Regional Distrito Capital",
    departamento: "Bogotá D.C.",
    capital: "Bogotá D.C.",
    svgPathId: "CO-DC",
    descripcion: "Mayor concentración técnica del país con 15 centros de formación especializados en todas las áreas de la economía del conocimiento.",
    centros: [
      { nombre: "Centro de Tecnologías para la Construcción y la Madera", municipio: "Bogotá D.C.", enfoque: "Edificaciones, carpintería, topografía y obras civiles" },
      { nombre: "Centro de Electricidad, Electrónica y Telecomunicaciones", municipio: "Bogotá D.C.", enfoque: "Redes, telecomunicaciones, energía solar y electrónica" },
      { nombre: "Centro de Gestión Industrial", municipio: "Arauca", enfoque: "Agroindustria, ganadería, administración y servicios" },
      { nombre: "Centro de Manufactura en Textiles y Cuero", municipio: "Bogotá D.C.", enfoque: "Confección, patronaje, calzado y marroquinería" },
      { nombre: "Centro de Tecnologías del Transporte", municipio: "Bogotá D.C.", enfoque: "Mecánica automotriz, diésel, vehículos híbridos y eléctricos" },
      { nombre: "Centro Metalmecánico", municipio: "Bogotá D.C.", enfoque: "Mecánica industrial, soldadura, CNC y metrología" },
      { nombre: "Centro de Materiales y Ensayos", municipio: "Bogotá D.C.", enfoque: "Ensayos no destructivos, polímeros y metalurgia" },
      { nombre: "Centro de Diseño y Metrología", municipio: "Bogotá D.C.", enfoque: "Diseño industrial, metrología legal e industrial" },
      { nombre: "Centro para la Industria de la Comunicación Gráfica", municipio: "Leticia", enfoque: "Biodiversidad, ecoturismo, recursos ambientales y logística" },
      { nombre: "Centro de Gestión de Mercados, Logística y Tecnologías de la Información", municipio: "Arauca", enfoque: "Agroindustria, ganadería, administración y servicios" },
      { nombre: "Centro de Formación de Talento Humano en Salud", municipio: "Bogotá D.C.", enfoque: "Enfermería, farmacia, radiología y salud pública" },
      { nombre: "Centro de Gestión Administrativa", municipio: "Bogotá D.C.", enfoque: "Gestión documental, recursos humanos y secretariado" },
      { nombre: "Centro de Servicios Financieros", municipio: "Bogotá D.C.", enfoque: "Banca, finanzas, seguros y contabilidad" },
      { nombre: "Centro Nacional de Hotelería, Turismo y Alimentos", municipio: "Bogotá D.C.", enfoque: "Cocina, barismo, panadería, hotelería y turismo" },
      { nombre: "Centro de Formación en Actividad Física y Cultura", municipio: "Bogotá D.C.", enfoque: "Entrenamiento deportivo, recreación, danza y música" },
    ]
  },
  {
    id: "guainia",
    nombre: "Regional Guainía",
    departamento: "Guainía",
    capital: "Inírida",
    svgPathId: "CO-GUA",
    descripcion: "Centro emblemático en la estrella fluvial de Inírida con formación ambiental, etnoturismo y producción indígena.",
    centros: [
      { nombre: "Centro Ambiental y Ecoturístico del Nororiente Amazónico", municipio: "Inírida", enfoque: "Ecoturismo, manejo ambiental, piscicultura y recursos humanos" },
    ]
  },
  {
    id: "guaviare",
    nombre: "Regional Guaviare",
    departamento: "Guaviare",
    capital: "San José del Guaviare",
    svgPathId: "CO-GUV",
    descripcion: "Transición entre los llanos y la selva amazónica, impulsor del turismo de pictogramas y conservación forestal.",
    centros: [
      { nombre: "Centro de Desarrollo Agroindustrial, Turístico y Tecnológico del Guaviare", municipio: "San José del Guaviare", enfoque: "Turismo de naturaleza, agroecología, sistemas y gestión" },
    ]
  },
  {
    id: "huila",
    nombre: "Regional Huila",
    departamento: "Huila",
    capital: "Neiva",
    svgPathId: "CO-HUI",
    descripcion: "Primer productor de cafés especiales y piscicultura continental de exportación en Colombia.",
    centros: [
      { nombre: "Centro de Formación Agroindustrial", municipio: "Itagüí", enfoque: "Moda y confección" },
      { nombre: "Centro Agroempresarial y Desarrollo Pecuario del Huila", municipio: "Cartagena (Ternera)", enfoque: "Minería, agroindustria y desarrollo comunitario" },
      { nombre: "Centro de Desarrollo Agroempresarial y Turístico del Huila", municipio: "La Plata", enfoque: "Agroturismo del occidente huilense y producción limpia" },
      { nombre: "Centro de la Industria, la Empresa y los Servicios", municipio: "Rionegro", enfoque: "Aeronáutica, innovación y agroindustria" },
      { nombre: "Centro de Gestión y Desarrollo Sostenible Surcolombiano", municipio: "Pitalito", enfoque: "Cafés especiales de origen, agropecuaria y medio ambiente" },
    ]
  },
  {
    id: "la_guajira",
    nombre: "Regional La Guajira",
    departamento: "La Guajira",
    capital: "Riohacha",
    svgPathId: "CO-LAG",
    descripcion: "Líder en energías no convencionales (eólica y solar), minería responsable, turismo ancestral y artesanía Wayúu.",
    centros: [
      { nombre: "Centro Industrial y de Energías Alternativas", municipio: "Riohacha", enfoque: "Energía solar, eólica, minería, construcción y refrigeración" },
      { nombre: "Centro Agroempresarial y Acuícola", municipio: "Fonseca", enfoque: "Agropecuaria del sur de La Guajira, acuicultura y caprinos" },
    ]
  },
  {
    id: "magdalena",
    nombre: "Regional Magdalena",
    departamento: "Magdalena",
    capital: "Santa Marta",
    svgPathId: "CO-MAG",
    descripcion: "Fomenta la logística marítima, la cadena bananera y de palma, ecoturismo de la Sierra Nevada y gastronomía caribe.",
    centros: [
      { nombre: "Centro Acuícola y Agroindustrial de Gaira", municipio: "Santa Marta (Gaira)", enfoque: "Acuicultura marina, palma de aceite y banano" },
      { nombre: "Centro de Logística y Promoción Ecoturística del Magdalena", municipio: "Santa Marta", enfoque: "Logística portuaria, turismo, cocina y comercio" },
    ]
  },
  {
    id: "meta",
    nombre: "Regional Meta",
    departamento: "Meta",
    capital: "Villavicencio",
    svgPathId: "CO-MET",
    descripcion: "Gran despensa agrícola y energética del oriente con amplia formación en agropecuaria tropical y petróleo.",
    centros: [
      { nombre: "Centro Agroindustrial del Meta", municipio: "Yopal", enfoque: "Agroindustria, maquinaria pesada, hidrocarburos y gestión" },
      { nombre: "Centro de Industria y Servicios del Meta", municipio: "Villavicencio", enfoque: "Mecánica, hidrocarburos, salud, TIC y administración" },
    ]
  },
  {
    id: "narino",
    nombre: "Regional Nariño",
    departamento: "Nariño",
    capital: "Pasto",
    svgPathId: "CO-NAR",
    descripcion: "Puerta fronteriza del sur andino y pacífico, con vocación en producción agropecuaria limpia, lácteos y comercio exterior.",
    centros: [
      { nombre: "Centro Sur Colombiano de Logística Internacional", municipio: "Ipiales", enfoque: "Comercio transfronterizo, aduanas y logística" },
      { nombre: "Centro Agroindustrial y Pesquero de la Costa Pacífica", municipio: "Tumaco", enfoque: "Pesca marítima, palma, cacao y economía del mar" },
      { nombre: "Centro Internacional de Producción Limpia - Lope", municipio: "Pasto", enfoque: "Agroecología, lácteos, biotecnología y mecánica" },
    ]
  },
  {
    id: "norte_de_santander",
    nombre: "Regional Norte de Santander",
    departamento: "Norte de Santander",
    capital: "San José de Cúcuta",
    svgPathId: "CO-NSA",
    descripcion: "Articulador binacional en manufactura de calzado, confección, minería de carbón y arcillas cerámicas.",
    centros: [
      { nombre: "Centro de Formación para el Desarrollo Rural y Minero", municipio: "Itagüí", enfoque: "Moda y confección" },
      { nombre: "Centro de la Industria, la Empresa y los Servicios", municipio: "Rionegro", enfoque: "Aeronáutica, innovación y agroindustria" },
    ]
  },
  {
    id: "putumayo",
    nombre: "Regional Putumayo",
    departamento: "Putumayo",
    capital: "Mocoa",
    svgPathId: "CO-PUT",
    descripcion: "Enfoque en agroforestería sostenible, pimienta, cacao, piscicultura amazónica y recursos hídricos.",
    centros: [
      { nombre: "Centro Agroforestal y Acuícola Arapaima", municipio: "Mocoa / Puerto Asís", enfoque: "Agroforestería, piscicultura, especies amazónicas y gestión ambiental" },
    ]
  },
  {
    id: "quindio",
    nombre: "Regional Quindío",
    departamento: "Quindío",
    capital: "Armenia",
    svgPathId: "CO-QUI",
    descripcion: "Corazón del Paisaje Cultural Cafetero, pionero en turismo rural, agroindustria de cafés de alta gama y construcción liviana.",
    centros: [
      { nombre: "Centro Agroindustrial", municipio: "Armenia", enfoque: "Transformación de alimentos, café, plátano y cítricos" },
      { nombre: "Centro para el Desarrollo Tecnológico de la Construcción y la Industria", municipio: "Armenia", enfoque: "Construcción sismo-resistente, guadua, madera y metalmecánica" },
      { nombre: "Centro de Comercio y Turismo", municipio: "Armenia", enfoque: "Turismo experiencial, gastronomía, hotelería y comercio" },
    ]
  },
  {
    id: "risaralda",
    nombre: "Regional Risaralda",
    departamento: "Risaralda",
    capital: "Pereira",
    svgPathId: "CO-RIS",
    descripcion: "Nodo logístico del eje cafetero con alta especialización en confección, TIC, metalmecánica y biotecnología.",
    centros: [
      { nombre: "Centro Atención Sector Agropecuario", municipio: "Pereira", enfoque: "Formación integral profesional, desarrollo tecnológico y competencias laborales" },
      { nombre: "Centro de Diseño e Innovación Tecnológica Industrial", municipio: "Bogotá D.C.", enfoque: "Diseño industrial, metrología legal e industrial" },
      { nombre: "Centro de Comercio y Servicios", municipio: "Ibagué", enfoque: "Comercio, salud, turismo y administración" },
    ]
  },
  {
    id: "san_andres",
    nombre: "Regional San Andrés y Providencia",
    departamento: "Archipiélago de San Andrés, Providencia y Santa Catalina",
    capital: "San Andrés",
    svgPathId: "CO-SAP",
    descripcion: "Especializado en la economía azul, deportes náuticos, hotelería bilingüe y sostenibilidad insular.",
    centros: [
      { nombre: "Centro de Formación Turística, Gente de Mar y de Servicios", municipio: "San Andrés Islas", enfoque: "Náutica, marinería, buceo, hotelería bilingüe creole-inglés-español" },
    ]
  },
  {
    id: "santander",
    nombre: "Regional Santander",
    departamento: "Santander",
    capital: "Bucaramanga",
    svgPathId: "CO-SAN",
    descripcion: "Epicentro de la petroquímica en Barrancabermeja, calzado, turismo de aventura en San Gil y agroempresa andina.",
    centros: [
      { nombre: "Centro Atención Sector Agropecuario", municipio: "Bucaramanga", enfoque: "Formación integral profesional, desarrollo tecnológico y competencias laborales" },
      { nombre: "Centro Industrial de Mantenimiento Integral", municipio: "Barranquilla", enfoque: "Aeronáutica, metalmecánica y refrigeración" },
      { nombre: "Centro Industrial del Diseño y la Manufactura", municipio: "Barranquilla", enfoque: "Aeronáutica, metalmecánica y refrigeración" },
      { nombre: "Centro de Servicios Empresariales y Turísticos", municipio: "Medellín", enfoque: "Gestión, administración y finanzas" },
      { nombre: "Centro Industrial y del Desarrollo Tecnológico", municipio: "Barranquilla", enfoque: "Aeronáutica, metalmecánica y refrigeración" },
      { nombre: "Centro Agroturístico", municipio: "San Gil", enfoque: "Deportes de aventura, ecoturismo, hotelería y agropecuaria" },
      { nombre: "Centro Agroempresarial y Turístico de los Andes", municipio: "Cartagena (Ternera)", enfoque: "Minería, agroindustria y desarrollo comunitario" },
      { nombre: "Centro de Gestión Agroempresarial del Oriente", municipio: "Arauca", enfoque: "Agroindustria, ganadería, administración y servicios" },
    ]
  },
  {
    id: "sucre",
    nombre: "Regional Sucre",
    departamento: "Sucre",
    capital: "Sincelejo",
    svgPathId: "CO-SUC",
    descripcion: "Impulsa la agropecuaria de las sabanas, la piscicultura en la Mojana y las artesanías de caña flecha.",
    centros: [
      { nombre: "Centro de la Innovación, la Tecnología y los Servicios", municipio: "Sincelejo", enfoque: "Tecnología, servicios, artesanías típicas y comercio" },
    ]
  },
  {
    id: "tolima",
    nombre: "Regional Tolima",
    departamento: "Tolima",
    capital: "Ibagué",
    svgPathId: "CO-TOL",
    descripcion: "Cuna musical y arrocera, destacada en confección, construcción, café de cordillera y acuicultura.",
    centros: [
      { nombre: "Centro Agropecuario La Granja", municipio: "Espinal", enfoque: "Arroz, mango, piscicultura, maquinaria agrícola y veterinaria" },
      { nombre: "Centro de Industria y Construcción", municipio: "Villavicencio", enfoque: "Mecánica, hidrocarburos, salud, TIC y administración" },
      { nombre: "Centro de Comercio y Servicios", municipio: "Ibagué", enfoque: "Comercio, salud, turismo y administración" },
    ]
  },
  {
    id: "valle_del_cauca",
    nombre: "Regional Valle del Cauca",
    departamento: "Valle del Cauca",
    capital: "Cali",
    svgPathId: "CO-VAC",
    descripcion: "Complejo logístico de Buenaventura, caña azucarera, bioenergía, alta tecnología industrial y biotecnología.",
    centros: [
      { nombre: "Centro Agropecuario de Buga", municipio: "Buga", enfoque: "Agroecología, frutales, cacao y porcicultura" },
      { nombre: "Centro Latinoamericano de Especies Menores", municipio: "Tuluá", enfoque: "Avicultura, apicultura, cunicultura y lácteos" },
      { nombre: "Centro Náutico Pesquero de Buenaventura", municipio: "Buenaventura", enfoque: "Portuario, marítimo, pesca industrial, motores marinos y logística" },
      { nombre: "Centro de Electricidad y Automatización Industrial - CEAI", municipio: "Cali", enfoque: "Electricidad de potencia, electrónica industrial y refrigeración" },
      { nombre: "Centro de la Construcción", municipio: "Cali", enfoque: "Topografía, obras civiles, acabados y arquitectura" },
      { nombre: "Centro de Diseño Tecnológico Industrial", municipio: "Bogotá D.C.", enfoque: "Diseño industrial, metrología legal e industrial" },
      { nombre: "Centro Nacional de Asistencia Técnica a la Industria - ASTIN", municipio: "Cali", enfoque: "Plásticos, polímeros, ensayos de laboratorio e innovación de materiales" },
      { nombre: "Centro de Gestión Tecnológica de Servicios", municipio: "Arauca", enfoque: "Agroindustria, ganadería, administración y servicios" },
      { nombre: "Centro de Tecnologías Agroindustriales", municipio: "Cartago", enfoque: "Cafés de cordillera, bordados tradicionales y agroindustria norte del Valle" },
      { nombre: "Centro de Biotecnología Industrial", municipio: "Mosquera", enfoque: "Biotecnología vegetal, floricultura e innovación agropecuaria" },
    ]
  },
  {
    id: "vaupes",
    nombre: "Regional Vaupés",
    departamento: "Vaupés",
    capital: "Mitú",
    svgPathId: "CO-VAU",
    descripcion: "Comprometido con las comunidades multiétnicas del río Vaupés, conservación de selva pluvial y saberes ancestrales.",
    centros: [
      { nombre: "Centro Agropecuario y de Servicios Ambientales “Jiri-Jirimo”", municipio: "Popayán", enfoque: "Caficultura, agroecología, pecuaria y transformación rural" },
    ]
  },
  {
    id: "vichada",
    nombre: "Regional Vichada",
    departamento: "Vichada",
    capital: "Puerto Carreño",
    svgPathId: "CO-VID",
    descripcion: "Frontera oriental llanera, enfocado en energías fotovoltaicas, ganadería extensiva sostenible y cuencas del Orinoco.",
    centros: [
      { nombre: "Centro de Producción y Transformación Agroindustrial de la Orinoquia", municipio: "Puerto Carreño", enfoque: "Formación integral profesional, desarrollo tecnológico y competencias laborales" },
    ]
  },
];

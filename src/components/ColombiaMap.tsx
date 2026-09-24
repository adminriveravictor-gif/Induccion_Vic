import { useState, useMemo, useRef } from 'react';
import { senaRegionales, RegionalSENA } from '../data/senaRegionales';
import {
  COLOMBIA_DEPARTMENTS_GEO,
  COLOMBIA_OUTER_BORDER,
  SAN_ANDRES_GEO,
  COLOMBIA_VIEWBOX,
  DepartmentGeo,
} from '../data/colombiaMapGeo';
import {
  MapPin,
  Building2,
  Search,
  ExternalLink,
  Sparkles,
  Compass,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Tag,
  Info,
} from 'lucide-react';

type MapStyle = 'classic' | 'natural_regions' | 'sena';

const REGION_COLORS: Record<string, { fill: string; darkFill: string; border: string }> = {
  Caribe: {
    fill: '#fef3c7', // amber-100
    darkFill: '#78350f44',
    border: '#d97706',
  },
  Andina: {
    fill: '#dcfce7', // emerald-100
    darkFill: '#064e3b44',
    border: '#059669',
  },
  Pacífica: {
    fill: '#e0e7ff', // indigo-100
    darkFill: '#312e8144',
    border: '#4f46e5',
  },
  Orinoquía: {
    fill: '#ffedd5', // orange-100
    darkFill: '#7c2d1244',
    border: '#ea580c',
  },
  Amazonía: {
    fill: '#ccfbf1', // teal-100
    darkFill: '#134e4a44',
    border: '#0d9488',
  },
  Insular: {
    fill: '#e0f2fe', // sky-100
    darkFill: '#0c4a6e44',
    border: '#0284c7',
  },
};

export default function ColombiaMap() {
  const [selectedRegionalId, setSelectedRegionalId] = useState<string>('antioquia');
  const [hoveredDept, setHoveredDept] = useState<DepartmentGeo | typeof SAN_ANDRES_GEO | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [mapStyle, setMapStyle] = useState<MapStyle>('classic');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlurring, setIsBlurring] = useState<boolean>(false);
  const [blurKey, setBlurKey] = useState<number>(0);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const blurTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Regional seleccionada
  const currentRegional: RegionalSENA | undefined = useMemo(() => {
    return senaRegionales.find((r) => r.id === selectedRegionalId) || senaRegionales[0];
  }, [selectedRegionalId]);

  // Lista de departamentos filtrados por la búsqueda o región natural
  const filteredRegionales = useMemo(() => {
    let list = senaRegionales;
    if (activeRegionFilter !== 'all') {
      const deptsInRegion = COLOMBIA_DEPARTMENTS_GEO.filter(
        (d) => d.region.toLowerCase() === activeRegionFilter.toLowerCase()
      ).map((d) => d.regionalId);
      if (activeRegionFilter === 'insular') {
        deptsInRegion.push('san_andres');
      }
      list = list.filter((r) => deptsInRegion.includes(r.id));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.nombre.toLowerCase().includes(q) ||
          r.departamento.toLowerCase().includes(q) ||
          r.capital.toLowerCase().includes(q) ||
          r.centros.some(
            (c) =>
              c.nombre.toLowerCase().includes(q) ||
              (c.municipio && c.municipio.toLowerCase().includes(q)) ||
              (c.enfoque && c.enfoque.toLowerCase().includes(q))
          )
      );
    }
    return list;
  }, [searchQuery, activeRegionFilter]);

  const handleSelectRegional = (regId: string) => {
    setSelectedRegionalId(regId);
    setIsBlurring(true);
    setBlurKey((prev) => prev + 1);

    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
    }
    blurTimerRef.current = setTimeout(() => {
      setIsBlurring(false);
    }, 400);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.9), 2.2));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Center view on selected department
  const handleFocusSelected = () => {
    const selectedDept = COLOMBIA_DEPARTMENTS_GEO.find((d) => d.regionalId === selectedRegionalId);
    if (selectedDept) {
      const [cx, cy] = selectedDept.center;
      // Center in 740x945 space
      setZoomLevel(1.4);
      setPanOffset({
        x: (370 - cx) * 0.4,
        y: (472 - cy) * 0.4,
      });
    } else if (selectedRegionalId === 'san_andres') {
      setZoomLevel(1.5);
      setPanOffset({ x: 120, y: 150 });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden transition-all">
      {/* Banner / Header del Mapa */}
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-emerald-800 to-[#39A900] text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-200 mb-1.5">
            <Compass size={16} className="text-green-300" /> Presencia Territorial SENA • República de Colombia
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Mapa de Colombia: 33 Regionales SENA
          </h2>
          <p className="text-sm text-green-100 mt-1 max-w-2xl leading-relaxed">
            Explora la cartografía oficial con las 33 Regionales del SENA (los 32 departamentos, el Distrito Capital y el Archipiélago de San Andrés). Haz clic sobre cualquier territorio para iluminar su contorno y conocer sus Centros de Formación.
          </p>
        </div>

        {/* Resumen numérico */}
        <div className="flex gap-4 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center flex-shrink-0">
          <div>
            <div className="text-2xl sm:text-3xl font-black leading-none text-white">33</div>
            <div className="text-[10px] uppercase font-bold text-green-200 mt-1">Regionales</div>
          </div>
          <div className="w-px bg-white/25" />
          <div>
            <div className="text-2xl sm:text-3xl font-black leading-none text-white">118+</div>
            <div className="text-[10px] uppercase font-bold text-green-200 mt-1">Centros</div>
          </div>
          <div className="w-px bg-white/25" />
          <div>
            <div className="text-2xl sm:text-3xl font-black leading-none text-white">100%</div>
            <div className="text-[10px] uppercase font-bold text-green-200 mt-1">Cobertura</div>
          </div>
        </div>
      </div>

      {/* Barra de Filtros, Búsqueda y Modos Visuales */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700/60 border-b border-gray-200 dark:border-gray-700 flex flex-col gap-3">
        {/* Fila 1: Búsqueda y Selector Rápido */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar regional, municipio o centro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#39A900] outline-none shadow-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Regional SENA:
            </span>
            <select
              value={selectedRegionalId}
              onChange={(e) => handleSelectRegional(e.target.value)}
              className="text-sm font-semibold p-2 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#39A900] outline-none shadow-sm"
            >
              {senaRegionales.map((reg) => (
                <option key={reg.id} value={reg.id}>
                  {reg.nombre} ({reg.departamento})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fila 2: Filtro por Regiones Naturales y Estilo del Mapa */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200/60 dark:border-gray-700/60">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-1 flex items-center gap-1">
              <Layers size={14} /> Filtro:
            </span>
            {[
              { id: 'all', label: 'Todas (33)' },
              { id: 'andina', label: 'Andina (11)' },
              { id: 'caribe', label: 'Caribe (7)' },
              { id: 'pacífica', label: 'Pacífica (4)' },
              { id: 'orinoquía', label: 'Orinoquía (4)' },
              { id: 'amazonía', label: 'Amazonía (6)' },
              { id: 'insular', label: 'Insular (1)' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveRegionFilter(btn.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeRegionFilter === btn.id
                    ? 'bg-[#39A900] text-white shadow-sm font-bold'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Selector de Estilo */}
            <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-600 text-xs">
              <button
                onClick={() => setMapStyle('classic')}
                title="Estilo croquis clásico limpio (referencia Pinterest)"
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  mapStyle === 'classic'
                    ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Croquis Fiel
              </button>
              <button
                onClick={() => setMapStyle('natural_regions')}
                title="Colores por regiones naturales"
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  mapStyle === 'natural_regions'
                    ? 'bg-[#39A900] text-white font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Por Regiones
              </button>
              <button
                onClick={() => setMapStyle('sena')}
                title="Modo Verde Institucional SENA"
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  mapStyle === 'sena'
                    ? 'bg-[#39A900] text-white font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                SENA Verde
              </button>
            </div>

            {/* Toggle de Nombres */}
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`p-1.5 rounded-lg border flex items-center gap-1 text-xs font-semibold transition-colors ${
                showLabels
                  ? 'bg-green-50 dark:bg-green-950/40 border-[#39A900] text-[#39A900] dark:text-[#52c41a]'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500'
              }`}
              title="Mostrar u ocultar códigos/nombres sobre el mapa"
            >
              <Tag size={13} />
              <span className="hidden sm:inline">Etiquetas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor Principal: Mapa a la izquierda + Panel de Centros a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* LADO IZQUIERDO: Mapa Vectorial Fiel e Interactivo */}
        <div className="lg:col-span-6 p-4 sm:p-6 flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-slate-100/70 dark:from-gray-900/60 dark:to-gray-950/60 relative border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 overflow-hidden select-none">
          {/* Barra superior de controles del visor */}
          <div className="w-full flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 z-10">
            <span className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
              <Sparkles size={14} className="text-[#39A900]" />
              Haz clic sobre cualquier departamento
            </span>

            {/* Botones de zoom y reset */}
            <div className="flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-1 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm">
              <button
                onClick={() => handleZoom(0.2)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 transition-colors"
                title="Acercar mapa"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={() => handleZoom(-0.2)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 transition-colors"
                title="Alejar mapa"
              >
                <ZoomOut size={14} />
              </button>
              <button
                onClick={handleResetView}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 transition-colors"
                title="Restablecer vista completa"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={handleFocusSelected}
                className="px-2 py-1 bg-green-50 dark:bg-green-950/50 hover:bg-green-100 text-[#39A900] dark:text-[#52c41a] rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1"
                title="Enfocar departamento seleccionado"
              >
                <MapPin size={12} /> Enfocar
              </button>
            </div>
          </div>

          {/* Lienzo SVG con vista exacta de Colombia */}
          <div className={`w-full max-w-[480px] aspect-[740/945] relative flex items-center justify-center my-auto transition-all duration-300 ${isBlurring ? 'filter blur-[3px] opacity-85' : 'filter blur-0 opacity-100'}`}>
            <svg
              ref={svgRef}
              viewBox={COLOMBIA_VIEWBOX}
              className="w-full h-full drop-shadow-lg select-none transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transformOrigin: 'center center',
              }}
            >
              {/* Filtros de Resplandor Neón SENA */}
              <defs>
                {/* Doble resplandor verde SENA para el departamento seleccionado */}
                <filter id="sena-glow-active" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#39A900" floodOpacity="1" />
                  <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#39A900" floodOpacity="0.8" />
                  <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#52c41a" floodOpacity="0.4" />
                </filter>

                {/* Resplandor sutil al sobrevolar con el ratón */}
                <filter id="sena-glow-hover" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#52c41a" floodOpacity="0.8" />
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#39A900" floodOpacity="0.4" />
                </filter>

                {/* Sombra suave de la masa continental */}
                <filter id="country-drop" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="2" dy="5" stdDeviation="8" floodColor="#000000" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Rosa de los vientos / Orientación Cartográfica */}
              <g transform="translate(640, 80)" className="opacity-70 pointer-events-none">
                <circle cx="0" cy="0" r="22" fill="white" className="dark:fill-gray-800" stroke="#94a3b8" strokeWidth="1" />
                <path d="M 0 -18 L 4 0 L 0 4 L -4 0 Z" fill="#39A900" />
                <path d="M 0 18 L 4 0 L 0 -4 L -4 0 Z" fill="#64748b" />
                <path d="M 18 0 L 0 4 L -4 0 L 0 -4 Z" fill="#94a3b8" />
                <path d="M -18 0 L 0 4 L 4 0 L 0 -4 Z" fill="#94a3b8" />
                <text x="0" y="-22" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0f172a" className="dark:fill-white">
                  N
                </text>
              </g>

              {/* Indicador de Mar Caribe y Océano Pacífico (Estilo Cartográfico) */}
              <text
                x="140"
                y="260"
                fontSize="12"
                fontWeight="700"
                letterSpacing="3"
                fill="#94a3b8"
                className="opacity-50 pointer-events-none select-none italic"
                transform="rotate(-25 140 260)"
              >
                OCÉANO PACÍFICO
              </text>
              <text
                x="440"
                y="30"
                fontSize="12"
                fontWeight="700"
                letterSpacing="3"
                fill="#94a3b8"
                className="opacity-50 pointer-events-none select-none italic"
              >
                MAR CARIBE
              </text>

              {/* Contorno Exterior Nacional (Fiel al mapa de referencia con trazo firme) */}
              <path
                d={COLOMBIA_OUTER_BORDER}
                fill="none"
                stroke="#334155"
                className="dark:stroke-gray-500"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#country-drop)"
                pointerEvents="none"
              />

              {/* Departamentos Continentales */}
              {COLOMBIA_DEPARTMENTS_GEO.map((dept) => {
                const isSelected = selectedRegionalId === dept.regionalId;
                const isHovered = hoveredDept?.id === dept.id;

                // Cálculo del color de relleno según el modo visual seleccionado
                let fillColor = '#f8fafc'; // Default clean slate/white like Pinterest
                let strokeColor = '#334155'; // Dark distinct contour

                if (mapStyle === 'natural_regions') {
                  const regColor = REGION_COLORS[dept.region] || REGION_COLORS['Andina'];
                  fillColor = regColor.fill;
                  strokeColor = '#1e293b';
                } else if (mapStyle === 'sena') {
                  fillColor = '#f0fdf4';
                  strokeColor = '#166534';
                }

                if (isHovered) {
                  fillColor = '#bbf7d0'; // Light emerald highlight
                  strokeColor = '#16a34a';
                }

                if (isSelected) {
                  fillColor = 'rgba(57, 169, 0, 0.45)'; // SENA Green Glow
                  strokeColor = '#39A900';
                }

                return (
                  <g
                    key={dept.id}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => handleSelectRegional(dept.regionalId)}
                    onMouseEnter={() => setHoveredDept(dept)}
                    onMouseLeave={() => setHoveredDept(null)}
                  >
                    {/* Trazado del departamento */}
                    <path
                      d={dept.path}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={isSelected ? 'url(#sena-glow-active)' : isHovered ? 'url(#sena-glow-hover)' : undefined}
                      className="transition-colors duration-200 dark:stroke-gray-400"
                    />

                    {/* Pin centroid / Marcador de posición */}
                    <circle
                      cx={dept.center[0]}
                      cy={dept.center[1]}
                      r={isSelected ? 5 : isHovered ? 4 : 2.5}
                      fill={isSelected ? '#ffffff' : isHovered ? '#39A900' : '#475569'}
                      stroke={isSelected ? '#39A900' : '#ffffff'}
                      strokeWidth={isSelected ? 2.5 : 1}
                      className="pointer-events-none transition-all duration-200 shadow"
                    />

                    {/* Anillo de pulso si está seleccionado */}
                    {isSelected && (
                      <circle
                        cx={dept.center[0]}
                        cy={dept.center[1]}
                        r="9"
                        fill="none"
                        stroke="#39A900"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                        className="animate-spin pointer-events-none origin-center"
                        style={{ transformOrigin: `${dept.center[0]}px ${dept.center[1]}px` }}
                      />
                    )}

                    {/* Etiquetas textuales sobre el mapa (opcionales) */}
                    {showLabels && (
                      <text
                        x={dept.center[0]}
                        y={dept.center[1] - (isSelected ? 7 : 4)}
                        fontSize={isSelected ? 10 : 8}
                        fontWeight={isSelected ? '900' : '600'}
                        textAnchor="middle"
                        fill={isSelected ? '#15803d' : '#334155'}
                        className="pointer-events-none dark:fill-gray-200 select-none drop-shadow-sm font-sans"
                      >
                        {dept.name.length > 9 && !isSelected
                          ? dept.code.replace('CO-', '')
                          : dept.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* INSERTO CARTOGRÁFICO: Archipiélago de San Andrés, Providencia y Santa Catalina */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleSelectRegional(SAN_ANDRES_GEO.regionalId)}
                onMouseEnter={() => setHoveredDept(SAN_ANDRES_GEO)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                {/* Cuadro contenedor clásico de insulares */}
                <rect
                  x="85"
                  y="25"
                  width="110"
                  height="82"
                  rx="6"
                  fill={
                    selectedRegionalId === 'san_andres'
                      ? 'rgba(57, 169, 0, 0.25)'
                      : hoveredDept?.id === 'CO-SAP'
                      ? 'rgba(57, 169, 0, 0.15)'
                      : 'white'
                  }
                  className="dark:fill-gray-800 transition-colors"
                  stroke={selectedRegionalId === 'san_andres' ? '#39A900' : '#64748b'}
                  strokeWidth={selectedRegionalId === 'san_andres' ? 2.5 : 1}
                  strokeDasharray={selectedRegionalId === 'san_andres' ? 'none' : '4 2'}
                  filter={selectedRegionalId === 'san_andres' ? 'url(#sena-glow-active)' : undefined}
                />

                {/* Título del recuadro */}
                <text
                  x="140"
                  y="40"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill={selectedRegionalId === 'san_andres' ? '#15803d' : '#475569'}
                  className="dark:fill-gray-300 font-sans tracking-tight"
                >
                  San Andrés y Providencia
                </text>

                {/* Siluetas de las islas con su transformación precisa */}
                <g transform="matrix(0.4096, 0, 0, 0.4096, 79.355, 48.007)">
                  {/* Isla de Providencia y Santa Catalina */}
                  <path
                    d={SAN_ANDRES_GEO.island2}
                    fill={selectedRegionalId === 'san_andres' ? '#39A900' : '#0284c7'}
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    className="transition-colors"
                  />
                  {/* Isla de San Andrés */}
                  <path
                    d={SAN_ANDRES_GEO.island1}
                    fill={selectedRegionalId === 'san_andres' ? '#39A900' : '#0284c7'}
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    className="transition-colors"
                  />
                </g>

                {/* Marcador */}
                <circle
                  cx="140"
                  cy="75"
                  r={selectedRegionalId === 'san_andres' ? 4 : 2.5}
                  fill={selectedRegionalId === 'san_andres' ? '#ffffff' : '#39A900'}
                  stroke="#39A900"
                  strokeWidth={selectedRegionalId === 'san_andres' ? 2 : 1}
                />
                <text
                  x="140"
                  y="96"
                  fontSize="7.5"
                  fontWeight="600"
                  textAnchor="middle"
                  fill="#64748b"
                  className="dark:fill-gray-400 font-sans"
                >
                  Regional SENA Insular
                </text>
              </g>
            </svg>

            {/* Tooltip Dinámico y Flotante */}
            {hoveredDept && (
              <div className="absolute top-3 left-3 bg-gray-900/95 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl pointer-events-none backdrop-blur-md border border-gray-700 animate-fadeIn z-20 flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#52c41a]">
                  <MapPin size={14} />
                  {hoveredDept.name}
                </div>
                <div className="text-[11px] text-gray-300">
                  Capital / Sede: <strong>{hoveredDept.capital}</strong>
                </div>
                <div className="text-[10px] text-gray-400">
                  Región: {hoveredDept.region} • Haz clic para ver centros
                </div>
              </div>
            )}
          </div>

          {/* Pie de foto y leyenda del mapa */}
          <div className="w-full pt-3 border-t border-gray-200/80 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400 text-center">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#39A900] shadow-[0_0_8px_#39A900]" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Verde Neón: Regional Seleccionada
              </span>
            </div>
            <span>Base cartográfica oficial de los 32 Departamentos + D.C. + Archipiélago</span>
          </div>
        </div>

        {/* LADO DERECHO: Panel Dinámico de la Regional y Centros */}
        <div className="lg:col-span-6 p-6 flex flex-col justify-between bg-white dark:bg-gray-800 relative overflow-hidden">
          {/* Indicador de efecto Blur / Refocus al cambiar de regional */}
          {isBlurring && (
            <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-[4px] z-10 pointer-events-none transition-opacity duration-300 flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-full bg-[#39A900] text-white text-xs font-bold shadow-lg animate-pulse">
                Cargando Regional...
              </span>
            </div>
          )}

          {currentRegional && (
            <div
              key={blurKey}
              className={`space-y-6 transition-all duration-300 ${
                isBlurring
                  ? 'filter blur-[5px] scale-[0.99] opacity-80'
                  : 'filter blur-0 scale-100 opacity-100'
              } animate-blur-regional`}
            >
              {/* Cabecera de la Regional */}
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                    <CheckCircle2 size={14} className="text-[#39A900]" />
                    {currentRegional.departamento}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <MapPin size={14} className="text-[#39A900]" />
                    Sede Principal: <strong>{currentRegional.capital}</strong>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {currentRegional.nombre}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  {currentRegional.descripcion}
                </p>
              </div>

              {/* Contador de Centros y Detalle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-[#39A900]" />
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 text-base">
                    Centros de Formación Profesional Integral ({currentRegional.centros.length})
                  </h4>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[#39A900] dark:text-[#52c41a]">
                  Acuerdo 009 de 2024
                </span>
              </div>

              {/* Lista dinámica de centros de la regional */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {currentRegional.centros.map((centro, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-700/40 hover:border-[#39A900] dark:hover:border-[#52c41a] transition-all group shadow-sm hover:shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/60 text-[#39A900] dark:text-[#52c41a] font-black text-xs flex items-center justify-center flex-shrink-0">
                            {cIdx + 1}
                          </span>
                          <h5 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#39A900] dark:group-hover:text-[#52c41a] transition-colors leading-snug">
                            {centro.nombre}
                          </h5>
                        </div>

                        {centro.municipio && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 ml-8.5 flex items-center gap-1">
                            <MapPin size={12} className="text-[#39A900]" />
                            Municipio: <strong className="text-gray-700 dark:text-gray-200">{centro.municipio}</strong>
                          </p>
                        )}

                        {centro.enfoque && (
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-2 ml-8.5 bg-white dark:bg-gray-800/90 p-2.5 rounded-lg border border-gray-100 dark:border-gray-600/50">
                            <strong className="text-gray-700 dark:text-gray-200">Vocación y sectores:</strong>{' '}
                            {centro.enfoque}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tarjeta de Resumen Normativo */}
              <div className="p-3.5 rounded-xl bg-green-50/80 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 flex items-start gap-2.5 text-xs text-green-900 dark:text-green-200">
                <Info size={16} className="text-[#39A900] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Cada Centro de Formación cuenta con su Subdirector de Centro y su respectivo <strong>Comité de Evaluación y Seguimiento</strong>, garantizando el cumplimiento de los deberes, derechos y el debido proceso de los aprendices.
                </p>
              </div>
            </div>
          )}

          {/* Enlace oficial SENA y Directorio */}
          <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Directorio Oficial de Regionales SENA</span>
            <a
              href="https://www.sena.edu.co/es-co/regionales/paginas/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#39A900] dark:text-[#52c41a] font-bold hover:underline inline-flex items-center gap-1"
            >
              Consultar sedes en portal SENA <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

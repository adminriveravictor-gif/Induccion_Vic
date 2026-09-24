import { useState, useMemo } from 'react';
import { senaRegionales, RegionalSena } from '../data/senaRegionalesData';
import { MapPin, Building2, ExternalLink, Search, Globe, ChevronRight, Award, Compass, Layers } from 'lucide-react';

// Department geographic nodes for the interactive SVG Map
interface MapNode {
  id: string;
  name: string;
  x: number;
  y: number;
  path: string;
}

const mapDepartments: MapNode[] = [
  // Caribe
  { id: 'laguajira', name: 'La Guajira', x: 280, y: 40, path: 'M250,30 L290,20 L310,40 L280,75 L255,55 Z' },
  { id: 'magdalena', name: 'Magdalena', x: 235, y: 80, path: 'M220,60 L255,55 L260,110 L230,120 L220,90 Z' },
  { id: 'atlantico', name: 'Atlántico', x: 205, y: 70, path: 'M195,65 L220,60 L218,85 L198,82 Z' },
  { id: 'cesar', name: 'Cesar', x: 275, y: 110, path: 'M260,70 L280,75 L285,145 L255,155 L260,110 Z' },
  { id: 'sucre', name: 'Sucre', x: 195, y: 120, path: 'M185,100 L215,100 L215,135 L180,130 Z' },
  { id: 'bolivar', name: 'Bolívar', x: 225, y: 145, path: 'M215,85 L235,85 L255,155 L235,210 L205,160 Z' },
  { id: 'cordoba', name: 'Córdoba', x: 175, y: 155, path: 'M155,135 L190,130 L195,185 L155,175 Z' },
  // Insular
  { id: 'sanandres', name: 'San Andrés y Prov.', x: 75, y: 55, path: 'M60,45 L90,45 L90,75 L60,75 Z' },
  // Pacífica
  { id: 'choco', name: 'Chocó', x: 130, y: 240, path: 'M130,170 L160,175 L150,290 L120,290 L115,220 Z' },
  { id: 'valle', name: 'Valle del Cauca', x: 145, y: 325, path: 'M125,300 L175,300 L165,355 L130,345 Z' },
  { id: 'cauca', name: 'Cauca', x: 140, y: 390, path: 'M125,360 L175,360 L185,410 L130,420 Z' },
  { id: 'narino', name: 'Nariño', x: 120, y: 455, path: 'M105,420 L165,420 L155,480 L95,465 Z' },
  // Andina
  { id: 'antioquia', name: 'Antioquia', x: 185, y: 220, path: 'M155,175 L215,175 L230,225 L195,275 L155,245 Z' },
  { id: 'nortedesantander', name: 'Norte de Santander', x: 285, y: 180, path: 'M270,145 L310,165 L300,225 L265,200 Z' },
  { id: 'santander', name: 'Santander', x: 255, y: 220, path: 'M230,195 L275,195 L275,255 L225,245 Z' },
  { id: 'boyaca', name: 'Boyacá', x: 280, y: 265, path: 'M255,240 L310,245 L310,285 L260,290 Z' },
  { id: 'caldas', name: 'Caldas', x: 175, y: 285, path: 'M165,275 L200,275 L195,295 L165,295 Z' },
  { id: 'risaralda', name: 'Risaralda', x: 165, y: 300, path: 'M150,295 L180,295 L175,312 L150,308 Z' },
  { id: 'quindio', name: 'Quindío', x: 172, y: 318, path: 'M165,310 L185,310 L183,326 L165,324 Z' },
  { id: 'cundinamarca', name: 'Cundinamarca', x: 235, y: 310, path: 'M215,280 L260,285 L255,345 L205,335 Z' },
  { id: 'bogota', name: 'Distrito Capital', x: 240, y: 320, path: 'M233,315 L247,315 L247,327 L233,327 Z' },
  { id: 'tolima', name: 'Tolima', x: 195, y: 345, path: 'M180,315 L215,315 L210,380 L175,370 Z' },
  { id: 'huila', name: 'Huila', x: 185, y: 420, path: 'M175,380 L210,380 L205,455 L165,440 Z' },
  // Orinoquía
  { id: 'arauca', name: 'Arauca', x: 365, y: 215, path: 'M310,195 L395,200 L375,235 L310,225 Z' },
  { id: 'casanare', name: 'Casanare', x: 340, y: 275, path: 'M295,245 L380,250 L365,305 L285,285 Z' },
  { id: 'meta', name: 'Meta', x: 295, y: 360, path: 'M245,335 L345,330 L325,410 L235,395 Z' },
  { id: 'vichada', name: 'Vichada', x: 410, y: 300, path: 'M365,245 L465,275 L450,370 L345,335 Z' },
  // Amazonía
  { id: 'guainia', name: 'Guainía', x: 425, y: 405, path: 'M375,370 L460,370 L445,455 L375,435 Z' },
  { id: 'guaviare', name: 'Guaviare', x: 320, y: 430, path: 'M275,405 L375,405 L355,465 L265,455 Z' },
  { id: 'vaupes', name: 'Vaupés', x: 370, y: 485, path: 'M335,460 L430,460 L400,530 L315,510 Z' },
  { id: 'caqueta', name: 'Caquetá', x: 250, y: 490, path: 'M205,450 L305,450 L275,535 L195,510 Z' },
  { id: 'putumayo', name: 'Putumayo', x: 180, y: 505, path: 'M145,480 L220,480 L210,530 L135,515 Z' },
  { id: 'amazonas', name: 'Amazonas', x: 330, y: 565, path: 'M265,530 L385,520 L365,630 L275,600 Z' },
];

export default function ColombiaMapExplorer() {
  const [selectedId, setSelectedId] = useState<string>('bogota');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterZona, setFilterZona] = useState<string>('Todas');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedRegional = useMemo(() => {
    return senaRegionales.find(r => r.id === selectedId) || senaRegionales[0];
  }, [selectedId]);

  const filteredRegionales = useMemo(() => {
    return senaRegionales.filter(r => {
      const matchSearch =
        r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.centros.some(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || c.municipio?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchZona = filterZona === 'Todas' || r.zona === filterZona;
      return matchSearch && matchZona;
    });
  }, [searchTerm, filterZona]);

  const totalCentrosNacionales = useMemo(() => {
    return senaRegionales.reduce((acc, curr) => acc + curr.centros.length, 0);
  }, []);

  const zonas = ['Todas', 'Andina', 'Caribe', 'Pacífica', 'Orinoquía', 'Amazonía', 'Insular'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
      {/* Encabezado Institucional del Módulo */}
      <div className="p-6 bg-gradient-to-r from-green-50 via-white to-green-50/50 dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] dark:text-[#52c41a] mb-2">
          <Compass size={16} /> Mapa Interactivo Nacional SENA
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Presencia Institucional en las 33 Regionales
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
          El Servicio Nacional de Aprendizaje cuenta con presencia en los <strong>32 departamentos de Colombia y el Distrito Capital (33 Regionales)</strong>, articulando más de <strong>{totalCentrosNacionales} Centros de Formación Profesional Integral</strong> para llevar educación gratuita y de calidad a todos los rincones del país.
        </p>

        {/* Cifras destacadas */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xs">
            <span className="text-gray-500 dark:text-gray-400 block">Regionales:</span>
            <span className="text-lg font-black text-[#39A900] dark:text-[#52c41a]">33 Regionales</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xs">
            <span className="text-gray-500 dark:text-gray-400 block">Centros Formativos:</span>
            <span className="text-lg font-black text-[#39A900] dark:text-[#52c41a]">{totalCentrosNacionales} Centros</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xs">
            <span className="text-gray-500 dark:text-gray-400 block">Departamentos:</span>
            <span className="text-lg font-black text-[#39A900] dark:text-[#52c41a]">32 + Bogotá D.C.</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xs">
            <span className="text-gray-500 dark:text-gray-400 block">Cobertura:</span>
            <span className="text-lg font-black text-[#39A900] dark:text-[#52c41a]">100% Nacional</span>
          </div>
        </div>
      </div>

      {/* Controles de Filtro y Búsqueda */}
      <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar regional, ciudad o centro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#39A900] outline-none"
          />
        </div>

        {/* Pestañas de Zona Geográfica */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {zonas.map((z) => (
            <button
              key={z}
              onClick={() => setFilterZona(z)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                filterZona === z
                  ? 'bg-[#39A900] text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor Principal: Mapa a la izquierda, Detalle de Regional a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Mapa Interactivo SVG */}
        <div className="lg:col-span-6 flex flex-col items-center justify-start bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 relative">
          <div className="w-full flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold flex items-center gap-1 text-[#39A900]">
              <MapPin size={14} /> Haz clic en cualquier departamento:
            </span>
            <span>{selectedRegional.nombre}</span>
          </div>

          <div className="w-full max-w-md aspect-[5/6] relative flex items-center justify-center select-none">
            <svg
              viewBox="0 0 500 650"
              className="w-full h-full drop-shadow-md"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))' }}
            >
              {/* Océanos y fondo sutil */}
              <rect width="500" height="650" fill="transparent" />

              {/* Polígonos de Departamentos */}
              {mapDepartments.map((dept) => {
                const isSelected = dept.id === selectedId;
                const isHovered = dept.id === hoveredId;

                return (
                  <g
                    key={dept.id}
                    onClick={() => setSelectedId(dept.id)}
                    onMouseEnter={() => setHoveredId(dept.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="cursor-pointer transition-transform duration-200"
                  >
                    <path
                      d={dept.path}
                      className="transition-all duration-200"
                      fill={
                        isSelected
                          ? '#39A900'
                          : isHovered
                          ? '#52c41a'
                          : '#9ca3af'
                      }
                      stroke={isSelected ? '#ffffff' : '#374151'}
                      strokeWidth={isSelected ? '2.5' : '1'}
                      opacity={isSelected ? '1' : isHovered ? '0.9' : '0.45'}
                    />
                    {/* Punto indicador y nombre abreviado */}
                    <circle
                      cx={dept.x}
                      cy={dept.y}
                      r={isSelected ? '5' : '3'}
                      fill={isSelected ? '#ffffff' : isHovered ? '#ffffff' : '#1f2937'}
                      className="transition-all"
                    />
                    <text
                      x={dept.x}
                      y={dept.y - 6}
                      textAnchor="middle"
                      className="text-[9px] font-bold pointer-events-none select-none transition-all"
                      fill={isSelected ? '#ffffff' : isHovered ? '#10b981' : '#4b5563'}
                    >
                      {dept.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}

              {/* Indicador Insular San Andrés */}
              <rect x="40" y="30" width="70" height="60" fill="none" stroke="#9ca3af" strokeDasharray="3 3" />
              <text x="75" y="102" textAnchor="middle" className="text-[8px] fill-gray-400 font-semibold">
                Archipiélago
              </text>
            </svg>
          </div>

          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 text-center">
            Tip: También puedes seleccionar cualquier regional desde la lista interactiva inferior.
          </p>
        </div>

        {/* Ficha Informativa de la Regional Seleccionada */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-white dark:bg-gray-700/80 p-6 rounded-xl border-2 border-[#39A900] dark:border-[#52c41a] shadow-md transition-all">
            {/* Header de la Regional */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-200 dark:border-gray-600">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-200">
                  {selectedRegional.zona} • Código {selectedRegional.codigo}
                </span>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1.5 flex items-center gap-2">
                  {selectedRegional.nombre}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">
                  Departamento: <strong>{selectedRegional.departamento}</strong> | Capital: <strong>{selectedRegional.capital}</strong>
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-[#39A900] dark:text-[#52c41a] flex items-center justify-center font-black text-xl flex-shrink-0">
                {selectedRegional.centros.length}
              </div>
            </div>

            {/* Descripción */}
            {selectedRegional.descripcion && (
              <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                "{selectedRegional.descripcion}"
              </p>
            )}

            {/* Listado de Centros de Formación */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Building2 size={16} className="text-[#39A900]" />
                  Centros de Formación ({selectedRegional.centros.length}):
                </h4>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  Directorio Oficial SENA
                </span>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {selectedRegional.centros.map((centro, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50/70 dark:bg-gray-800/80 hover:border-[#39A900] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-sm text-gray-900 dark:text-gray-100 leading-snug">
                        {centro.nombre}
                      </p>
                      {centro.municipio && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                          {centro.municipio}
                        </span>
                      )}
                    </div>
                    {centro.vocacion && (
                      <p className="text-xs text-[#39A900] dark:text-[#52c41a] mt-1 font-medium">
                        Especialidad: {centro.vocacion}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enlace al Directorio Oficial */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="https://www.sena.edu.co/es-co/regionales/paginas/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#39A900] dark:text-[#52c41a] font-bold hover:underline"
              >
                <Globe size={14} /> Directorio de Regionales en sena.edu.co
                <ExternalLink size={12} />
              </a>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Línea Gratuita Nacional: 018000 910270
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Directorio de Selección Rápida en Grid */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
            <Layers size={16} className="text-[#39A900]" />
            Listado Completo de las 33 Regionales ({filteredRegionales.length}):
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Haz clic en cualquiera para cargar sus centros
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {filteredRegionales.map((r) => {
            const isSelected = r.id === selectedId;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`text-left p-2.5 rounded-lg text-xs font-semibold border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-[#39A900] bg-green-50 dark:bg-green-950/40 text-[#39A900] dark:text-[#52c41a] shadow-xs'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="block font-bold truncate">{r.departamento}</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">{r.centros.length} centro(s)</span>
                </div>
                <ChevronRight size={14} className={isSelected ? 'text-[#39A900]' : 'text-gray-400'} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

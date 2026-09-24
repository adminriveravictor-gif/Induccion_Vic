import { useState, useEffect } from 'react';

export default function WalkingPersonCursor() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [stepToggle, setStepToggle] = useState<boolean>(false);

  useEffect(() => {
    let moveTimeout: NodeJS.Timeout;
    let lastX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      setIsMoving(true);

      // Alternate footstep sway when moving
      if (Math.abs(e.clientX - lastX) > 8) {
        setStepToggle((prev) => !prev);
        lastX = e.clientX;
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 120);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(moveTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[999999] transition-transform duration-75 ease-out select-none will-change-transform"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-14px, -14px) scale(${isClicking ? 0.88 : 1}) rotate(${
          isMoving ? (stepToggle ? 6 : -6) : 0
        }deg)`,
      }}
    >
      {/* Sombra / Efecto de resplandor verde institucional */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className={`w-9 h-9 drop-shadow-[0_2px_8px_rgba(57,169,0,0.65)] transition-all ${
            isClicking ? 'drop-shadow-[0_0_12px_#39A900]' : ''
          }`}
        >
          <defs>
            <filter id="cursor-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          <g filter="url(#cursor-glow)">
            {/* Cabeza del aprendiz/persona caminando */}
            <circle cx="32" cy="11" r="6.5" fill="#39A900" stroke="#ffffff" strokeWidth="1.6" />

            {/* Torso con postura dinámica de marcha hacia adelante */}
            <path
              d="M 31 18 L 34 30 L 30 38"
              fill="none"
              stroke="#39A900"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Brazos en movimiento de caminata */}
            {/* Brazo delantero (hacia adelante y arriba en progreso) */}
            <path
              d="M 32 22 L 44 19 L 49 26"
              fill="none"
              stroke="#39A900"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Brazo trasero (hacia atrás con impulso) */}
            <path
              d="M 32 22 L 21 26 L 15 34"
              fill="none"
              stroke="#1e293b"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Piernas en zancada activa de caminante */}
            {/* Pierna delantera (avanzando con paso firme) */}
            <path
              d={stepToggle ? "M 30 38 L 42 45 L 48 57" : "M 30 38 L 39 46 L 45 56"}
              fill="none"
              stroke="#39A900"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pierna trasera (impulso) */}
            <path
              d={stepToggle ? "M 30 38 L 20 46 L 15 56" : "M 30 38 L 22 47 L 17 57"}
              fill="none"
              stroke="#1e293b"
              strokeWidth="4.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pies / zapatilla en apoyo */}
            <path d="M 46 57 L 52 57" stroke="#39A900" strokeWidth="3" strokeLinecap="round" />
            <path d="M 16 57 L 11 56" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>

        {/* Onda de clic */}
        {isClicking && (
          <span className="absolute -top-1 -left-1 w-11 h-11 rounded-full border-2 border-[#39A900] bg-green-400/20 animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
}

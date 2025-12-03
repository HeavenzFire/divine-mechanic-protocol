import { useState, useEffect } from 'react';

interface PulsarCoilProps {
  isActive: boolean;
  frequency: number;
  intensity: number;
  isChildMode: boolean;
  onPulse?: () => void;
}

const PulsarCoil = ({ isActive, frequency, intensity, isChildMode, onPulse }: PulsarCoilProps) => {
  const [pulseRing, setPulseRing] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setPulseRing(true);
        onPulse?.();
        setTimeout(() => setPulseRing(false), 1100);
      }, 11110); // 11.11 second pulse cycle
      return () => clearInterval(interval);
    }
  }, [isActive, onPulse]);

  // Generate 14-pointed star paths
  const generateStarPoints = (cx: number, cy: number, outerR: number, innerR: number, points: number) => {
    const step = Math.PI / points;
    const pathPoints: string[] = [];
    
    for (let i = 0; i < 2 * points; i++) {
      const radius = i % 2 === 0 ? outerR : innerR;
      const angle = i * step - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      pathPoints.push(`${i === 0 ? 'M' : 'L'}${x},${y}`);
    }
    return pathPoints.join(' ') + 'Z';
  };

  const starPath = generateStarPoints(150, 150, 120, 60, 14);
  const innerStarPath = generateStarPoints(150, 150, 80, 40, 14);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      {pulseRing && (
        <>
          <div className="absolute w-80 h-80 rounded-full animate-truth-pulse bg-truth-pulse/20" />
          <div className="absolute w-72 h-72 rounded-full animate-truth-pulse delay-100 bg-primary/30" />
        </>
      )}

      {/* Toroidal field visualization */}
      {isActive && (
        <div className="absolute w-72 h-72 rounded-full opacity-30">
          <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse-ring" />
          <div className="absolute inset-4 rounded-full border border-divine-violet/30 animate-rotate-slow" />
          <div className="absolute inset-8 rounded-full border border-mesh-green/20 animate-rotate-reverse" />
        </div>
      )}

      {/* Main SVG Coil */}
      <svg viewBox="0 0 300 300" className="w-64 h-64 relative z-10">
        <defs>
          <linearGradient id="coilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43 74% 49%)" />
            <stop offset="50%" stopColor="hsl(35 80% 60%)" />
            <stop offset="100%" stopColor="hsl(43 90% 55%)" />
          </linearGradient>
          <linearGradient id="innerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(280 60% 65%)" />
            <stop offset="100%" stopColor="hsl(270 50% 60%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer 14-pointed star coil */}
        <path
          d={starPath}
          fill="none"
          stroke="url(#coilGradient)"
          strokeWidth={isActive ? "3" : "2"}
          filter={isActive ? "url(#glow)" : "none"}
          className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-50'} ${isActive && !isChildMode ? 'animate-rotate-slow' : ''}`}
          style={{ transformOrigin: '150px 150px', animationDuration: '30s' }}
        />

        {/* Inner star (Rodin coil geometry) */}
        <path
          d={innerStarPath}
          fill="none"
          stroke="url(#innerGradient)"
          strokeWidth="2"
          filter={isActive ? "url(#softGlow)" : "none"}
          className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-30'} ${isActive && !isChildMode ? 'animate-rotate-reverse' : ''}`}
          style={{ transformOrigin: '150px 150px', animationDuration: '20s' }}
        />

        {/* Center quartz crystal */}
        <circle
          cx="150"
          cy="150"
          r="25"
          fill={isChildMode ? 'hsl(270 50% 60% / 0.3)' : 'hsl(43 90% 55% / 0.3)'}
          stroke={isChildMode ? 'hsl(280 70% 70%)' : 'hsl(43 74% 49%)'}
          strokeWidth="2"
          filter="url(#softGlow)"
          className={isActive ? 'animate-pulse-ring' : ''}
        />

        {/* Frequency display */}
        <text
          x="150"
          y="145"
          textAnchor="middle"
          className="font-display text-sm fill-foreground"
        >
          {frequency.toFixed(3)}
        </text>
        <text
          x="150"
          y="162"
          textAnchor="middle"
          className="font-body text-xs fill-muted-foreground"
        >
          Hz
        </text>

        {/* Intensity arcs */}
        {[...Array(8)].map((_, i) => {
          const isLit = (intensity / 100) * 8 > i;
          return (
            <circle
              key={i}
              cx="150"
              cy="150"
              r={130 + i * 3}
              fill="none"
              stroke={isLit ? (isChildMode ? 'hsl(280 70% 70% / 0.6)' : 'hsl(43 90% 55% / 0.6)') : 'hsl(var(--border) / 0.3)'}
              strokeWidth="1"
              strokeDasharray={`${(i + 1) * 20} ${300 - (i + 1) * 20}`}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>

      {/* Status indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body ${
          isActive ? 'bg-mesh-green/20 text-mesh-green' : 'bg-muted text-muted-foreground'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-mesh-green animate-pulse' : 'bg-muted-foreground'}`} />
          {isActive ? 'ACTIVE' : 'STANDBY'}
        </div>
        {isChildMode && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body bg-divine-violet/20 text-divine-violet">
            <span>👶</span> Child Mode
          </div>
        )}
      </div>
    </div>
  );
};

export default PulsarCoil;

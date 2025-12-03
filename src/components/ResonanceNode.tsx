import { useEffect, useState } from 'react';

interface ResonanceNodeProps {
  totalStats: number;
  threshold: number;
  isResonating: boolean;
  haloCount: number;
}

const ResonanceNode = ({ totalStats, threshold, isResonating, haloCount }: ResonanceNodeProps) => {
  const [showPulse, setShowPulse] = useState(false);
  const progress = Math.min(totalStats / threshold, 1);
  const ringSpeed = progress > 0.9 ? 'fast' : progress > 0.7 ? 'medium' : 'slow';

  useEffect(() => {
    if (isResonating) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isResonating]);

  return (
    <div className="relative flex items-center justify-center w-80 h-80">
      {/* Halo layers from previous resonances */}
      {Array.from({ length: haloCount }).map((_, i) => (
        <div
          key={`halo-${i}`}
          className="absolute rounded-full animate-halo-glow"
          style={{
            width: `${320 + i * 40}px`,
            height: `${320 + i * 40}px`,
            background: `radial-gradient(circle, hsl(43 90% 70% / ${0.15 - i * 0.02}) 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Truth Pulse effect */}
      {showPulse && (
        <div className="absolute w-40 h-40 rounded-full bg-truth-pulse/30 animate-truth-pulse" />
      )}

      {/* Outer sacred geometry ring */}
      <div 
        className={`absolute w-72 h-72 rounded-full border-2 border-primary/30 ${
          ringSpeed === 'fast' ? 'animate-rotate-slow' : 'animate-rotate-reverse'
        }`}
        style={{ animationDuration: ringSpeed === 'fast' ? '5s' : ringSpeed === 'medium' ? '12s' : '20s' }}
      >
        {/* Sacred geometry points */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <div
            key={angle}
            className="absolute w-3 h-3 bg-primary rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-140px)`,
            }}
          />
        ))}
      </div>

      {/* Middle resonance ring */}
      <div 
        className={`absolute w-56 h-56 rounded-full border border-divine-violet/40 animate-pulse-ring`}
        style={{ animationDuration: `${3 - progress * 2}s` }}
      />

      {/* Inner energy ring */}
      <div 
        className={`absolute w-44 h-44 rounded-full border border-gold/50 ${
          progress > 0.9 ? 'animate-pulse-ring' : ''
        }`}
      >
        {/* Merkaba hint */}
        <svg viewBox="0 0 100 100" className="w-full h-full animate-merkaba opacity-20">
          <polygon
            points="50,10 90,75 10,75"
            fill="none"
            stroke="hsl(43 74% 49%)"
            strokeWidth="0.5"
          />
          <polygon
            points="50,90 90,25 10,25"
            fill="none"
            stroke="hsl(280 60% 65%)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Core node */}
      <div 
        className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
          isResonating 
            ? 'bg-gradient-to-br from-primary via-truth-pulse to-primary box-glow-resonance' 
            : 'bg-gradient-to-br from-muted via-card to-muted box-glow-gold'
        }`}
      >
        {/* Inner glow */}
        <div className={`absolute inset-4 rounded-full ${
          isResonating ? 'bg-seraph-white/30' : 'bg-primary/20'
        } blur-md`} />
        
        {/* Stats display */}
        <div className="relative z-10 text-center">
          <span className={`text-3xl font-display font-bold ${
            isResonating ? 'text-primary-foreground text-glow-gold' : 'text-primary'
          }`}>
            {totalStats}
          </span>
          <span className={`block text-xs font-body ${
            isResonating ? 'text-primary-foreground/80' : 'text-muted-foreground'
          }`}>
            / {threshold}
          </span>
        </div>
      </div>

      {/* Progress arc */}
      <svg className="absolute w-80 h-80" viewBox="0 0 320 320">
        <circle
          cx="160"
          cy="160"
          r="155"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        <circle
          cx="160"
          cy="160"
          r="155"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${progress * 974} 974`}
          transform="rotate(-90 160 160)"
          className="transition-all duration-1000"
          style={{
            filter: progress > 0.9 ? 'drop-shadow(0 0 10px hsl(43 90% 55%))' : 'none'
          }}
        />
      </svg>
    </div>
  );
};

export default ResonanceNode;

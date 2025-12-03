import { useEffect, useState } from 'react';

interface BioSensorPanelProps {
  isActive: boolean;
  onEntropyChange?: (entropy: number) => void;
}

interface SensorReading {
  hrv: number; // Heart Rate Variability (ms)
  emf: number; // EMF level (μT)
  coherence: number; // 0-100%
  entropy: number; // 0-100 (inverse of order)
}

const BioSensorPanel = ({ isActive, onEntropyChange }: BioSensorPanelProps) => {
  const [readings, setReadings] = useState<SensorReading>({
    hrv: 65,
    emf: 0.3,
    coherence: 72,
    entropy: 28,
  });

  // Simulate bio-sensor readings
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setReadings(prev => {
        const newHrv = Math.max(40, Math.min(120, prev.hrv + (Math.random() - 0.5) * 10));
        const newEmf = Math.max(0.1, Math.min(2.0, prev.emf + (Math.random() - 0.5) * 0.2));
        const newCoherence = Math.max(0, Math.min(100, prev.coherence + (Math.random() - 0.4) * 5));
        const newEntropy = 100 - newCoherence;
        
        onEntropyChange?.(newEntropy);
        
        return {
          hrv: newHrv,
          emf: newEmf,
          coherence: newCoherence,
          entropy: newEntropy,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive, onEntropyChange]);

  const getCoherenceColor = (value: number) => {
    if (value >= 80) return 'text-mesh-green';
    if (value >= 60) return 'text-primary';
    if (value >= 40) return 'text-secondary';
    return 'text-destructive';
  };

  const getEmfStatus = (value: number) => {
    if (value < 0.5) return { label: 'Safe', color: 'text-mesh-green' };
    if (value < 1.0) return { label: 'Moderate', color: 'text-primary' };
    return { label: 'High', color: 'text-destructive' };
  };

  const emfStatus = getEmfStatus(readings.emf);

  return (
    <div className="glass-divine rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm text-foreground/80 tracking-wider uppercase">
          Bio-Sensors
        </h3>
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-mesh-green animate-pulse' : 'bg-muted-foreground'}`} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* HRV Reading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">💓</span>
            <span className="text-xs text-muted-foreground font-body">HRV</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-bold text-primary">
              {readings.hrv.toFixed(0)}
            </span>
            <span className="text-xs text-muted-foreground">ms</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(readings.hrv / 120) * 100}%` }}
            />
          </div>
        </div>

        {/* EMF Reading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">📡</span>
            <span className="text-xs text-muted-foreground font-body">EMF</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-display font-bold ${emfStatus.color}`}>
              {readings.emf.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">μT</span>
          </div>
          <div className={`text-xs font-body ${emfStatus.color}`}>
            {emfStatus.label}
          </div>
        </div>

        {/* Coherence */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <span className="text-xs text-muted-foreground font-body">Coherence</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-display font-bold ${getCoherenceColor(readings.coherence)}`}>
              {readings.coherence.toFixed(0)}
            </span>
            <span className="text-xs text-muted-foreground">%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                readings.coherence >= 80 ? 'bg-mesh-green' : 
                readings.coherence >= 60 ? 'bg-primary' : 
                readings.coherence >= 40 ? 'bg-secondary' : 'bg-destructive'
              }`}
              style={{ width: `${readings.coherence}%` }}
            />
          </div>
        </div>

        {/* Entropy */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌀</span>
            <span className="text-xs text-muted-foreground font-body">Entropy</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-display font-bold ${
              readings.entropy < 30 ? 'text-mesh-green' : 
              readings.entropy < 50 ? 'text-primary' : 'text-destructive'
            }`}>
              {readings.entropy.toFixed(0)}
            </span>
            <span className="text-xs text-muted-foreground">%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                readings.entropy < 30 ? 'bg-mesh-green' : 
                readings.entropy < 50 ? 'bg-primary' : 'bg-destructive'
              }`}
              style={{ width: `${readings.entropy}%` }}
            />
          </div>
        </div>
      </div>

      {/* Syntropic Status */}
      <div className={`p-3 rounded-lg ${
        readings.coherence >= 70 
          ? 'bg-mesh-green/10 border border-mesh-green/30' 
          : readings.coherence >= 50 
            ? 'bg-primary/10 border border-primary/30'
            : 'bg-destructive/10 border border-destructive/30'
      }`}>
        <p className={`text-xs font-body text-center ${
          readings.coherence >= 70 ? 'text-mesh-green' : 
          readings.coherence >= 50 ? 'text-primary' : 'text-destructive'
        }`}>
          {readings.coherence >= 70 
            ? '✨ Syntropic field stable — healing contagious'
            : readings.coherence >= 50
              ? '⚡ Field stabilizing — counter-waves active'
              : '⚠️ Entropy detected — amplifying coherence'}
        </p>
      </div>
    </div>
  );
};

export default BioSensorPanel;

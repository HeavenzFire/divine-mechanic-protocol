import { useState } from 'react';

interface FrequencyControlProps {
  frequency: number;
  intensity: number;
  onFrequencyChange: (freq: number) => void;
  onIntensityChange: (intensity: number) => void;
  isActive: boolean;
}

interface FrequencyPreset {
  name: string;
  freq: number;
  description: string;
  icon: string;
}

const PRESETS: FrequencyPreset[] = [
  { name: 'Love', freq: 528.144, description: 'DNA repair & heart opening', icon: '💜' },
  { name: 'Earth', freq: 432.0, description: 'Grounding & natural harmony', icon: '🌍' },
  { name: 'Awakening', freq: 777.0, description: 'Spiritual activation', icon: '✨' },
  { name: 'Delta', freq: 3.5, description: 'Deep healing sleep', icon: '🌙' },
  { name: 'Theta', freq: 7.83, description: 'Schumann resonance', icon: '🌀' },
  { name: 'Alpha', freq: 10.0, description: 'Relaxed awareness', icon: '🧘' },
];

const FrequencyControl = ({ 
  frequency, 
  intensity, 
  onFrequencyChange, 
  onIntensityChange,
  isActive 
}: FrequencyControlProps) => {
  const [customFreq, setCustomFreq] = useState(frequency.toString());

  const handleCustomChange = (value: string) => {
    setCustomFreq(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0 && num <= 1000) {
      onFrequencyChange(num);
    }
  };

  const activePreset = PRESETS.find(p => Math.abs(p.freq - frequency) < 0.1);

  return (
    <div className="glass-divine rounded-xl p-4 space-y-4">
      <h3 className="font-display text-sm text-foreground/80 tracking-wider uppercase">
        Frequency Control
      </h3>

      {/* Preset Grid */}
      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onFrequencyChange(preset.freq)}
            className={`p-2 rounded-lg text-center transition-all duration-300 ${
              activePreset?.name === preset.name
                ? 'bg-primary/20 border border-primary/50 box-glow-gold'
                : 'bg-muted/50 border border-border/50 hover:bg-muted hover:border-primary/30'
            }`}
          >
            <span className="text-lg block mb-1">{preset.icon}</span>
            <span className="text-xs font-display text-foreground/90 block">{preset.name}</span>
            <span className="text-[10px] text-muted-foreground font-mono">{preset.freq} Hz</span>
          </button>
        ))}
      </div>

      {/* Custom Frequency */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground font-body">Custom Frequency (Hz)</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={customFreq}
            onChange={(e) => handleCustomChange(e.target.value)}
            className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
            min="1"
            max="1000"
            step="0.001"
          />
          <button
            onClick={() => onFrequencyChange(parseFloat(customFreq))}
            className="px-4 py-2 bg-primary/20 border border-primary/50 rounded-lg text-xs font-display text-primary hover:bg-primary/30 transition-colors"
          >
            Set
          </button>
        </div>
      </div>

      {/* Intensity Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-muted-foreground font-body">Intensity</label>
          <span className="text-xs font-mono text-primary">{intensity}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={intensity}
          onChange={(e) => onIntensityChange(parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30 [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground font-body">
          <span>Gentle</span>
          <span>Standard</span>
          <span>Intense</span>
        </div>
      </div>

      {/* Active Preset Info */}
      {activePreset && (
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{activePreset.icon}</span>
            <span className="font-display text-sm text-primary">{activePreset.name} Frequency</span>
          </div>
          <p className="text-xs text-muted-foreground font-body">
            {activePreset.description}
          </p>
        </div>
      )}

      {/* Field Strength Indicator */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
        <span className="text-xs text-muted-foreground font-body">Field Strength</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary">
            {(intensity * 0.25).toFixed(1)} Gauss
          </span>
          <span className="text-[10px] text-muted-foreground">
            ({(intensity * 0.025).toFixed(2)} mT)
          </span>
        </div>
      </div>
    </div>
  );
};

export default FrequencyControl;

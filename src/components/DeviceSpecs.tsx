interface DeviceSpecsProps {
  isActive: boolean;
  frequency: number;
  intensity: number;
  nodesConnected: number;
}

const DeviceSpecs = ({ isActive, frequency, intensity, nodesConnected }: DeviceSpecsProps) => {
  const specs = [
    { label: 'Coil Design', value: '14-Point Pulsar', icon: '⭐' },
    { label: 'Field Radius', value: '8 ft (2.4m)', icon: '📡' },
    { label: 'Waveform', value: 'Trapezoidal', icon: '〰️' },
    { label: 'Power Mode', value: 'Syntropic Harvest', icon: '⚡' },
  ];

  return (
    <div className="glass-divine rounded-xl p-4">
      <h3 className="font-display text-sm text-foreground/80 tracking-wider uppercase mb-4">
        Device Specifications
      </h3>

      <div className="space-y-3">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">{spec.icon}</span>
              <span className="text-xs text-muted-foreground font-body">{spec.label}</span>
            </div>
            <span className="text-xs font-mono text-foreground">{spec.value}</span>
          </div>
        ))}

        <div className="border-t border-border/50 pt-3 mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-body">Status</span>
            <span className={`text-xs font-mono ${isActive ? 'text-mesh-green' : 'text-muted-foreground'}`}>
              {isActive ? 'Broadcasting' : 'Standby'}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-body">Active Frequency</span>
            <span className="text-xs font-mono text-primary">{frequency} Hz</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-body">Field Strength</span>
            <span className="text-xs font-mono text-primary">
              {(intensity * 0.25).toFixed(1)} Gauss
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-body">Mesh Nodes</span>
            <span className="text-xs font-mono text-divine-violet">{nodesConnected} synced</span>
          </div>
        </div>
      </div>

      {/* Energy Efficiency */}
      <div className="mt-4 p-3 rounded-lg bg-mesh-green/10 border border-mesh-green/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">♻️</span>
          <span className="text-xs font-display text-mesh-green">Zero-Waste Mode</span>
        </div>
        <p className="text-[10px] text-muted-foreground font-body">
          99% energy recycled • Drawing from Earth's field
        </p>
      </div>
    </div>
  );
};

export default DeviceSpecs;

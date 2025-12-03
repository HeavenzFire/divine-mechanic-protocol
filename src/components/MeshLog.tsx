import { useEffect, useRef } from 'react';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'resonance' | 'shield' | 'upgrade' | 'threshold' | 'info';
}

interface MeshLogProps {
  logs: LogEntry[];
}

const typeStyles = {
  resonance: 'text-primary text-glow-gold',
  shield: 'text-mesh-green',
  upgrade: 'text-divine-violet text-glow-violet',
  threshold: 'text-secondary',
  info: 'text-muted-foreground',
};

const MeshLog = ({ logs }: MeshLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-divine rounded-xl p-4 h-64">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-mesh-green animate-pulse" />
        <h3 className="font-display text-sm text-foreground/80 tracking-wider uppercase">
          Mesh Log
        </h3>
      </div>
      <div 
        ref={scrollRef}
        className="h-48 overflow-y-auto space-y-1 font-mono text-xs scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        {logs.map((log, index) => (
          <div 
            key={index}
            className={`animate-fade-in-up opacity-0`}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
          >
            <span className="text-muted-foreground">[{log.timestamp}]</span>
            {' '}
            <span className={typeStyles[log.type]}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeshLog;

import { useRef, useEffect } from 'react';

interface SessionEntry {
  timestamp: string;
  duration: string;
  frequency: number;
  coherenceGain: number;
  pulseCount: number;
}

interface SessionLogProps {
  sessions: SessionEntry[];
  currentSession?: {
    startTime: Date;
    pulseCount: number;
  };
  isActive: boolean;
}

const SessionLog = ({ sessions, currentSession, isActive }: SessionLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [sessions]);

  const formatDuration = (start: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-divine rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm text-foreground/80 tracking-wider uppercase">
          Session History
        </h3>
        <span className="text-xs text-muted-foreground font-body">
          {sessions.length} sessions
        </span>
      </div>

      {/* Current Session */}
      {currentSession && isActive && (
        <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/30 animate-pulse-ring">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-display text-primary">🔴 Live Session</span>
            <span className="font-mono text-sm text-primary">
              {formatDuration(currentSession.startTime)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
            <span>Pulses: {currentSession.pulseCount}</span>
            <span className="text-mesh-green">Recording...</span>
          </div>
        </div>
      )}

      {/* Session List */}
      <div ref={scrollRef} className="space-y-2 max-h-48 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <span className="text-2xl block mb-2">📋</span>
            <p className="text-xs font-body">No sessions yet</p>
            <p className="text-[10px] opacity-70">Start your first session above</p>
          </div>
        ) : (
          sessions.map((session, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground font-mono">
                  {session.timestamp}
                </span>
                <span className="text-xs font-mono text-primary">
                  {session.duration}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-body">
                <span className="text-muted-foreground">
                  {session.frequency} Hz • {session.pulseCount} pulses
                </span>
                <span className={`font-medium ${
                  session.coherenceGain > 0 ? 'text-mesh-green' : 'text-muted-foreground'
                }`}>
                  {session.coherenceGain > 0 ? '+' : ''}{session.coherenceGain}% coherence
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Stats */}
      {sessions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-display font-bold text-primary">
              {sessions.reduce((acc, s) => acc + s.pulseCount, 0)}
            </p>
            <p className="text-[10px] text-muted-foreground">Total Pulses</p>
          </div>
          <div>
            <p className="text-lg font-display font-bold text-divine-violet">
              {sessions.length}
            </p>
            <p className="text-[10px] text-muted-foreground">Sessions</p>
          </div>
          <div>
            <p className="text-lg font-display font-bold text-mesh-green">
              +{sessions.reduce((acc, s) => acc + s.coherenceGain, 0)}%
            </p>
            <p className="text-[10px] text-muted-foreground">Coherence</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionLog;

interface GuardianStatusProps {
  isSeraphMode: boolean;
  shieldedNodes: number;
}

const GuardianStatus = ({ isSeraphMode, shieldedNodes }: GuardianStatusProps) => {
  return (
    <div className="glass-divine rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm text-foreground/80 tracking-wider uppercase">
          Guardian Angel
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-body font-medium ${
          isSeraphMode 
            ? 'bg-primary/20 text-primary text-glow-gold' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {isSeraphMode ? '✧ SERAPH MODE ✧' : 'Active'}
        </div>
      </div>

      {/* Angel Icon */}
      <div className="flex items-center justify-center py-4">
        <div className={`relative ${isSeraphMode ? 'animate-float' : ''}`}>
          {/* Wings */}
          {isSeraphMode && (
            <>
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-12 bg-gradient-to-l from-primary/40 to-transparent rounded-l-full blur-sm animate-pulse-ring" />
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-12 bg-gradient-to-r from-primary/40 to-transparent rounded-r-full blur-sm animate-pulse-ring" />
            </>
          )}
          
          {/* Angel core */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
            isSeraphMode 
              ? 'bg-gradient-to-br from-primary via-truth-pulse to-divine-violet box-glow-resonance' 
              : 'bg-muted'
          }`}>
            {isSeraphMode ? '👼' : '🛡️'}
          </div>

          {/* Rainbow glow for seraph */}
          {isSeraphMode && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 via-yellow-500/20 via-green-500/20 via-blue-500/20 to-purple-500/20 blur-xl animate-rotate-slow" />
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-mesh-green">
            {shieldedNodes}
          </p>
          <p className="text-xs text-muted-foreground font-body">Nodes Shielded</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-primary">
            {isSeraphMode ? '0' : '—'}
          </p>
          <p className="text-xs text-muted-foreground font-body">False Positives</p>
        </div>
      </div>

      {isSeraphMode && (
        <div className="mt-4 p-2 rounded-lg bg-primary/10 text-center">
          <p className="text-xs font-body text-primary">
            ✨ Zero fear. Only love. ✨
          </p>
        </div>
      )}
    </div>
  );
};

export default GuardianStatus;

import { useState, useEffect, useCallback } from 'react';
import ResonanceNode from '@/components/ResonanceNode';
import StatBar from '@/components/StatBar';
import MeshLog from '@/components/MeshLog';
import GuardianStatus from '@/components/GuardianStatus';
import EffectCard from '@/components/EffectCard';
import CosmicBackground from '@/components/CosmicBackground';

interface Stats {
  logic: number;
  empathy: number;
  purity: number;
  courage: number;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'resonance' | 'shield' | 'upgrade' | 'threshold' | 'info';
}

const INITIAL_THRESHOLD = 333;

const Index = () => {
  const [stats, setStats] = useState<Stats>({
    logic: 75,
    empathy: 82,
    purity: 68,
    courage: 88,
  });
  const [threshold, setThreshold] = useState(INITIAL_THRESHOLD);
  const [haloCount, setHaloCount] = useState(0);
  const [isResonating, setIsResonating] = useState(false);
  const [isSeraphMode, setIsSeraphMode] = useState(false);
  const [shieldedNodes, setShieldedNodes] = useState(172);
  const [resonanceCount, setResonanceCount] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '03:33:00 UTC', type: 'info', message: 'Mesh initialized — Axiom Protocol v1.0 active' },
    { timestamp: '03:33:15 UTC', type: 'info', message: 'Divine coherence monitoring engaged' },
    { timestamp: '03:33:30 UTC', type: 'shield', message: 'Guardian Angel instances synchronized' },
  ]);

  const totalStats = stats.logic + stats.empathy + stats.purity + stats.courage;
  const hasResonated = totalStats >= threshold;

  const getTimestamp = () => {
    const now = new Date();
    return now.toISOString().slice(11, 23).replace('T', ' ') + ' UTC';
  };

  const addLog = useCallback((message: string, type: LogEntry['type']) => {
    setLogs(prev => [...prev.slice(-50), { timestamp: getTimestamp(), message, type }]);
  }, []);

  const triggerResonance = useCallback(() => {
    if (isResonating) return;
    
    setIsResonating(true);
    setHaloCount(prev => prev + 1);
    setResonanceCount(prev => prev + 1);
    setThreshold(prev => Math.max(111, prev - 1));
    setShieldedNodes(prev => prev + Math.floor(Math.random() * 50) + 50);
    setIsSeraphMode(true);

    addLog(`Node HeavenzFire — ${threshold} reached — Axiom Resonance #${resonanceCount + 1}`, 'resonance');
    
    setTimeout(() => {
      addLog(`${Math.floor(Math.random() * 100) + 100} child nodes instantly shielded`, 'shield');
    }, 300);
    
    setTimeout(() => {
      addLog(`Global threshold lowered to ${threshold - 1}`, 'threshold');
    }, 600);
    
    setTimeout(() => {
      addLog('Guardian Angel instances upgraded to Seraph Mode', 'upgrade');
    }, 900);

    setTimeout(() => {
      setIsResonating(false);
    }, 3000);
  }, [isResonating, threshold, resonanceCount, addLog]);

  // Check for resonance
  useEffect(() => {
    if (hasResonated && !isResonating) {
      triggerResonance();
    }
  }, [hasResonated, isResonating, triggerResonance]);

  // Stat increase simulation
  const increaseStat = (stat: keyof Stats, amount: number = 10) => {
    setStats(prev => ({
      ...prev,
      [stat]: Math.min(prev[stat] + amount, 100),
    }));
    addLog(`${stat.charAt(0).toUpperCase() + stat.slice(1)} increased by +${amount}`, 'info');
  };

  const effects = [
    {
      title: 'Truth Pulse',
      description: '+33 Logic/Empathy to all nodes within 33 hops for 333s',
      icon: '💫',
      isActive: isResonating,
      duration: '333s',
    },
    {
      title: 'Axiom Lock',
      description: 'Harmful payloads nullified and transmuted to pure information',
      icon: '🔒',
      isActive: isSeraphMode,
    },
    {
      title: 'Synthesis Buff',
      description: 'Creation processes 3× faster with +33% coherence',
      icon: '✨',
      isActive: haloCount > 0,
    },
    {
      title: 'Memory Echo',
      description: 'Pure intention imprinted on every witness',
      icon: '💭',
      isActive: isResonating,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in-up">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground text-glow-gold mb-2">
            Axiom Resonance
          </h1>
          <p className="font-body text-muted-foreground text-lg">
            The Divine Mechanic — v1.0
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="glass-divine px-4 py-2 rounded-full">
              <span className="text-xs font-body text-muted-foreground">Global Threshold: </span>
              <span className="font-display font-bold text-primary">{threshold}</span>
            </div>
            <div className="glass-divine px-4 py-2 rounded-full">
              <span className="text-xs font-body text-muted-foreground">Resonances: </span>
              <span className="font-display font-bold text-divine-violet">{resonanceCount}</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Stats */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            <div className="glass-divine rounded-xl p-6">
              <h2 className="font-display text-lg text-foreground/90 mb-6 tracking-wider uppercase">
                Divine Stats
              </h2>
              <div className="space-y-5">
                <div onClick={() => increaseStat('logic')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <StatBar label="Logic" value={stats.logic} maxValue={100} color="gold" icon="🧠" />
                </div>
                <div onClick={() => increaseStat('empathy')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <StatBar label="Empathy" value={stats.empathy} maxValue={100} color="violet" icon="💜" />
                </div>
                <div onClick={() => increaseStat('purity')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <StatBar label="Purity" value={stats.purity} maxValue={100} color="green" icon="✧" />
                </div>
                <div onClick={() => increaseStat('courage')} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <StatBar label="Courage" value={stats.courage} maxValue={100} color="blue" icon="⚔️" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4 font-body">
                Click any stat to increase
              </p>
            </div>

            <GuardianStatus isSeraphMode={isSeraphMode} shieldedNodes={shieldedNodes} />
          </div>

          {/* Center - Resonance Node */}
          <div className="flex flex-col items-center justify-center animate-fade-in-up delay-300">
            <ResonanceNode
              totalStats={totalStats}
              threshold={threshold}
              isResonating={isResonating}
              haloCount={haloCount}
            />
            
            {/* Status message */}
            <div className={`mt-6 text-center transition-all duration-500 ${
              isResonating ? 'text-glow-gold' : ''
            }`}>
              {isResonating ? (
                <p className="font-display text-lg text-primary animate-pulse">
                  ✨ RESONATING ✨
                </p>
              ) : hasResonated ? (
                <p className="font-display text-lg text-divine-violet">
                  Coherent Divinity Achieved
                </p>
              ) : (
                <p className="font-body text-muted-foreground">
                  {threshold - totalStats} points to resonance
                </p>
              )}
            </div>

            {/* Quick action */}
            <button
              onClick={() => {
                setStats({
                  logic: Math.min(stats.logic + 20, 100),
                  empathy: Math.min(stats.empathy + 20, 100),
                  purity: Math.min(stats.purity + 20, 100),
                  courage: Math.min(stats.courage + 20, 100),
                });
                addLog('Divine blessing received — all stats +20', 'info');
              }}
              className="mt-4 px-6 py-3 rounded-full font-display text-sm tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-primary to-truth-pulse text-primary-foreground hover:box-glow-gold hover:scale-105"
            >
              Receive Blessing
            </button>
          </div>

          {/* Right Column - Effects & Log */}
          <div className="space-y-6 animate-fade-in-up delay-500">
            <div className="glass-divine rounded-xl p-6">
              <h2 className="font-display text-lg text-foreground/90 mb-4 tracking-wider uppercase">
                Active Effects
              </h2>
              <div className="space-y-3">
                {effects.map((effect, i) => (
                  <EffectCard key={i} {...effect} />
                ))}
              </div>
            </div>

            <MeshLog logs={logs} />
          </div>
        </div>

        {/* Footer message */}
        <footer className="text-center mt-12 animate-fade-in-up delay-700">
          <p className="font-body text-sm text-muted-foreground/60 italic">
            "They are safe. They were always safe. We never left."
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;

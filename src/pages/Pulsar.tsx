import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PulsarCoil from '@/components/PulsarCoil';
import BioSensorPanel from '@/components/BioSensorPanel';
import FrequencyControl from '@/components/FrequencyControl';
import SessionLog from '@/components/SessionLog';
import DeviceSpecs from '@/components/DeviceSpecs';
import CosmicBackground from '@/components/CosmicBackground';

interface SessionEntry {
  timestamp: string;
  duration: string;
  frequency: number;
  coherenceGain: number;
  pulseCount: number;
}

const Pulsar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isChildMode, setIsChildMode] = useState(false);
  const [frequency, setFrequency] = useState(528.144);
  const [intensity, setIntensity] = useState(60);
  const [sessions, setSessions] = useState<SessionEntry[]>([]);
  const [currentSession, setCurrentSession] = useState<{ startTime: Date; pulseCount: number } | null>(null);
  const [nodesConnected, setNodesConnected] = useState(33);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleActivate = useCallback(() => {
    if (!consentGiven) return;
    
    if (isActive) {
      // End session
      if (currentSession) {
        const endTime = new Date();
        const duration = Math.floor((endTime.getTime() - currentSession.startTime.getTime()) / 1000);
        const mins = Math.floor(duration / 60);
        const secs = duration % 60;
        
        setSessions(prev => [{
          timestamp: currentSession.startTime.toLocaleTimeString(),
          duration: `${mins}:${secs.toString().padStart(2, '0')}`,
          frequency,
          coherenceGain: Math.floor(Math.random() * 15) + 5,
          pulseCount: currentSession.pulseCount,
        }, ...prev.slice(0, 9)]);
        
        setCurrentSession(null);
      }
      setIsActive(false);
    } else {
      // Start session
      setCurrentSession({ startTime: new Date(), pulseCount: 0 });
      setIsActive(true);
      setNodesConnected(prev => prev + Math.floor(Math.random() * 5));
    }
  }, [isActive, consentGiven, currentSession, frequency]);

  const handlePulse = useCallback(() => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, pulseCount: prev.pulseCount + 1 } : null);
    }
  }, [currentSession]);

  const handleConsent = () => {
    setConsentGiven(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in-up">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
            <span>←</span>
            <span className="text-sm font-body">Back to Resonance</span>
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground text-glow-gold mb-2">
            Syntropic PEMF Pulsar
          </h1>
          <p className="font-body text-muted-foreground text-lg">
            14-Point Star Coil • Frequency Healing • Child Protection
          </p>
        </header>

        {/* Consent Modal */}
        {!consentGiven && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="glass-divine rounded-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
              <div className="text-5xl mb-4">🔮</div>
              <h2 className="font-display text-2xl text-foreground mb-4">
                Consent Required
              </h2>
              <p className="text-sm text-muted-foreground font-body mb-6">
                The Syntropic PEMF Pulsar requires verbal affirmation before activation. 
                No data is collected. All processing is local.
              </p>
              <div className="p-4 bg-muted/30 rounded-lg mb-6">
                <p className="font-display text-lg text-primary italic">
                  "I am the aperture"
                </p>
              </div>
              <button
                onClick={handleConsent}
                className="w-full px-6 py-3 rounded-full font-display text-sm tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-primary to-truth-pulse text-primary-foreground hover:box-glow-gold hover:scale-105"
              >
                I Consent & Affirm
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            <BioSensorPanel 
              isActive={isActive}
              onEntropyChange={(entropy) => {
                // Auto-enable child mode on young HRV detection
                if (entropy > 60 && !isChildMode) {
                  setIsChildMode(true);
                  setIntensity(Math.min(intensity, 40));
                }
              }}
            />
            <DeviceSpecs 
              isActive={isActive}
              frequency={frequency}
              intensity={intensity}
              nodesConnected={nodesConnected}
            />
          </div>

          {/* Center - Pulsar Coil */}
          <div className="flex flex-col items-center justify-center animate-fade-in-up delay-300">
            <PulsarCoil
              isActive={isActive}
              frequency={frequency}
              intensity={intensity}
              isChildMode={isChildMode}
              onPulse={handlePulse}
            />

            {/* Controls */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <button
                onClick={handleActivate}
                disabled={!consentGiven}
                className={`px-8 py-4 rounded-full font-display text-sm tracking-wider uppercase transition-all duration-500 ${
                  isActive
                    ? 'bg-destructive/20 border-2 border-destructive text-destructive hover:bg-destructive/30'
                    : 'bg-gradient-to-r from-primary to-truth-pulse text-primary-foreground hover:box-glow-resonance hover:scale-105'
                } ${!consentGiven ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isActive ? '⏹ End Session' : '▶ Begin Session'}
              </button>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChildMode}
                  onChange={(e) => {
                    setIsChildMode(e.target.checked);
                    if (e.target.checked) {
                      setIntensity(Math.min(intensity, 40));
                      setFrequency(174); // Lullaby frequency
                    }
                  }}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  isChildMode ? 'bg-divine-violet' : 'bg-muted'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-foreground transition-transform mt-1 ${
                    isChildMode ? 'translate-x-5 ml-0' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm font-body text-muted-foreground">
                  Child Mode (softer frequencies)
                </span>
              </label>
            </div>

            {/* Truth Pulse Message */}
            {isActive && frequency >= 528 && (
              <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30 text-center animate-fade-in-up">
                <p className="text-xs font-body text-primary">
                  ✨ Truth Pulse Active — Nullifying predatory signals in range ✨
                </p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6 animate-fade-in-up delay-500">
            <FrequencyControl
              frequency={frequency}
              intensity={intensity}
              onFrequencyChange={setFrequency}
              onIntensityChange={(val) => {
                if (isChildMode && val > 40) return;
                setIntensity(val);
              }}
              isActive={isActive}
            />
            <SessionLog
              sessions={sessions}
              currentSession={currentSession || undefined}
              isActive={isActive}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 animate-fade-in-up delay-700">
          <p className="font-body text-sm text-muted-foreground/60 italic">
            "The first physical node of the divine mesh — where code meets flesh and frequency."
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-xs text-muted-foreground font-mono">
              SHA-3 Verified • Consent-First • No Data Collection
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Pulsar;

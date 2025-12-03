import { useMemo } from 'react';

const CosmicBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-cosmic-purple/10 to-background" />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-foreground animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}

      {/* Nebula effects */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-cosmic-purple/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full bg-divine-violet/3 blur-3xl" />
    </div>
  );
};

export default CosmicBackground;

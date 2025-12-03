interface EffectCardProps {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  duration?: string;
}

const EffectCard = ({ title, description, icon, isActive, duration }: EffectCardProps) => {
  return (
    <div className={`glass-divine rounded-lg p-3 transition-all duration-500 ${
      isActive ? 'border-primary/50 box-glow-gold' : 'opacity-50'
    }`}>
      <div className="flex items-start gap-3">
        <span className={`text-xl ${isActive ? 'animate-pulse-ring' : ''}`}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`font-display text-sm font-semibold truncate ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {title}
            </h4>
            {isActive && duration && (
              <span className="text-xs text-primary/80 font-mono shrink-0">
                {duration}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EffectCard;

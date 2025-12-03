interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: 'gold' | 'violet' | 'green' | 'blue';
  icon: string;
}

const colorMap = {
  gold: {
    bg: 'bg-primary/20',
    fill: 'bg-gradient-to-r from-primary to-truth-pulse',
    text: 'text-primary',
    glow: 'shadow-[0_0_20px_hsl(43_90%_55%_/_0.3)]',
  },
  violet: {
    bg: 'bg-divine-violet/20',
    fill: 'bg-gradient-to-r from-secondary to-divine-violet',
    text: 'text-divine-violet',
    glow: 'shadow-[0_0_20px_hsl(280_70%_70%_/_0.3)]',
  },
  green: {
    bg: 'bg-mesh-green/20',
    fill: 'bg-gradient-to-r from-mesh-green to-emerald-400',
    text: 'text-mesh-green',
    glow: 'shadow-[0_0_20px_hsl(150_60%_50%_/_0.3)]',
  },
  blue: {
    bg: 'bg-sky-500/20',
    fill: 'bg-gradient-to-r from-sky-500 to-cyan-400',
    text: 'text-sky-400',
    glow: 'shadow-[0_0_20px_hsl(200_80%_60%_/_0.3)]',
  },
};

const StatBar = ({ label, value, maxValue, color, icon }: StatBarProps) => {
  const colors = colorMap[color];
  const percentage = Math.min((value / maxValue) * 100, 100);
  const isMaxed = value >= maxValue;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className={`font-body text-sm font-medium ${colors.text}`}>
            {label}
          </span>
        </div>
        <span className={`font-display text-lg font-bold ${colors.text} ${isMaxed ? 'text-glow-gold' : ''}`}>
          {value}
        </span>
      </div>
      <div className={`h-2 rounded-full ${colors.bg} overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colors.fill} ${
            isMaxed ? colors.glow : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;

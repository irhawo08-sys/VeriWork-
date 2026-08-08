type ScoreRingProps = {
  score: number;
  label?: string;
  size?: number;
  trackColor?: string;
  ringColor?: string;
};

export default function ScoreRing({
  score,
  label,
  size = 88,
  trackColor = "#1B4332",
  ringColor = "#D4A017",
}: ScoreRingProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke={trackColor} strokeOpacity={0.12} strokeWidth={8} />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-lg font-semibold text-forest">{score}</span>
        {label && <span className="text-[10px] uppercase tracking-wide text-mist">{label}</span>}
      </div>
    </div>
  );
}

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
  const pct = Math.min(Math.max(score, 0), 100);
  const thickness = Math.max(6, Math.round(size * 0.09));

  return (
    <div
      className="relative inline-flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${ringColor} ${pct}%, ${trackColor}1F ${pct}%)`,
      }}
    >
      <div
        className="absolute inset-0 m-auto flex flex-col items-center justify-center rounded-full bg-white"
        style={{ width: size - thickness * 2, height: size - thickness * 2 }}
      >
        <span className="font-mono text-lg font-semibold text-forest">{score}</span>
        {label && <span className="text-[10px] uppercase tracking-wide text-mist">{label}</span>}
      </div>
    </div>
  );
}

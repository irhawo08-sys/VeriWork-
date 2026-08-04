type ScoreRingProps = {
  score: number;
  size?: number;
};

export default function ScoreRing({
  score,
  size = 100,
}: ScoreRingProps) {
  const radius = 40;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#166534"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform="rotate(-90 50 50)"
        />
      </svg>

      <span className="absolute text-lg font-bold">
        {score}%
      </span>
    </div>
  );
  }

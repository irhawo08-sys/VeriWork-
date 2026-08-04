type CompanyCardProps = {
  name: string;
  score: number;
  industry?: string;
};

export default function CompanyCard({
  name,
  score,
  industry,
}: CompanyCardProps) {
  const color =
    score >= 80
      ? "text-green-600"
      : score >= 60
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold">{name}</h3>

      {industry && (
        <p className="mt-1 text-sm text-gray-500">{industry}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-600">Overall Score</span>
        <span className={`text-2xl font-bold ${color}`}>
          {score}%
        </span>
      </div>
    </div>
  );
}

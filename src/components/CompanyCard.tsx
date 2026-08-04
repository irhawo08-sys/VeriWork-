import ScoreRing from "./ScoreRing";
import type { Company } from "@/lib/companies";

const statusStyles: Record<Company["status"], string> = {
  Verified: "bg-forest/10 text-forest",
  "In Progress": "bg-gold/15 text-gold-dark",
  "Not Yet Assessed": "bg-mist/10 text-mist",
};

export default function CompanyCard({ company }: { company: Company }) {
  const assessed = company.status !== "Not Yet Assessed";

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-forest">{company.name}</h3>
          <p className="mt-1 text-sm text-ink/60">
            {company.country} · {company.platformType}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[company.status]}`}>
          {company.status}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-6">
        {assessed ? (
          <>
            <ScoreRing score={company.assessmentScore} label="Assessment" size={72} />
            <ScoreRing score={company.workerVoiceScore} label="Worker Voice" size={72} ringColor="#2D6A4F" />
          </>
        ) : (
          <p className="text-sm italic text-ink/50">Assessment not yet completed</p>
        )}
      </div>
    </div>
  );
}

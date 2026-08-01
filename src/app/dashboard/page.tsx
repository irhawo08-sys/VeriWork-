import ScoreRing from "@/components/ScoreRing";
import { pillars } from "@/lib/pillars";
import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

const pillarProgress = pillars.map((p, i) => ({
  ...p,
  status: i < 4 ? "complete" : i === 4 ? "in-progress" : "not-started",
  score: i < 4 ? [88, 71, 65, 79][i] : null,
}));

const statusIcon = {
  complete: CheckCircle2,
  "in-progress": Clock3,
  "not-started": AlertCircle,
};

const statusLabel = {
  complete: "Complete",
  "in-progress": "In Progress",
  "not-started": "Not Started",
};

const statusColor = {
  complete: "text-forest",
  "in-progress": "text-gold-dark",
  "not-started": "text-mist",
};

export default function DashboardPage() {
  return (
    <>
      <section className="bg-beige">
        <div className="section">
          <p className="eyebrow">Company Dashboard · Preview</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">SwiftCourier Assessment Overview</h1>
          <p className="mt-4 max-w-2xl text-ink/70">
            A placeholder view of what a logged-in platform company sees. Full interactivity —
            editable submissions, evidence uploads, and review threads — is planned for a future
            release.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card items-center text-center">
            <ScoreRing score={82} label="Overall" size={100} />
            <p className="mt-3 text-sm font-medium text-forest">Assessment Score</p>
          </div>
          <div className="card items-center text-center">
            <ScoreRing score={74} label="Voice" size={100} ringColor="#2D6A4F" />
            <p className="mt-3 text-sm font-medium text-forest">Worker Voice Score</p>
          </div>
          <div className="card justify-center text-center">
            <p className="text-3xl font-semibold text-forest">Verified</p>
            <p className="mt-2 text-sm text-ink/60">Recognition status</p>
          </div>
          <div className="card justify-center text-center">
            <p className="text-3xl font-semibold text-forest">4 / 7</p>
            <p className="mt-2 text-sm text-ink/60">Pillars completed</p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl2 border border-forest/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-forest/5 text-xs uppercase tracking-wide text-mist">
              <tr>
                <th className="px-6 py-4 font-medium">Pillar</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {pillarProgress.map((p) => {
                const Icon = statusIcon[p.status as keyof typeof statusIcon];
                return (
                  <tr key={p.id} className="border-t border-forest/8">
                    <td className="px-6 py-4 font-medium text-forest">{p.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 ${statusColor[p.status as keyof typeof statusColor]}`}>
                        <Icon size={16} /> {statusLabel[p.status as keyof typeof statusLabel]}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-ink/70">{p.score ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

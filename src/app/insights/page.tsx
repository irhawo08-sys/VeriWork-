import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { sampleCompanies } from "@/lib/companies";
import { Wifi, WifiOff, Globe2, ShieldCheck, TrendingUp, Building2 } from "lucide-react";

type DirectoryRow = {
  id: string;
  name: string;
  country: string;
  platform_type: string;
  assessment_score: number | null;
  worker_voice_score: number | null;
  status: string;
};

async function getInsightsData() {
  if (!isSupabaseConfigured()) {
    return {
      live: false,
      rows: sampleCompanies.map((c) => ({
        id: c.id,
        name: c.name,
        country: c.country,
        platform_type: c.platformType,
        assessment_score: c.assessmentScore,
        worker_voice_score: c.workerVoiceScore,
        status:
          c.status === "Verified"
            ? "verified"
            : c.status === "In Progress"
            ? "in_progress"
            : "not_yet_assessed",
      })),
    };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("company_directory")
    .select("id, name, country, platform_type, assessment_score, worker_voice_score, status");

  if (error || !data) {
    return {
      live: false,
      rows: sampleCompanies.map((c) => ({
        id: c.id,
        name: c.name,
        country: c.country,
        platform_type: c.platformType,
        assessment_score: c.assessmentScore,
        worker_voice_score: c.workerVoiceScore,
        status:
          c.status === "Verified"
            ? "verified"
            : c.status === "In Progress"
            ? "in_progress"
            : "not_yet_assessed",
      })),
    };
  }

  return { live: true, rows: data as DirectoryRow[] };
}

function average(nums: number[]) {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export default async function InsightsPage() {
  const { live, rows } = await getInsightsData();

  const assessed = rows.filter((r) => r.status !== "not_yet_assessed");
  const avgAssessment = average(assessed.map((r) => r.assessment_score ?? 0));
  const avgWorkerVoice = average(assessed.map((r) => r.worker_voice_score ?? 0));
  const verifiedCount = rows.filter((r) => r.status === "verified").length;

  const countryMap = new Map<
    string,
    { country: string; count: number; assessmentScores: number[]; voiceScores: number[] }
  >();
  for (const r of rows) {
    const entry = countryMap.get(r.country) ?? {
      country: r.country,
      count: 0,
      assessmentScores: [],
      voiceScores: [],
    };
    entry.count += 1;
    if (r.status !== "not_yet_assessed") {
      entry.assessmentScores.push(r.assessment_score ?? 0);
      entry.voiceScores.push(r.worker_voice_score ?? 0);
    }
    countryMap.set(r.country, entry);
  }
  const byCountry = Array.from(countryMap.values()).sort((a, b) => b.count - a.count);

  const statusCounts = {
    verified: rows.filter((r) => r.status === "verified").length,
    in_progress: rows.filter((r) => r.status === "in_progress").length,
    not_yet_assessed: rows.filter((r) => r.status === "not_yet_assessed").length,
  };

  return (
    <>
      <section className="bg-beige">
        <div className="section">
          <div className="flex items-center gap-3">
            <p className="eyebrow">Insights</p>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                live ? "bg-forest/10 text-forest" : "bg-mist/10 text-mist"
              }`}
            >
              {live ? <Wifi size={11} /> : <WifiOff size={11} />}
              {live ? "Live data" : "Sample data"}
            </span>
          </div>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">
            Aggregate data for policy and research
          </h1>
          <p className="mt-4 max-w-xl text-ink/70">
            Cross-platform trends drawn from every VeriWork assessment, intended for
            policymakers, labour researchers, and journalists tracking decent work in the
            platform economy.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card items-center text-center">
            <Building2 className="text-forest" size={22} />
            <p className="mt-3 text-3xl font-semibold text-forest">{rows.length}</p>
            <p className="mt-1 text-sm text-ink/60">Platforms tracked</p>
          </div>
          <div className="card items-center text-center">
            <ShieldCheck className="text-forest" size={22} />
            <p className="mt-3 text-3xl font-semibold text-forest">{verifiedCount}</p>
            <p className="mt-1 text-sm text-ink/60">Verified platforms</p>
          </div>
          <div className="card items-center text-center">
            <TrendingUp className="text-forest" size={22} />
            <p className="mt-3 text-3xl font-semibold text-forest">{avgAssessment}</p>
            <p className="mt-1 text-sm text-ink/60">Average assessment score</p>
          </div>
          <div className="card items-center text-center">
            <Globe2 className="text-forest" size={22} />
            <p className="mt-3 text-3xl font-semibold text-forest">{avgWorkerVoice}</p>
            <p className="mt-1 text-sm text-ink/60">Average worker voice score</p>
          </div>
        </div>
      </section>

      <section className="bg-beige">
        <div className="section">
          <p className="eyebrow">Recognition status</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Where platforms stand</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl2 border border-forest/10 bg-white p-6">
              <p className="text-3xl font-semibold text-forest">{statusCounts.verified}</p>
              <p className="mt-1 text-sm text-ink/60">Verified</p>
            </div>
            <div className="rounded-xl2 border border-forest/10 bg-white p-6">
              <p className="text-3xl font-semibold text-gold-dark">{statusCounts.in_progress}</p>
              <p className="mt-1 text-sm text-ink/60">In progress</p>
            </div>
            <div className="rounded-xl2 border border-forest/10 bg-white p-6">
              <p className="text-3xl font-semibold text-mist">{statusCounts.not_yet_assessed}</p>
              <p className="mt-1 text-sm text-ink/60">Not yet assessed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">By country</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Platform coverage by country</h2>
        <div className="mt-8 overflow-x-auto rounded-xl2 border border-forest/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-forest/5 text-xs uppercase tracking-wide text-mist">
              <tr>
                <th className="px-6 py-4 font-medium">Country</th>
                <th className="px-6 py-4 font-medium">Platforms</th>
                <th className="px-6 py-4 font-medium">Avg. assessment score</th>
                <th className="px-6 py-4 font-medium">Avg. worker voice score</th>
              </tr>
            </thead>
            <tbody>
              {byCountry.map((c) => (
                <tr key={c.country} className="border-t border-forest/8">
                  <td className="px-6 py-4 font-medium text-forest">{c.country}</td>
                  <td className="px-6 py-4 font-mono text-ink/70">{c.count}</td>
                  <td className="px-6 py-4 font-mono text-ink/70">
                    {c.assessmentScores.length > 0 ? average(c.assessmentScores) : "—"}
                  </td>
                  <td className="px-6 py-4 font-mono text-ink/70">
                    {c.voiceScores.length > 0 ? average(c.voiceScores) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-ink/50">
          Averages are calculated only from platforms that have completed at least an initial
          assessment. Figures update automatically as new assessments and worker feedback come in.
        </p>
      </section>
    </>
  );
        }

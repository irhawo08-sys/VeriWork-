import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfiguredClient } from "@/lib/supabase/config";
import { sampleCompanies, type Company, type RecognitionStatus } from "@/lib/companies";

const statusMap: Record<string, RecognitionStatus> = {
  verified: "Verified",
  in_progress: "In Progress",
  not_yet_assessed: "Not Yet Assessed",
};

export async function fetchDirectory(): Promise<{ companies: Company[]; live: boolean }> {
  if (!isSupabaseConfiguredClient()) {
    return { companies: sampleCompanies, live: false };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("company_directory")
    .select("id, name, country, platform_type, assessment_score, worker_voice_score, status");

  if (error || !data) {
    return { companies: sampleCompanies, live: false };
  }

  const companies: Company[] = data.map((row) => ({
    id: row.id,
    name: row.name,
    country: row.country,
    platformType: row.platform_type,
    assessmentScore: row.assessment_score ?? 0,
    workerVoiceScore: row.worker_voice_score ?? 0,
    status: statusMap[row.status] ?? "Not Yet Assessed",
  }));

  return { companies, live: true };
          }

"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type FormState = { status: "idle" | "success" | "error"; message?: string };

export async function submitWorkerFeedback(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const platform = String(formData.get("platform") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const narrative = String(formData.get("narrative") || "").trim();

  if (!platform || !narrative) {
    return { status: "error", message: "Please fill in at least the platform name and your experience." };
  }

  if (!isSupabaseConfigured()) {
    return { status: "success", message: "Received (Supabase not yet connected, so this wasn't saved)." };
  }

  const supabase = createClient();

  const { data: existing } = await supabase
    .from("companies")
    .select("id")
    .ilike("name", platform)
    .maybeSingle();

  let companyId = existing?.id;

  if (!companyId) {
    const { data: created, error: createError } = await supabase
      .from("companies")
      .insert({ name: platform, country: country || "Unknown", platform_type: "Unspecified" })
      .select("id")
      .single();

    if (createError) {
      return { status: "error", message: "Something went wrong saving your feedback. Please try again." };
    }
    companyId = created.id;
  }

  const { error } = await supabase.from("worker_feedback").insert({
    company_id: companyId,
    country: country || null,
    narrative,
  });

  if (error) {
    return { status: "error", message: "Something went wrong saving your feedback. Please try again." };
  }

  return { status: "success", message: "Thank you — your anonymous feedback has been recorded." };
}

export async function submitContactMessage(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }

  if (!isSupabaseConfigured()) {
    return { status: "success", message: "Received (Supabase not yet connected, so this wasn't saved)." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert({ name, email, message });

  if (error) {
    return { status: "error", message: "Something went wrong sending your message. Please try again." };
  }

  return { status: "success", message: "Message sent — we'll get back to you soon." };
    }export type AssessmentFormState = { status: "idle" | "success" | "error"; message?: string };

export async function submitAssessment(
  _prevState: AssessmentFormState,
  formData: FormData
): Promise<AssessmentFormState> {
  const companyName = String(formData.get("companyName") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const platformType = String(formData.get("platformType") || "").trim();

  if (!companyName || !country || !platformType) {
    return { status: "error", message: "Please fill in your company name, country, and platform type." };
  }

  if (!isSupabaseConfigured()) {
    return { status: "success", message: "Received (Supabase not yet connected, so this wasn't saved)." };
  }

  const supabase = createClient();

  const pillarIds = [
    "employment-relationship",
    "fair-income",
    "working-conditions-safety",
    "social-protection",
    "equality-inclusion",
    "algorithmic-management",
    "worker-voice",
  ];

  const ratings: number[] = [];
  for (const id of pillarIds) {
    const value = Number(formData.get(`pillar-${id}`));
    if (!Number.isFinite(value) || value < 0 || value > 100) {
      return { status: "error", message: "Please provide a rating between 0 and 100 for every pillar." };
    }
    ratings.push(value);
  }

  const { data: existingCompany } = await supabase
    .from("companies")
    .select("id")
    .ilike("name", companyName)
    .maybeSingle();

  let companyId = existingCompany?.id;

  if (!companyId) {
    const { data: createdCompany, error: companyError } = await supabase
      .from("companies")
      .insert({ name: companyName, country, platform_type: platformType })
      .select("id")
      .single();

    if (companyError) {
      return { status: "error", message: "Something went wrong saving your company details. Please try again." };
    }
    companyId = createdCompany.id;
  }

  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .insert({ company_id: companyId, status: "submitted", submitted_at: new Date().toISOString() })
    .select("id")
    .single();

  if (assessmentError) {
    return { status: "error", message: "Something went wrong creating your assessment. Please try again." };
  }

  const pillarRows = pillarIds.map((id, i) => ({
    assessment_id: assessment.id,
    pillar_id: id,
    rating: ratings[i],
  }));

  const { error: responsesError } = await supabase.from("pillar_responses").insert(pillarRows);

  if (responsesError) {
    return { status: "error", message: "Your assessment was created, but saving the ratings failed. Please contact us." };
  }

  const overallScore = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);

  const { error: scoreError } = await supabase.from("scores").upsert(
    {
      company_id: companyId,
      assessment_score: overallScore,
      worker_voice_score: 0,
      status: "in_progress",
      computed_at: new Date().toISOString(),
    },
    { onConflict: "company_id" }
  );

  if (scoreError) {
    return { status: "success", message: "Assessment submitted! Your profile will appear in the directory shortly." };
  }

  return { status: "success", message: "Assessment submitted successfully! Your platform now has an 'In Progress' profile in the public directory." };
      }

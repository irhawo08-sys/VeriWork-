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
      }

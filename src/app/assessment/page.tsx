"use client";

import { useFormState, useFormStatus } from "react-dom";
import SectionHeading from "@/components/SectionHeading";
import { pillars } from "@/lib/pillars";
import { Clock, FileText, Users } from "lucide-react";
import { submitAssessment, type AssessmentFormState } from "@/app/actions";

const initialState: AssessmentFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-fit" disabled={pending}>
      {pending ? "Submitting…" : "Submit Assessment"}
    </button>
  );
}

export default function AssessmentPage() {
  const [state, formAction] = useFormState(submitAssessment, initialState);

  return (
    <>
      <section className="bg-beige">
        <div className="section grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Assessment</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Start your Decent Work Assessment</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              Rate your platform across seven pillars of decent work. Your submission creates a
              public "In Progress" profile immediately, which becomes "Verified" after review.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { icon: Clock, text: "Takes about 10 minutes to complete" },
              { icon: FileText, text: "Self-rated for now — evidence upload is coming soon" },
              { icon: Users, text: "Worker feedback is collected separately and anonymously" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-4 rounded-xl2 border border-forest/10 bg-white p-4">
                <item.icon className="shrink-0 text-forest" size={20} />
                <p className="text-sm text-ink/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

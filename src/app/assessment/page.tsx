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

      <section className="section max-w-3xl">
        <SectionHeading
          eyebrow="Your platform"
          title="Tell us about your company"
        />
        <form action={formAction} className="mt-8 flex flex-col gap-8">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="companyName" className="text-sm font-medium text-forest">Company name</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                placeholder="e.g. SwiftCourier"
                className="mt-2 w-full rounded-xl2 border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus-visible:outline-gold"
              />
            </div>
            <div>
              <label htmlFor="country" className="text-sm font-medium text-forest">Country</label>
              <input
                id="country"
                name="country"
                type="text"
                required
                placeholder="e.g. Nigeria"
                className="mt-2 w-full rounded-xl2 border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus-visible:outline-gold"
              />
            </div>
            <div>
              <label htmlFor="platformType" className="text-sm font-medium text-forest">Platform type</label>
              <input
                id="platformType"
                name="platformType"
                type="text"
                required
                placeholder="e.g. Delivery"
                className="mt-2 w-full rounded-xl2 border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus-visible:outline-gold"
              />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Self-rating"
              title="Rate your platform on each pillar (0–100)"
              description="Be honest — this is a starting point for improvement, not a pass/fail test."
            />
            <div className="mt-8 grid gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xs text-mist">{pillar.number}</p>
                      <h3 className="mt-1 text-base font-semibold text-forest">{pillar.title}</h3>
                    </div>
                    <input
                      type="number"
                      name={`pillar-${pillar.id}`}
                      min={0}
                      max={100}
                      required
                      defaultValue={50}
                      className="w-20 rounded-xl2 border border-forest/15 bg-white px-3 py-2 text-center text-sm outline-none focus-visible:outline-gold"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

          <SubmitButton />
          {state.status !== "idle" && (
            <p className={`text-sm ${state.status === "success" ? "text-forest" : "text-red-600"}`}>
              {state.status === "success" ? "✓ " : ""}
              {state.message}
            </p>
          )}
        </form>
      </section>
    </>
  );
              }

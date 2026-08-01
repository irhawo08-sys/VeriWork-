"use client";

import { useFormState, useFormStatus } from "react-dom";
import SectionHeading from "@/components/SectionHeading";
import { ShieldCheck, Eye, MessageCircle } from "lucide-react";
import { submitWorkerFeedback, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-fit" disabled={pending}>
      {pending ? "Submitting…" : "Submit Anonymously"}
    </button>
  );
}

export default function WorkerVoicePage() {
  const [state, formAction] = useFormState(submitWorkerFeedback, initialState);

  return (
    <>
      <section className="bg-beige">
        <div className="section">
          <p className="eyebrow">Worker Voice</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">
            Your experience is part of every score
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            Share anonymous feedback about the platform you work with. Your responses are combined
            with company evidence and reviewed independently before publication.
          </p>
        </div>
      </section>

      <section className="section grid gap-6 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Anonymous by design", text: "No personal identifying information is required or published." },
          { icon: Eye, title: "See before you sign up", text: "Browse transparency profiles for platforms before you start working with them." },
          { icon: MessageCircle, title: "Your voice, weighted", text: "Worker feedback directly affects the Worker Voice score published for every platform." },
        ].map((item) => (
          <div key={item.title} className="card">
            <item.icon className="text-forest" size={22} />
            <h3 className="mt-4 text-base font-semibold text-forest">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-beige">
        <div className="section max-w-2xl">
          <SectionHeading eyebrow="Share your experience" title="Tell us about your platform work" />
          <form action={formAction} className="mt-8 flex flex-col gap-5">
            <div>
              <label htmlFor="platform" className="text-sm font-medium text-forest">Which platform do you work with?</label>
              <input
                id="platform"
                name="platform"
                type="text"
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
                placeholder="e.g. Kenya"
                className="mt-2 w-full rounded-xl2 border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus-visible:outline-gold"
              />
            </div>
            <div>
              <label htmlFor="narrative" className="text-sm font-medium text-forest">Your experience</label>
              <textarea
                id="narrative"
                name="narrative"
                rows={5}
                placeholder="Tell us about pay, safety, communication, or anything else relevant to your work."
                className="mt-2 w-full rounded-xl2 border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus-visible:outline-gold"
              />
            </div>
            <SubmitButton />
            {state.status !== "idle" && (
              <p className={`text-sm ${state.status === "success" ? "text-forest" : "text-red-600"}`}>
                {state.status === "success" ? "✓ " : ""}
                {state.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

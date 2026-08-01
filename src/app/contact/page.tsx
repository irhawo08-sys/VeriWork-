"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Mail, Github, Instagram } from "lucide-react";
import { submitContactMessage, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-fit" disabled={pending}>
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactMessage, initialState);

  return (
    <section className="bg-beige">
      <div className="section grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Get in touch</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
            Questions about the framework, a company submission, or contributing to the open-source
            project — reach out.
          </p>
          <div className="mt-8 flex flex-col gap-4 text-sm">
            <a href="mailto:hello@veriwork.org" className="flex items-center gap-3 text-forest hover:text-forest-light">
              <Mail size={18} /> hello@veriwork.org
            </a>
            <a href="https://github.com" className="flex items-center gap-3 text-forest hover:text-forest-light">
              <Github size={18} /> github.com/veriwork
            </a>
            <a href="https://instagram.com/thebrancheshr" className="flex items-center gap-3 text-forest hover:text-forest-light">
              <Instagram size={18} /> @thebrancheshr
            </a>
          </div>
        </div>

        <form action={formAction} className="card flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-forest">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-2 w-full rounded-xl2 border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus-visible:outline-gold"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-forest">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-2 w-full rounded-xl2 border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus-visible:outline-gold"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-forest">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
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
  );
}

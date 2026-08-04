import SectionHeading from "@/components/SectionHeading";
import PillarCard from "@/components/PillarCard";
import { pillars } from "@/lib/pillars";
import { ArrowRight, Clock, FileText, Users } from "lucide-react";

export default function AssessmentPage() {
  return (
    <>
      <section className="bg-beige">
        <div className="section grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Assessment</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Start your Decent Work Assessment</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              Answer structured questions across seven pillars, upload supporting evidence, and
              invite worker feedback. Most companies complete the initial submission in one
              sitting.
            </p>
            <button className="btn-primary mt-8">
              Begin Assessment <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid gap-4">
            {[
              { icon: Clock, text: "Roughly 45–60 minutes to complete" },
              { icon: FileText, text: "Supporting documents can be uploaded as you go" },
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

      <section className="section">
        <SectionHeading
          eyebrow="What you'll be assessed on"
          title="Seven pillars, twenty-eight underlying criteria"
          description="Each pillar breaks down into specific, evidence-backed criteria so scores reflect concrete practices rather than general impressions."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </section>

      <section className="bg-forest">
        <div className="section flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-2xl font-semibold text-beige sm:text-3xl">
            Ready to see where your platform stands?
          </h2>
          <button className="btn-primary bg-gold text-forest hover:bg-gold-light">
            Begin Assessment
          </button>
        </div>
      </section>
    </>
  );
            }

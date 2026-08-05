import SectionHeading from "@/components/SectionHeading";
import { Target, ShieldCheck, Users2, ClipboardCheck, MessageSquareWarning, FileCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="bg-beige">
        <div className="section">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">
            A transparency initiative for the platform economy
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            VeriWork is an independent, open-source initiative by TheBranchesHR. It gives digital
            labour platforms a structured way to measure, improve, and demonstrate their
            commitment to decent work — and gives workers a direct channel to be heard.
          </p>
        </div>
      </section>

      <section className="section grid gap-8 sm:grid-cols-3">
        {[
          {
            icon: Target,
            title: "Our purpose",
            text: "Improve fairness, transparency, and accountability across digital labour platforms worldwide.",
          },
          {
            icon: ShieldCheck,
            title: "What we are not",
            text: "Not a legal certification, not a ranking site, and not anti-business — a tool for improvement.",
          },
          {
            icon: Users2,
            title: "Who it's for",
            text: "Platform companies, workers, researchers, policymakers, and labour organizations.",
          },
        ].map((item) => (
          <div key={item.title} className="card">
            <item.icon className="text-forest" size={24} />
            <h3 className="mt-4 text-lg font-semibold text-forest">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-beige">
        <div className="section grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Our approach"
            title="Grounded in international labour standards"
            description="The assessment framework draws on the ILO's Decent Work Agenda and adapts it to the realities of platform-mediated work, from algorithmic task allocation to non-standard pay structures."
          />
          <SectionHeading
            eyebrow="Our method"
            title="Evidence plus worker voice, not self-reporting alone"
            description="Every score combines a company's own submitted evidence with anonymous, independently collected feedback from workers on that platform, then goes through human review before publication."
          />
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="How We Verify"
          title="Self-assessment is a starting point, not a badge"
          description="A platform's own self-rating alone is never enough to earn Verified status. Here's how a profile actually moves from In Progress to Verified."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="card">
            <ClipboardCheck className="text-forest" size={22} />
            <h3 className="mt-4 text-base font-semibold text-forest">1. Self-assessment</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              A platform completes the seven-pillar assessment and appears immediately as "In
              Progress" — a self-reported starting point, clearly labelled as unverified.
            </p>
          </div>
          <div className="card">
            <MessageSquareWarning className="text-forest" size={22} />
            <h3 className="mt-4 text-base font-semibold text-forest">2. Worker corroboration</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Verified status requires a meaningful base of independent, anonymous worker
              feedback that reasonably supports the platform's self-reported scores — not just
              the platform's own word.
            </p>
          </div>
          <div className="card">
            <FileCheck className="text-forest" size={22} />
            <h3 className="mt-4 text-base font-semibold text-forest">3. Human review</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Every Verified status is granted manually after reviewing submitted evidence and
              worker feedback together — never automatically, and never from a self-rating alone.
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink/60">
          If worker feedback substantially contradicts a platform's self-assessment, that platform
          remains "In Progress" until the discrepancy is addressed. This is by design — VeriWork's
          credibility depends on Verified meaning something.
        </p>
      </section>
    </>
  );
}

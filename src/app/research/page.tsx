import SectionHeading from "@/components/SectionHeading";
import { FileText, ArrowUpRight } from "lucide-react";

const papers = [
  {
    title: "Platform Work and Decent Work Deficits in Sub-Saharan Africa",
    tag: "Literature Review",
    summary: "Maps where platform work in the region falls short of decent work principles and what drives those gaps.",
  },
  {
    title: "Scoring Methodology: From Criteria to a Public Score",
    tag: "Methodology",
    summary: "Explains how the seven-pillar framework's underlying criteria are weighted and combined into published scores.",
  },
  {
    title: "Algorithmic Management: A Transparency Checklist",
    tag: "Framework Note",
    summary: "A practical breakdown of what algorithmic transparency looks like in day-to-day platform operations.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <section className="bg-beige">
        <div className="section">
          <p className="eyebrow">Research Hub</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">
            The evidence behind the framework
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            Papers, methodology notes, and data underpinning VeriWork's approach to decent work in
            the platform economy.
          </p>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Publications" title="Latest research" />
        <div className="mt-10 grid gap-6">
          {papers.map((p) => (
            <div key={p.title} className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <FileText className="mt-1 shrink-0 text-forest" size={20} />
                <div>
                  <p className="eyebrow">{p.tag}</p>
                  <h3 className="mt-1 text-lg font-semibold text-forest">{p.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70">{p.summary}</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 self-start text-sm font-medium text-forest sm:self-center">
                Read more <ArrowUpRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
    }

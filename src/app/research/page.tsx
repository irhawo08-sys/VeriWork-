import { FileText, Download } from "lucide-react";

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
            Research underpinning VeriWork's approach to decent work in the platform economy.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 shrink-0 text-forest" size={22} />
            <div>
              <p className="eyebrow">Literature Review</p>
              <h2 className="mt-1 text-2xl font-semibold text-forest">
                Platform Work and Decent Work Deficits in Sub-Saharan Africa
              </h2>
              <p className="mt-1 text-sm text-ink/50">Uduehi Florence Anuoluwapo · Olabisi Onabanjo University · 2026</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-ink/70">
            This review examines whether platform work across Sub-Saharan Africa lives up to the
            ILO's Decent Work Agenda, drawing on ILO research and studies of the region's gig
            economy. Organized around five themes — employment opportunities, labour rights,
            social protection, algorithmic management, and worker voice — it finds that while
            platform work has opened income opportunities, especially for young people and women,
            it consistently falls short on job security, legal protection, social benefits, and
            collective representation. The review closes with recommendations for governments,
            the ILO, and platform companies to support the 2026 ILO Convention on Decent Work in
            the Platform Economy.
          </p>
          <a
            href="/research/New%20Revised%20Version%20Platform%20Work%20and%20Decent%20Work%20Deficits%20in%20Sub-Saharan%20Africa-.pdf"
            download
            className="btn-primary mt-2 w-fit"
          >
            <Download size={16} /> Download the full paper (PDF)
          </a>
        </div>
      </section>
    </>
  );
}

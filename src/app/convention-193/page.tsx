import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Users2, Landmark } from "lucide-react";

export default function Convention193Page() {
  return (
    <>
      <section className="bg-beige">
        <div className="section">
          <p className="eyebrow">ILO Convention 193</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">
            What the new ILO standard means for your company
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            In 2026, the ILO adopted the Convention on Decent Work in the Platform Economy —
            the first international labour standard written specifically for platforms like
            yours. Here's what that actually means, and why acting early matters.
          </p>
        </div>
      </section>

      <section className="section max-w-3xl">
        <h2 className="text-2xl font-semibold text-forest">How conventions actually work</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/70">
          A convention binds countries, not companies directly. On its own, it doesn't change
          your legal obligations today. But over time, countries that ratify it turn its
          provisions into national law, and once that happens, it does apply to companies
          operating there. Platforms that are already meeting the standard when that shift
          happens look prepared. Platforms that aren't are left catching up quickly, often
          under public and regulatory pressure.
        </p>
      </section>

      <section className="bg-beige">
        <div className="section">
          <h2 className="text-2xl font-semibold text-forest">Why get ahead of it now</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="card">
              <TrendingUp className="text-forest" size={22} />
              <h3 className="mt-4 text-base font-semibold text-forest">Investor and ESG signal</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Funders increasingly expect concrete labour and ESG credentials, not just
                promises. A verified profile is something real to point to.
              </p>
            </div>
            <div className="card">
              <Users2 className="text-forest" size={22} />
              <h3 className="mt-4 text-base font-semibold text-forest">Worker recruitment</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                In competitive labour markets, a visible fairness record helps attract and
                retain riders and drivers against unverified competitors.
              </p>
            </div>
            <div className="card">
              <Landmark className="text-forest" size={22} />
              <h3 className="mt-4 text-base font-semibold text-forest">Regulatory readiness</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Being ahead of national legislation, rather than reacting to it, gives you
                time to adapt on your own terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section max-w-3xl">
        <h2 className="text-2xl font-semibold text-forest">Beyond your company</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/70">
          There's very little real data today on how platform work in Sub-Saharan Africa
          actually measures up to international labour standards. As more platforms get
          assessed on VeriWork, that data becomes a genuine resource for researchers,
          governments, and labour organizations working to build informed policy, not just a
          signal for individual companies.
        </p>
      </section>

      <section className="bg-forest">
        <div className="section flex flex-col items-center gap-6 text-center">
          <ShieldCheck className="text-gold-light" size={28} />
          <h2 className="max-w-xl text-2xl font-semibold text-beige sm:text-3xl">
            See where your platform stands against the new standard
          </h2>
          <Link href="/assessment" className="btn-primary bg-gold text-forest hover:bg-gold-light">
            Start Assessment <ArrowRight size={16} className="ml-1 inline" />
          </Link>
        </div>
      </section>
    </>
  );
}

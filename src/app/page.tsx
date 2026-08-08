import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  HardHat,
  Umbrella,
  Cpu,
  MessagesSquare,
  Users,
  FileCheck2,
  ClipboardList,
  Upload,
  BadgeCheck,
  Search,
  Github,
  Code2,
  BookOpenText,
  Building2,
  Landmark,
  GraduationCap,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PillarCard from "@/components/PillarCard";
import CompanyCard from "@/components/CompanyCard";
import ScoreRing from "@/components/ScoreRing";
import { pillars } from "@/lib/pillars";
import { sampleCompanies } from "@/lib/companies";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const challenges = [
  { icon: Wallet, label: "Fair pay" },
  { icon: HardHat, label: "Worker safety" },
  { icon: Umbrella, label: "Social protection" },
  { icon: Cpu, label: "Transparent algorithms" },
  { icon: MessagesSquare, label: "Worker voice" },
  { icon: Users, label: "Equal opportunities" },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Complete a Decent Work Assessment",
    description: "The company works through the seven-pillar framework and answers structured, evidence-based questions.",
  },
  {
    icon: Upload,
    title: "Upload supporting evidence",
    description: "Policies, pay records, and process documentation back up each response for independent review.",
  },
  {
    icon: MessagesSquare,
    title: "Workers share anonymous feedback",
    description: "Workers on the platform contribute their own experience, weighted alongside the company's submission.",
  },
  {
    icon: BadgeCheck,
    title: "Verified recognition is awarded",
    description: "After review, the platform receives a transparency profile and, where warranted, verified recognition.",
  },
];

const contributors = [
  { icon: Code2, label: "Developers" },
  { icon: GraduationCap, label: "Researchers" },
  { icon: Users, label: "Workers" },
  { icon: Landmark, label: "Labour organizations" },
  { icon: FileCheck2, label: "Policymakers" },
  { icon: Building2, label: "Universities" },
];

async function getPreviewCompanies() {
  if (!isSupabaseConfigured()) return sampleCompanies.slice(0, 3);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("company_directory")
    .select("id, name, country, platform_type, assessment_score, worker_voice_score, status")
    .limit(3);

  if (error || !data || data.length === 0) return sampleCompanies.slice(0, 3);

  const statusMap: Record<string, "Verified" | "In Progress" | "Not Yet Assessed"> = {
    verified: "Verified",
    in_progress: "In Progress",
    not_yet_assessed: "Not Yet Assessed",
  };

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    country: row.country,
    platformType: row.platform_type,
    assessmentScore: row.assessment_score ?? 0,
    workerVoiceScore: row.worker_voice_score ?? 0,
    status: statusMap[row.status] ?? "Not Yet Assessed",
  }));
}

export default async function Home() {
  const previewCompanies = await getPreviewCompanies();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-beige">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow">An Open-Source Initiative by TheBranchesHR</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Building Fairer Digital Workplaces
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              VeriWork helps digital labour platforms assess, improve, and transparently
              demonstrate their alignment with decent work principles.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/assessment" className="btn-primary">
                Start Assessment <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn-secondary">
                Explore Framework
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
            <div className="absolute inset-0 rounded-full border-8 border-forest/15" />
            <div className="relative flex flex-col items-center gap-3 text-center">
              <ScoreRing score={78} label="Sample Score" size={140} />
              <p className="max-w-[10rem] text-xs text-ink/60">
                Every score reflects both company evidence and worker feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section grid gap-12 lg:grid-cols-[1fr_1fr]">
        <SectionHeading
          eyebrow="About VeriWork"
          title="An independent, open-source initiative — not a certifier or a ranking site"
          description="VeriWork is designed to improve fairness, transparency, and accountability in the platform economy through evidence-based assessment and worker participation."
        />
        <ul className="grid gap-4 self-start sm:grid-cols-2">
          {[
            { yes: false, text: "Not a legal certification" },
            { yes: false, text: "Not a company ranking website" },
            { yes: false, text: "Not anti-business" },
            { yes: true, text: "A transparency and improvement platform" },
          ].map((item) => (
            <li
              key={item.text}
              className={`rounded-xl2 border p-4 text-sm ${
                item.yes ? "border-forest/20 bg-forest/5 text-forest" : "border-forest/10 bg-white text-ink/60"
              }`}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      {/* Why It Matters */}
      <section className="bg-forest text-beige">
        <div className="section">
          <SectionHeading
            eyebrow="Why It Matters"
            title="Platform work has grown faster than the protections around it"
            description="Millions of workers now depend on digital platforms for income, often without the safeguards traditional employment provides."
            dark
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {challenges.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3 rounded-xl2 border border-beige/15 p-5 text-center">
                <c.icon size={22} className="text-gold-light" />
                <span className="text-xs text-beige/80">{c.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-beige/70">
            VeriWork addresses these gaps by giving platforms a structured way to measure their
            practices, giving workers a direct channel to be heard, and giving everyone else —
            researchers, regulators, and the public — a transparent view of progress.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <SectionHeading eyebrow="How It Works" title="Four steps from self-assessment to verified recognition" />
        <div className="relative mt-14 grid gap-8 md:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-forest/15 md:block" />
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-start gap-4">
              <span className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-forest bg-white text-forest">
                <step.icon size={26} strokeWidth={1.8} />
              </span>
              <p className="font-mono text-xs text-gold-dark">Step {i + 1}</p>
              <h3 className="text-base font-semibold text-forest">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink/65">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment Framework */}
      <section className="bg-beige">
        <div className="section">
          <SectionHeading
            eyebrow="Assessment Framework"
            title="Seven pillars of decent work"
            description="Every VeriWork assessment is structured around the same seven pillars, adapted from international labour standards."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* For Platform Companies / For Workers */}
      <section className="section grid gap-8 lg:grid-cols-2">
        <div className="card flex flex-col gap-5 bg-forest text-beige">
          <p className="eyebrow text-gold-light">For Platform Companies</p>
          <h3 className="text-2xl font-semibold text-beige">Measure your practices. Build worker trust.</h3>
          <ul className="space-y-2 text-sm text-beige/80">
            <li>Measure labour practices against a common framework</li>
            <li>Receive improvement recommendations</li>
            <li>Track progress over time</li>
            <li>Build trust with workers</li>
            <li>Demonstrate commitment to decent work</li>
          </ul>
          <Link href="/assessment" className="btn-primary mt-2 w-fit bg-gold text-forest hover:bg-gold-light">
            Assess Your Platform
          </Link>
        </div>

        <div className="card flex flex-col gap-5">
          <p className="eyebrow">For Workers</p>
          <h3 className="text-2xl font-semibold text-forest">Your experience shapes every score.</h3>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>Share anonymous feedback about your platform work</li>
            <li>View platform transparency profiles before you sign up</li>
            <li>Contribute to improving working conditions industry-wide</li>
          </ul>
          <Link href="/worker-voice" className="btn-secondary mt-2 w-fit">
            Share Your Experience
          </Link>
        </div>
      </section>

      {/* Public Directory Preview */}
      <section className="bg-beige">
        <div className="section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Public Directory"
              title="Transparency profiles for platforms worldwide"
              description="Search and filter assessed platforms by country, type, and score."
            />
            <Link href="/directory" className="btn-secondary shrink-0">
              View full directory <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-3 rounded-xl2 border border-forest/10 bg-white p-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-forest/15 px-4 py-2">
              <Search size={16} className="text-mist" />
              <span className="text-sm text-ink/40">Search companies…</span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="rounded-full bg-forest/8 px-3 py-2 text-forest">Country</span>
              <span className="rounded-full bg-forest/8 px-3 py-2 text-forest">Platform type</span>
              <span className="rounded-full bg-forest/8 px-3 py-2 text-forest">Status</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="section grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Open Source"
            title="Built in the open, for anyone to improve"
            description="VeriWork's framework, scoring logic, and codebase are open source. We welcome contributions from anyone working toward fairer platform work."
          />
          <a href="https://github.com" className="btn-primary mt-8 w-fit">
            <Github size={16} /> View on GitHub
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {contributors.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-3 rounded-xl2 border border-forest/10 p-5 text-center">
              <c.icon size={20} className="text-forest" />
              <span className="text-xs text-ink/70">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest">
        <div className="section flex flex-col items-center gap-8 text-center">
          <BookOpenText size={28} className="text-gold-light" />
          <h2 className="max-w-2xl text-3xl font-semibold text-beige sm:text-4xl">
            Join the Movement for Fairer Platform Work
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/assessment" className="btn-primary bg-gold text-forest hover:bg-gold-light">
              Start Assessment
            </Link>
            <Link href="/about" className="btn-secondary border-beige/30 text-beige hover:bg-beige/10">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

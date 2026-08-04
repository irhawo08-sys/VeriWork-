"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Wifi, WifiOff } from "lucide-react";
import CompanyCard from "@/components/CompanyCard";
import { fetchDirectory } from "@/lib/data/directory";
import type { Company, RecognitionStatus } from "@/lib/companies";

const statuses: (RecognitionStatus | "All statuses")[] = [
  "All statuses",
  "Verified",
  "In Progress",
  "Not Yet Assessed",
];

export default function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All statuses");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDirectory().then((result) => {
      setCompanies(result.companies);
      setLive(result.live);
      setLoading(false);
    });
  }, []);

  const results = useMemo(() => {
    return companies.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase()) ||
        c.platformType.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All statuses" || c.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status, companies]);

  return (
    <>
      <section className="bg-beige">
        <div className="section">
          <div className="flex items-center gap-3">
            <p className="eyebrow">Public Directory</p>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                live ? "bg-forest/10 text-forest" : "bg-mist/10 text-mist"
              }`}
            >
              {live ? <Wifi size={11} /> : <WifiOff size={11} />}
              {live ? "Live data" : "Sample data"}
            </span>
          </div>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">
            Transparency profiles for platforms worldwide
          </h1>
          <p className="mt-4 max-w-xl text-ink/70">
            Search by name, country, or platform type, and filter by recognition status.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="flex flex-col gap-3 rounded-xl2 border border-forest/10 bg-white p-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-forest/15 px-4 py-2">
            <Search size={16} className="text-mist" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies, countries, platform types…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                  status === s ? "bg-forest text-beige" : "bg-forest/8 text-forest hover:bg-forest/15"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="mt-10 text-sm text-ink/50">Loading directory…</p>
        ) : (
          <>
            <p className="mt-6 text-sm text-ink/50">
              {results.length} platform{results.length === 1 ? "" : "s"} found
            </p>

            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {results.length === 0 && (
              <p className="mt-10 rounded-xl2 border border-dashed border-forest/20 p-10 text-center text-sm text-ink/50">
                No platforms match your search yet.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
          }

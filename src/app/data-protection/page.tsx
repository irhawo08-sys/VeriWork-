export default function DataProtectionPage() {
  return (
    <section className="section max-w-3xl">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl font-semibold">Data Protection</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/70">
        <p>
          Data submitted to VeriWork is stored in an access-controlled database with row-level
          security, separating what is publicly visible (published scores and profiles) from what
          remains internal (raw worker feedback, review notes).
        </p>
        <p>
          Anonymous worker submissions are never linked back to an individual, and aggregated
          Worker Voice scores are only published once a minimum response threshold is met, to
          protect respondent anonymity.
        </p>
        <p>
          As an open-source project, VeriWork's schema and access-control policies are publicly
          auditable on GitHub, even though the underlying data itself is not.
        </p>
      </div>
    </section>
  );
}

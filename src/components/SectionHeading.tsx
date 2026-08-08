type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={dark ? "eyebrow text-gold-light" : "eyebrow"}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-semibold sm:text-4xl ${dark ? "text-beige" : ""}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-beige/80" : "text-ink/70"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

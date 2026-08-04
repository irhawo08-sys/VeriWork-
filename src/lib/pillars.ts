export type Pillar = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "briefcase" | "coins" | "shield" | "heart-handshake" | "scale" | "cpu" | "megaphone";
};

export const fallbackPillars: Pillar[] = [
  {
    id: "employment-relationship",
    number: "01",
    title: "Employment Relationship",
    description:
      "How clearly the platform defines its relationship with workers, including contract terms, classification, and mutual obligations.",
    icon: "briefcase",
  },
  {
    id: "fair-income",
    number: "02",
    title: "Fair Income",
    description:
      "Whether pay is transparent, predictable, and sufficient relative to hours worked, expenses, and local cost of living.",
    icon: "coins",
  },
  {
    id: "working-conditions-safety",
    number: "03",
    title: "Working Conditions & Safety",
    description:
      "Protections against excessive hours, physical and digital risk, and access to safety equipment or guidance.",
    icon: "shield",
  },
  {
    id: "social-protection",
    number: "04",
    title: "Social Protection",
    description:
      "Access to insurance, injury cover, sick leave provisions, and pathways to broader social security systems.",
    icon: "heart-handshake",
  },
  {
    id: "equality-inclusion",
    number: "05",
    title: "Equality & Inclusion",
    description:
      "Fair treatment across gender, disability, migration status, and other characteristics in access, pay, and opportunity.",
    icon: "scale",
  },
  {
    id: "algorithmic-management",
    number: "06",
    title: "Algorithmic Management",
    description:
      "Transparency in how algorithms assign work, set pay, evaluate performance, and enable human review of automated decisions.",
    icon: "cpu",
  },
  {
    id: "worker-voice",
    number: "07",
    title: "Worker Voice & Social Dialogue",
    description:
      "Channels for workers to raise concerns, organise, and participate in decisions that affect their work.",
    icon: "megaphone",
  },
];

// Alias so pages can simply `import { pillars }`.
export const pillars = fallbackPillars;

import {
  Briefcase,
  Coins,
  Shield,
  HeartHandshake,
  Scale,
  Cpu,
  Megaphone,
} from "lucide-react";
import type { Pillar } from "@/lib/pillars";

const icons = {
  briefcase: Briefcase,
  coins: Coins,
  shield: Shield,
  "heart-handshake": HeartHandshake,
  scale: Scale,
  cpu: Cpu,
  megaphone: Megaphone,
};

export default function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = icons[pillar.icon];

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/8 text-forest">
          <Icon size={20} strokeWidth={2} />
        </span>
        <span className="font-mono text-xs text-mist">{pillar.number}</span>
      </div>
      <h3 className="text-lg font-semibold text-forest">{pillar.title}</h3>
      <p className="text-sm leading-relaxed text-ink/70">{pillar.description}</p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Compass } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/assessment", label: "Assessment" },
  { href: "/directory", label: "Directory" },
  { href: "/worker-voice", label: "Worker Voice" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-beige/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-forest">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-gold">
            <Compass size={18} strokeWidth={2.2} />
          </span>
          VeriWork
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/assessment" className="btn-primary">
            Start Assessment
          </Link>
        </div>

        <button
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="text-forest" /> : <Menu className="text-forest" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-forest/10 bg-beige px-6 pb-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-3 text-sm font-medium text-ink/80 hover:bg-forest/5 hover:text-forest"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/assessment" className="btn-primary mt-3 w-full" onClick={() => setOpen(false)}>
            Start Assessment
          </Link>
        </nav>
      )}
    </header>
  );
              }

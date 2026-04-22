import Link from "next/link";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  tone?: "default" | "landing";
};

const toneClasses = {
  default: {
    base:
      "rounded-full px-3 py-2 text-sm font-medium outline-none transition-all duration-300 cubic-bezier(0.22, 1, 0.36, 1) hover:-translate-y-0.5 hover:bg-brand-petal hover:text-brand-red focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2",
    active: "bg-brand-petal text-brand-red shadow-[0_10px_22px_rgba(87,59,55,0.06)]",
    idle: "text-brand-ink/82"
  },
  landing: {
    base:
      "rounded-full border border-transparent px-4 py-2.5 text-sm font-medium outline-none transition-all duration-300 cubic-bezier(0.22, 1, 0.36, 1) hover:-translate-y-0.5 hover:border-brand-stone/70 hover:bg-[linear-gradient(180deg,rgba(247,237,239,0.92),rgba(239,216,221,0.84))] hover:text-brand-noir hover:shadow-[0_12px_24px_rgba(87,59,55,0.06)] focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/18 focus-visible:ring-offset-0",
    active:
      "border-brand-stone/76 bg-[linear-gradient(180deg,rgba(248,239,241,0.98),rgba(236,214,220,0.95))] text-brand-noir shadow-[0_14px_28px_rgba(87,59,55,0.08)] ring-1 ring-white/55",
    idle: "text-brand-ink/76"
  }
} as const;

export function NavLink({
  href,
  label,
  className,
  onClick,
  active = false,
  tone = "default"
}: NavLinkProps) {
  const palette = toneClasses[tone];

  return (
    <Link
      className={cn(
        palette.base,
        active ? palette.active : palette.idle,
        className
      )}
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

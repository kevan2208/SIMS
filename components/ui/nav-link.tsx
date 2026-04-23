import Link from "next/link";

import { navTabActiveClass, navTabBaseClass } from "@/components/ui/control-styles";
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
    base: `${navTabBaseClass} px-3 py-2 text-sm`,
    active: navTabActiveClass,
    idle: "text-brand-ink/82"
  },
  landing: {
    base: `${navTabBaseClass} border border-transparent px-4 py-2.5 text-sm`,
    active: navTabActiveClass,
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

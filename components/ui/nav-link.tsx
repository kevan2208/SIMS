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
    base: `${navTabBaseClass} relative px-3 py-2 text-sm after:absolute after:bottom-[0.35rem] after:left-1/2 after:h-[1.5px] after:w-[58%] after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-brand-red/75 after:transition-transform after:duration-300 after:ease-out`,
    active: `${navTabActiveClass} after:scale-x-100`,
    idle: "text-brand-ink/82 hover:after:scale-x-75"
  },
  landing: {
    base: `${navTabBaseClass} relative border border-transparent px-4 py-2.5 text-sm after:absolute after:bottom-[0.4rem] after:left-1/2 after:h-[1.5px] after:w-[56%] after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-brand-red/70 after:transition-transform after:duration-300 after:ease-out`,
    active: `${navTabActiveClass} after:scale-x-100`,
    idle: "text-brand-ink/76 hover:after:scale-x-75"
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

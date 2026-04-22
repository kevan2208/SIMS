import Link from "next/link";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
};

export function NavLink({ href, label, className, onClick, active = false }: NavLinkProps) {
  return (
    <Link
      className={cn(
        "rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-petal hover:text-brand-red",
        active
          ? "bg-brand-petal text-brand-red shadow-[0_10px_22px_rgba(87,59,55,0.06)]"
          : "text-brand-ink/82",
        className
      )}
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

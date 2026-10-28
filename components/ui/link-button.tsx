import Link from "next/link";

import { ActionIcon, type ActionIconName } from "@/components/ui/action-icon";
import { cn } from "@/lib/utils";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  icon?: ActionIconName;
  external?: boolean;
  download?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-sims-red text-white hover:bg-sims-deep",
  secondary: "border border-ink/25 text-ink hover:border-ink/60 hover:bg-sheet",
  quiet: "text-sims-red underline decoration-sims-red/30 underline-offset-4 hover:decoration-sims-red px-0"
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  icon,
  external,
  download,
  className
}: LinkButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-[0.95rem] font-semibold transition-colors duration-200",
    variants[variant],
    className
  );
  const content = (
    <>
      {icon ? <ActionIcon name={icon} /> : null}
      <span>{children}</span>
    </>
  );

  if (external || download || href.startsWith("tel:") || href.endsWith(".pdf")) {
    return (
      <a
        className={classes}
        download={download ? "" : undefined}
        href={href}
        rel={external ? "noreferrer" : undefined}
        target={external || href.endsWith(".pdf") ? "_blank" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}

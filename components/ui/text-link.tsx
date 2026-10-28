import Link from "next/link";

import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
};

/** Secondary actions are underlined text, so the booking card stays the one strong control on a page. */
export function TextLink({ href, children, className, external, download }: TextLinkProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold text-sims-red underline decoration-sims-red/35 decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-sims-red",
    className
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
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}

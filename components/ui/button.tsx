import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { ActionIcon, type ActionIconName, inferActionIcon } from "@/components/ui/action-icon";

import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  icon?: ActionIconName | "auto" | "none";
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

const variantClasses = {
  primary:
    "border border-[#7f2335] bg-brand-red text-brand-cream shadow-[0_16px_34px_rgba(117,31,53,0.16)] hover:-translate-y-1.5 hover:scale-[1.02] hover:border-brand-berry hover:bg-brand-berry hover:shadow-[0_24px_46px_rgba(117,31,53,0.22)] focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream",
  secondary:
    "border border-brand-stone/92 bg-brand-shell/98 text-brand-ink shadow-soft ring-1 ring-white/55 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-brand-berry/42 hover:bg-brand-rose hover:text-brand-noir hover:shadow-lift focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream",
  ghost:
    "border border-brand-stone/95 bg-brand-shell/88 text-brand-ink shadow-[0_10px_24px_rgba(87,59,55,0.05)] ring-1 ring-white/45 hover:-translate-y-1 hover:scale-[1.01] hover:border-brand-red/34 hover:bg-brand-petal hover:text-brand-noir hover:shadow-soft focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
};

const sizeClasses = {
  md: "min-h-12 px-5 py-3 text-sm sm:min-h-11",
  lg: "min-h-13 px-6 py-3.5 text-sm sm:min-h-12"
};

export function Button({
  children,
  className,
  icon = "auto",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const href = props.href ?? "#";
  const showExternalCue = props.target === "_blank";
  const showDownloadCue = "download" in props && Boolean(props.download);
  const isInternalRoute = href.startsWith("/") && !showExternalCue && !showDownloadCue;
  const iconName =
    icon === "none"
      ? null
      : icon === "auto"
        ? inferActionIcon({
            download: showDownloadCue,
            href
          })
        : icon;
  const sharedClassName = cn(
    "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium tracking-[0.01em] outline-none transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  const content = (
    <>
      {iconName ? (
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.06]",
            variant === "primary" ? "text-brand-cream" : "text-brand-red"
          )}
        >
          <ActionIcon name={iconName} />
        </span>
      ) : null}
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full border text-[0.85em] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          variant === "primary"
            ? "border-brand-cream/24 bg-brand-cream/12 text-brand-cream"
            : "border-brand-red/12 bg-brand-red/8 text-brand-red"
        )}
      >
        {showDownloadCue ? "↓" : showExternalCue ? "↗" : "→"}
      </span>
    </>
  );

  if (isInternalRoute) {
    const {
      href: _href,
      download: _download,
      rel: _rel,
      target: _target,
      ...linkProps
    } = props;

    return (
      <Link className={sharedClassName} href={href} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={sharedClassName}
      {...props}
    >
      {content}
    </a>
  );
}

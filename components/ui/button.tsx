import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { ActionIcon, type ActionIconName, inferActionIcon } from "@/components/ui/action-icon";
import {
  controlFocusClass,
  controlHoverClass,
  controlTransitionClass,
  ghostControlClass,
  primaryControlClass,
  secondaryControlClass
} from "@/components/ui/control-styles";

import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  icon?: ActionIconName | "auto" | "none";
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

const variantClasses = {
  primary: primaryControlClass,
  secondary: secondaryControlClass,
  ghost: ghostControlClass
};

const sizeClasses = {
  md: "min-h-11 px-5 py-3 text-sm font-semibold",
  lg: "min-h-12 px-6 py-3.5 text-sm font-semibold"
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
    "group inline-flex cursor-pointer items-center justify-center gap-2 font-medium tracking-[0.01em]",
    controlTransitionClass,
    controlHoverClass,
    controlFocusClass,
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
            "inline-flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.06] group-active:scale-[0.96]",
            variant === "ghost" ? "text-brand-red/88" : "text-brand-red"
          )}
        >
          <ActionIcon name={iconName} />
        </span>
      ) : null}
      <span>{children}</span>
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

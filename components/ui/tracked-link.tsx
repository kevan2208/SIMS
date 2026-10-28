"use client";

import { trackTap, type TapEvent } from "@/lib/track";

type TrackedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: TapEvent; label: string };

/** A normal link that also counts the tap. */
export function TrackedLink({ event, label, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackTap(event, label);
        onClick?.(e);
      }}
    />
  );
}

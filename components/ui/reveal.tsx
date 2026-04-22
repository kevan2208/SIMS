import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delayMs?: number;
};

export function Reveal({ children, className, delayMs = 0, ...props }: RevealProps) {
  return (
    <div
      className={cn(
        "motion-safe:animate-fadeUp motion-reduce:animate-none",
        className
      )}
      style={{ animationDelay: `${delayMs}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}

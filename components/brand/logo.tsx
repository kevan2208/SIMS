import { logoPaths } from "@/components/brand/logo-paths";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Hide the "Hair and Beauty" line, for small sizes where it would be unreadable. */
  compact?: boolean;
  title?: string;
};

/** The salon logo as vector paths, so it stays sharp at any size and loads instantly. */
export function Logo({ className, compact = false, title = "Sim's Hair and Beauty" }: LogoProps) {
  return (
    <svg
      aria-label={title}
      className={cn("block h-auto", className)}
      role="img"
      viewBox={compact ? "0 0 1000 660" : "0 0 1000 747"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={logoPaths.hair} fill="#1a1416" fillRule="evenodd" />
      <path d={logoPaths.script} fill="#af2830" fillRule="evenodd" />
      {compact ? null : <path d={logoPaths.tag} fill="#55494c" fillRule="evenodd" />}
    </svg>
  );
}

/** The frangipani from the logo, cropped out of the same artwork. */
export function Frangipani({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      height={size}
      viewBox="805 95 175 175"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={logoPaths.script} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

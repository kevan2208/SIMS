import { logoPaths } from "@/components/brand/logo-paths";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Hide the "Hair and Beauty" line, for small sizes where it would be unreadable. */
  compact?: boolean;
  /** Play the arrival animation (hair sweeps in, frangipani blooms). Use once, in the homepage hero. */
  intro?: boolean;
  title?: string;
};

// The frangipani sits in this box of the 1000 x 747 artwork; the rest of the red path is "Sim's" and the lips.
const FLOWER = { x: 805, y: 95, size: 175 };

/** The salon logo as vector paths, so it stays sharp at any size and loads instantly. */
export function Logo({ className, compact = false, intro = false, title = "Sim's Hair and Beauty" }: LogoProps) {
  const viewBox = compact ? "0 0 1000 660" : "0 0 1000 747";

  if (!intro) {
    return (
      <svg aria-label={title} className={cn("block h-auto", className)} role="img" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <path d={logoPaths.hair} fill="#1a1416" fillRule="evenodd" />
        <path d={logoPaths.script} fill="#af2830" fillRule="evenodd" />
        {compact ? null : <path d={logoPaths.tag} fill="#403a3c" fillRule="evenodd" />}
      </svg>
    );
  }

  return (
    <svg aria-label={title} className={cn("logo-intro block h-auto overflow-visible", className)} role="img" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="intro-flower-area">
          <rect height={FLOWER.size} width={FLOWER.size} x={FLOWER.x} y={FLOWER.y} />
        </clipPath>
        <mask id="intro-without-flower">
          <rect fill="#fff" height="747" width="1000" />
          <rect fill="#000" height={FLOWER.size} width={FLOWER.size} x={FLOWER.x} y={FLOWER.y} />
        </mask>
      </defs>
      <path className="logo-intro__hair" d={logoPaths.hair} fill="#1a1416" fillRule="evenodd" />
      <g mask="url(#intro-without-flower)">
        <path className="logo-intro__script" d={logoPaths.script} fill="#af2830" fillRule="evenodd" />
      </g>
      <g clipPath="url(#intro-flower-area)">
        <path className="logo-intro__flower" d={logoPaths.script} fill="#af2830" fillRule="evenodd" />
      </g>
      {compact ? null : <path className="logo-intro__tag" d={logoPaths.tag} fill="#403a3c" fillRule="evenodd" />}
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
      viewBox={`${FLOWER.x} ${FLOWER.y} ${FLOWER.size} ${FLOWER.size}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={logoPaths.script} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

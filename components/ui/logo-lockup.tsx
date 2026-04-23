import logoImage from "@/public/logo-sims-hair-beauty.png";

import { cn } from "@/lib/utils";

type LogoLockupProps = {
  variant?: "navbar" | "hero" | "footer";
  className?: string;
  priority?: boolean;
};

const variantClassNames = {
  navbar: "w-[10.5rem] sm:w-[12.5rem]",
  hero: "w-[16rem] sm:w-[19rem] lg:w-[24rem]",
  footer: "w-[8.75rem] sm:w-[10rem]"
};

export function LogoLockup({
  variant = "navbar",
  className,
  priority = false
}: LogoLockupProps) {
  void priority;

  return (
    <div className={cn("relative logo-protected", variantClassNames[variant], className)}>
      <span
        aria-label="Sim's Hair and Beauty logo"
        className="logo-rendered-mark logo-protected block w-full"
        draggable={false}
        role="img"
        style={{
          aspectRatio: `${logoImage.width} / ${logoImage.height}`,
          backgroundImage: `url(${logoImage.src})`
        }}
      />
    </div>
  );
}

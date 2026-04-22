import Image from "next/image";

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
  return (
    <div className={cn("relative", variantClassNames[variant], className)}>
      <Image
        alt="Sim's Hair and Beauty logo"
        className="h-auto w-full"
        priority={priority}
        src={logoImage}
      />
    </div>
  );
}

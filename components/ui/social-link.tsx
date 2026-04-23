import { ActionIcon, inferActionIcon } from "@/components/ui/action-icon";
import { controlPillClass } from "@/components/ui/control-styles";
import { cn } from "@/lib/utils";

type SocialLinkProps = {
  label: string;
  href: string;
};

export function SocialLink({ label, href }: SocialLinkProps) {
  const iconName = inferActionIcon({ href, label });

  return (
    <a
      className={cn("group inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-brand-ink", controlPillClass)}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {iconName ? (
        <span aria-hidden="true" className="inline-flex items-center justify-center text-brand-red">
          <ActionIcon name={iconName} />
        </span>
      ) : null}
      <span>{label}</span>
    </a>
  );
}

import { ActionIcon, inferActionIcon } from "@/components/ui/action-icon";

type SocialLinkProps = {
  label: string;
  href: string;
};

export function SocialLink({ label, href }: SocialLinkProps) {
  const iconName = inferActionIcon({ href, label });

  return (
    <a
      className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-brand-stone/85 bg-brand-shell/88 px-4 py-2 text-sm text-brand-ink shadow-[0_10px_22px_rgba(87,59,55,0.04)] ring-1 ring-white/45 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-red/48 hover:bg-brand-petal hover:text-brand-red hover:shadow-soft hover:ring-brand-red/12"
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
      <span
        aria-hidden="true"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-brand-red/12 bg-brand-red/10 text-[0.78rem] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}

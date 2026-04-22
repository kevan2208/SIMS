import { ActionIcon, inferActionIcon } from "@/components/ui/action-icon";

type InfoRowProps = {
  label: string;
  value: string;
  href?: string;
  note?: string;
};

export function InfoRow({ label, value, href, note }: InfoRowProps) {
  const isExternal = href?.startsWith("https://");
  const iconName = inferActionIcon({ href, label });

  const content = href ? (
    <a
      className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-stone/90 bg-brand-shell/88 px-4 py-2 text-brand-ink transition-all duration-300 cubic-bezier(0.22, 1, 0.36, 1) hover:-translate-y-0.5 hover:border-brand-red/45 hover:bg-brand-rose hover:text-brand-noir hover:shadow-soft focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 outline-none"
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {iconName ? (
        <span aria-hidden="true" className="inline-flex items-center justify-center text-brand-red">
          <ActionIcon name={iconName} />
        </span>
      ) : null}
      {value}
      <span
        aria-hidden="true"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-brand-red/12 bg-brand-red/8 text-[0.8rem] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  ) : (
    <span className="text-brand-ink">{value}</span>
  );

  return (
    <div className="flex flex-col gap-2 border-b border-brand-stone/70 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">{label}</p>
      <div className="max-w-sm space-y-1 text-sm leading-7">
        {content}
        {note ? <p className="text-brand-mist">{note}</p> : null}
      </div>
    </div>
  );
}

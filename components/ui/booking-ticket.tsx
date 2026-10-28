import { ActionIcon } from "@/components/ui/action-icon";
import { TrackedLink } from "@/components/ui/tracked-link";
import { siteConfig, whatsappLink } from "@/content/site";
import { strings, type Lang } from "@/content/strings";
import { cn } from "@/lib/utils";

/**
 * The main booking control, shaped like a salon appointment card:
 * WhatsApp on the card, a call option on the tear-off stub.
 */
export function BookingTicket({ className, id, lang }: { className?: string; id?: string; lang: Lang }) {
  const t = strings[lang];
  return (
    <div className={cn("ticket grid grid-cols-[minmax(0,1fr)_5.5rem] rounded-md bg-white text-ink", className)} id={id}>
      <TrackedLink
        className="group block py-4 pl-5 pr-3 transition-colors hover:bg-[#fff8fa]"
        event="whatsapp"
        href={whatsappLink(t.message.general)}
        label={id ?? "ticket"}
        rel="noreferrer"
        target="_blank"
      >
        <span className="flex items-center gap-1.5 text-[0.78rem] font-medium text-mauve">
          <ActionIcon className="h-3.5 w-3.5 text-sims-red" name="whatsapp" />
          {t.ticket.label}
        </span>
        <span className="mt-0.5 block text-balance font-display text-[1.32rem] leading-tight min-[400px]:text-[1.5rem] sm:text-[1.6rem]">
          {t.ticket.book}
        </span>
        <span className="mt-1 block text-[0.88rem] text-plum">{siteConfig.bookingWhatsappDisplay}</span>
      </TrackedLink>
      <TrackedLink
        className="flex flex-col items-center justify-center gap-1 border-l-[1.5px] border-dashed border-dash text-[0.88rem] font-semibold transition-colors hover:bg-[#fff8fa]"
        event="call"
        href={siteConfig.fixedLineHref}
        label={id ?? "ticket"}
      >
        <ActionIcon className="h-5 w-5" name="phone" />
        {t.ticket.call}
      </TrackedLink>
    </div>
  );
}

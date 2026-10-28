import { ActionIcon } from "@/components/ui/action-icon";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The main booking control, shaped like a salon appointment card:
 * WhatsApp on the card, a call option on the tear-off stub.
 */
export function BookingTicket({ className }: { className?: string }) {
  return (
    <div className={cn("ticket grid grid-cols-[1fr_5.5rem] rounded-md bg-white text-ink", className)}>
      <a
        className="group block py-4 pl-5 pr-3 transition-colors hover:bg-[#fff8fa]"
        href={siteConfig.bookingWhatsappHref}
        rel="noreferrer"
        target="_blank"
      >
        <span className="flex items-center gap-1.5 text-[0.78rem] font-medium text-mauve">
          <ActionIcon className="h-3.5 w-3.5 text-sims-red" name="whatsapp" />
          Appointments
        </span>
        <span className="mt-0.5 block whitespace-nowrap font-display text-[1.32rem] leading-tight min-[400px]:text-[1.5rem] sm:text-[1.6rem]">
          Book on WhatsApp
        </span>
        <span className="mt-1 block text-[0.88rem] text-plum">{siteConfig.bookingWhatsappDisplay}</span>
      </a>
      <a
        className="flex flex-col items-center justify-center gap-1 border-l-[1.5px] border-dashed border-dash text-[0.88rem] font-semibold transition-colors hover:bg-[#fff8fa]"
        href={siteConfig.fixedLineHref}
      >
        <ActionIcon className="h-5 w-5" name="phone" />
        Call
      </a>
    </div>
  );
}

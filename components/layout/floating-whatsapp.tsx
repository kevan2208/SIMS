import { ActionIcon } from "@/components/ui/action-icon";
import { siteConfig } from "@/content/site";

export function FloatingWhatsApp() {
  return (
    <a
      aria-label="Book with the salon on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-3 rounded-full border border-[#7f2335] bg-brand-red px-4 py-3 text-sm font-medium text-brand-cream shadow-lift transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-brand-berry hover:bg-brand-berry hover:shadow-[0_30px_70px_rgba(87,59,55,0.18),0_12px_30px_rgba(87,59,55,0.08)] sm:bottom-5 sm:right-5"
      href={siteConfig.bookingWhatsappHref}
      rel="noreferrer"
      target="_blank"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-cream/24 bg-brand-cream/12">
        <ActionIcon className="h-[0.95rem] w-[0.95rem] text-brand-cream" name="whatsapp" />
      </span>
      <span className="hidden sm:inline">Book on WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}

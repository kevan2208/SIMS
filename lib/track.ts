/**
 * Counts booking taps (WhatsApp, call, services added) so the salon can see what leads to bookings.
 * Fire-and-forget: it never delays the tap, and it does nothing if the stats database isn't set up.
 * Only the event, a label, and the page are sent; nothing about the visitor.
 */
export type TapEvent = "whatsapp" | "call" | "add" | "book-list" | "promo";

export function trackTap(event: TapEvent, label: string) {
  try {
    if (typeof window === "undefined") return;
    const body = JSON.stringify({ event, label: label.slice(0, 120), path: window.location.pathname });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/tap", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/tap", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true });
    }
  } catch {}
}

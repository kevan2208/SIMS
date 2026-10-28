const bookingMessage =
  "Hello Sim's Hair and Beauty, I would like to book an appointment. Could you please share your availability?";

const salonWhatsappNumber = "23057718511";
const fixedLineNumber = "2304138644";

export function whatsappLink(message: string) {
  return `https://wa.me/${salonWhatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const siteUrl = "https://simshairandbeauty.com";

export const siteConfig = {
  name: "Sim's Hair and Beauty",
  description: "Hair, facials, and nail care at Flacq Retail Park, Mauritius. Book on WhatsApp.",
  bookingWhatsappDisplay: "+230 5771 8511",
  bookingWhatsappHref: whatsappLink(bookingMessage),
  fixedLineDisplay: "+230 413 8644",
  fixedLineHref: `tel:+${fixedLineNumber}`,
  address: {
    street: "Flacq Retail Park",
    locality: "Flacq",
    postalCode: "40606",
    country: "Mauritius"
  },
  geo: { latitude: -20.2011771, longitude: 57.7206667 },
  directionsHref:
    "https://www.google.com/maps/place/Sim%E2%80%99s+Hair+%26+Beauty/@-20.2011771,57.7206667,17z/data=!3m1!4b1!4m6!3m5!1s0x217cf979683c37d1:0x5a17eb4cc4b3a807!8m2!3d-20.2011771!4d57.7206667!16s%2Fg%2F11fzf99wfw",
  mapEmbedSrc: "https://www.google.com/maps?q=-20.2011771,57.7206667&z=16&output=embed",
  // Generated from the price sheet on every refresh, so it always matches the website.
  priceListPdfPath: "/menu.pdf",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/simshairbeauty" },
    { label: "Facebook", href: "https://www.facebook.com/simshairandbeauty/" }
  ]
};

/**
 * Opening hours, used for the live "Open now" line and for Google's business data.
 * Days: 0 = Sunday … 6 = Saturday. Times are Mauritius time (UTC+4, no daylight saving).
 */
export const openingHours = {
  days: [1, 2, 3, 4, 5, 6],
  opens: "08:30",
  closes: "17:30"
};

/**
 * Photos for the homepage gallery. The section stays hidden until at least one photo is added.
 * Put files in /public/gallery and list them here, for example:
 * { src: "/gallery/salon-chairs.jpg", alt: "The styling chairs at Sim's" }
 */
export const galleryPhotos: Array<{ src: string; alt: string }> = [];

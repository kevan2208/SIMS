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
  // One PDF name that never changes: replace the file in /public when prices change.
  priceListPdfHref: "/sims-price-list.pdf",
  priceListPdfSize: "4.7 MB",
  paymentMethods: ["Cash", "Card", "Juice", "Apple Pay"],
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
  closes: "17:30",
  summary: "Monday to Saturday, 08:30 to 17:30. Closed Sunday."
};

/**
 * Photos for the homepage gallery. The section stays hidden until at least one photo is added.
 * Put files in /public/gallery and list them here, for example:
 * { src: "/gallery/salon-chairs.jpg", alt: "The styling chairs at Sim's" }
 */
export const galleryPhotos: Array<{ src: string; alt: string }> = [];

export const faqs: Array<{ question: string; answer: string }> = [
  {
    question: "Do I need to book?",
    answer:
      "We work mainly by appointment, so booking on WhatsApp is the surest way to get a time that suits you. Walk-ins are welcome when a stylist is free, but you may need to wait, depending on how busy the salon is."
  },
  {
    question: "How do I book?",
    answer:
      "Send a WhatsApp message to +230 5771 8511 with the service you'd like and a day that suits you. You can also call the salon on 413 8644."
  },
  {
    question: "Is there parking?",
    answer: "Yes. There's parking at Flacq Retail Park."
  },
  {
    question: "How can I pay?",
    answer: "Cash, card, Juice, and Apple Pay."
  },
  {
    question: "When are you open?",
    answer: "Monday to Saturday, 08:30 to 17:30. We're closed on Sundays."
  },
  {
    question: "Do you do weddings at home?",
    answer:
      "Yes. We offer bridal hair and makeup, hairstyling, saree draping, and lashes as a home service. See the wedding section of the price list, then message us on WhatsApp with your date."
  }
];

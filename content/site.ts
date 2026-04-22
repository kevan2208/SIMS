export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  price: string;
  description: string;
};

export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
  note?: string;
};

export type BusinessHour = {
  label: string;
  value: string;
};

export type ServiceCategory = {
  eyebrow: string;
  title: string;
  body: string;
};

export type HomePageLink = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
};

type PageIntro = {
  eyebrow: string;
  title: string;
  body: string;
};

const bookingMessage =
  "Hello Sim's Hair and Beauty, I would like to book an appointment. Could you please share your availability?";

const salonWhatsappNumber = "23057718511";

export const siteConfig = {
  name: "Sim's Hair and Beauty",
  description: "Hair, facials, and nail appointments in Mauritius. Book on WhatsApp.",
  location: "Mauritius",
  bookingWhatsappDisplay: "+230 5771 8511",
  bookingWhatsappHref: `https://wa.me/${salonWhatsappNumber}?text=${encodeURIComponent(bookingMessage)}`,
  bookingWhatsappLabel: "Book on WhatsApp",
  addressLines: [
    "Flacq Retail Park, Mauritius, 40606",
    "Use WhatsApp for directions, service advice, and booking help."
  ],
  directionsHref:
    "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=mu&sa=X&geocode=KdE3PGh5-XwhMQeos8RM6xda&daddr=Flacq+Retail+Park,+MU,+40606",
  mapEmbedHref:
    "https://www.google.com/maps?q=Flacq+Retail+Park,+Mauritius,+40606&output=embed",
  hours: [
    { label: "Monday to Saturday", value: "08:30 - 17:00" },
    { label: "Sunday", value: "Closed" }
  ] satisfies BusinessHour[],
  priceListHref: "/services#price-list",
  priceListPdfHref: "/sims-price-list-2025-original.pdf",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/simshairandbeauty/" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/simshairbeauty?igsh=Zjk0enU0dmpiZzRx"
    }
  ] as Array<{ label: string; href: string }>
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Landing Trial", href: "/landingPageTrial" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" }
];

export const heroContent = {
  eyebrow: "Sim's Hair and Beauty • Mauritius",
  title: "Hair, facials, and gel nails in one calm salon space.",
  body:
    "Sim's Hair and Beauty is a Mauritius salon for clients who want careful treatment, clear advice, and easy booking on WhatsApp.",
  bookingNote:
    "Send the service you want and the day that suits you best. Booking a few days ahead helps.",
  availabilityLabel: "WhatsApp bookings",
  hoursLabel: "Mon to Sat",
  tags: ["Hair repair", "Facials", "Gel nails"]
};

export const featuredServices: Service[] = [
  {
    title: "Absolute Repair Molecular Treatment",
    price: "Rs 2000",
    description: "For hair that feels dry, weakened, or overworked by colour and heat."
  },
  {
    title: "Metal Detox Treatment + Blowdry",
    price: "Rs 1000",
    description: "A clarifying treatment finished with a smooth blowdry and fresh shine."
  },
  {
    title: "Gel Manicure / Pedicure",
    price: "Rs 2500",
    description: "Glossy, longer-lasting nail care with a neat salon finish."
  },
  {
    title: "Gold Facial",
    price: "Rs 1200",
    description: "A facial for skin that needs brightness, softness, and a fresh glow."
  },
  {
    title: "Diamond Facial",
    price: "Rs 1200",
    description: "A brightening facial that leaves skin looking smoother and refreshed."
  }
];

export const serviceCategories: ServiceCategory[] = [
  {
    eyebrow: "Hair care",
    title: "Repair, detox, and smooth finishing.",
    body: "For hair that needs softness, strength, shine, or a cleaner finish before styling."
  },
  {
    eyebrow: "Skin care",
    title: "Facials that focus on brightness and freshness.",
    body: "For skin that needs brightness, freshness, and a calmer finish."
  },
  {
    eyebrow: "Nail care",
    title: "Neat gel finishing for hands and feet.",
    body: "For a manicure or pedicure that feels tidy, glossy, and ready to wear."
  }
];

export const promo = {
  eyebrow: "Signature treatment",
  title: "A good place to start when hair feels dry, tired, or harder to manage.",
  body:
    "The Absolute Repair Molecular Treatment is one of the services clients ask for most when hair needs softness, strength, and a smoother finish. It works especially well after colour, regular heat styling, or longer periods of dryness.",
  points: [
    "Hair that feels rough through the lengths",
    "Colour-treated hair that needs extra care",
    "Clients who want softness without heaviness"
  ]
};

export const contactDetails: ContactDetail[] = [
  {
    label: "WhatsApp booking",
    value: siteConfig.bookingWhatsappDisplay,
    href: siteConfig.bookingWhatsappHref,
    note: "Send the service you want and the day or time that suits you."
  },
  {
    label: "Location",
    value: siteConfig.addressLines[0],
    href: siteConfig.directionsHref,
    note: siteConfig.addressLines[1]
  }
];

export const contactGuidance = [
  "Send the service you want, or tell the salon what you need help with.",
  "Share the day or time that suits you best.",
  "The salon will reply with availability and the next step."
];

export const bookingContent = {
  eyebrow: "Book your appointment",
  title: "Ready to book? Send a WhatsApp message.",
  body:
    "Send the service you want and the day that suits you best. If you are still deciding, describe what you need and the salon will guide you.",
  primaryCta: {
    label: "Book on WhatsApp",
    href: siteConfig.bookingWhatsappHref
  },
  secondaryCta: {
    label: "Contact details",
    href: "/contact"
  }
};

export const homePageLinks: HomePageLink[] = [
  {
    eyebrow: "Services",
    title: "See services, pricing, and the full menu.",
    body: "Browse featured treatments first, then open the full price list below.",
    href: "/services",
    label: "Open services"
  },
  {
    eyebrow: "Contact",
    title: "Find booking details, hours, and directions.",
    body: "Use the contact page for hours, location details, and booking help.",
    href: "/contact",
    label: "Contact details"
  }
];

export const pageIntros: Record<"services" | "contact", PageIntro> = {
  services: {
    eyebrow: "Services & pricing",
    title: "A clear service menu with pricing.",
    body:
      "Browse the featured treatments first, then the full price list. If you are not sure what suits you, send a WhatsApp message and the salon will help."
  },
  contact: {
    eyebrow: "Contact",
    title: "Everything you need to book or ask a question.",
    body:
      "WhatsApp is the main contact route for appointments, pricing questions, and service guidance. Send a message and the salon will reply from there."
  }
};

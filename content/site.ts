export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  price: string;
  description: string;
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

export type PageIntro = {
  eyebrow: string;
  title: string;
  body: string;
};

export type CtaAction = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

export type CtaContent = {
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: CtaAction;
  secondaryCta: CtaAction;
};

export type VisitFact = {
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
  { label: "Services", href: "/services" }
];

export const landingHero = {
  eyebrow: "Sim's Hair and Beauty • Flacq, Mauritius",
  title: "Hair, facials, and nails in one calm salon space.",
  body: "Book on WhatsApp, browse the service menu, or open directions before your visit."
};

export const landingVisit = {
  eyebrow: "Visit & book",
  title: "Everything you need before your visit.",
  body: "Use WhatsApp to arrange your appointment, check the opening hours, and open directions before heading to the salon.",
  facts: [
    {
      eyebrow: "WhatsApp booking",
      title: siteConfig.bookingWhatsappDisplay,
      body: "Appointments and service questions are handled directly on WhatsApp."
    },
    {
      eyebrow: "Opening hours",
      title: "08:30 - 17:00",
      body: "Monday to Saturday. Sunday is closed."
    },
    {
      eyebrow: "Location",
      title: "Flacq Retail Park",
      body: "Mauritius, 40606. Open directions before you travel."
    }
  ] satisfies VisitFact[]
};

export const featuredServices: Service[] = [
  {
    title: "Absolute Repair Molecular Treatment",
    price: "Rs 2000",
    description: "Restore strength and softness to hair that feels dry, weakened, or overworked by colour and heat."
  },
  {
    title: "Metal Detox Treatment + Blowdry",
    price: "Rs 1000",
    description: "A detoxifying treatment and smooth blowdry for a cleaner feel, fresh shine, and easier styling."
  },
  {
    title: "Gel Manicure / Pedicure",
    price: "Rs 2500",
    description: "Glossy, longer-lasting nail colour with a neat salon finish for hands and feet."
  },
  {
    title: "Gold Facial",
    price: "Rs 1200",
    description: "A brightening facial that leaves skin softer, calmer, and noticeably more radiant."
  },
  {
    title: "Diamond Facial",
    price: "Rs 1200",
    description: "A smoothing treatment that refreshes texture and brings back a clear, polished glow."
  }
];

export const serviceCategories: ServiceCategory[] = [
  {
    eyebrow: "Hair care",
    title: "Repair, detox, colour, and smooth finishing.",
    body: "For hair that needs strength, maintenance, shine, or a cleaner finish before styling."
  },
  {
    eyebrow: "Skin care",
    title: "Facials for glow, comfort, and refreshed skin.",
    body: "For dull, tired, or stressed skin that needs brightness, softness, and a more even finish."
  },
  {
    eyebrow: "Nail care",
    title: "Gel manicures and pedicures with a lasting finish.",
    body: "For neat hands and feet with glossy colour that stays fresh for longer."
  }
];

export const promo = {
  eyebrow: "Signature treatment",
  title: "Transform dry, tired hair into soft, strong, manageable strands.",
  body:
    "The Absolute Repair Molecular Treatment is one of the most-requested services at Sim's. It helps rebuild stressed hair, soften the lengths, and leave a smoother finish that clients notice straight away.",
  points: [
    "Hair that feels rough or straw-like through the lengths",
    "Colour-treated or frequently heat-styled hair needing intensive care",
    "Anyone who wants noticeable softness without heaviness"
  ]
};

export const pageIntros: Record<"services", PageIntro> = {
  services: {
    eyebrow: "Services & pricing",
    title: "Services and pricing in one clear menu.",
    body:
      "Start with the main categories, skim the most-booked treatments, then browse the full price list below. If you are unsure what to book, send a WhatsApp message first."
  }
};

export const finalCtas: Record<"landing" | "services", CtaContent> = {
  landing: {
    eyebrow: "Book or visit",
    title: "Ready to book or head over?",
    body:
      "Message the salon on WhatsApp for appointments, or open directions before your visit to Flacq Retail Park.",
    primaryCta: {
      label: "Book on WhatsApp",
      href: siteConfig.bookingWhatsappHref,
      external: true
    },
    secondaryCta: {
      label: "Get directions",
      href: siteConfig.directionsHref,
      external: true
    }
  },
  services: {
    eyebrow: "Need help choosing?",
    title: "Not sure which treatment suits you best?",
    body:
      "Send a WhatsApp message for service advice, availability, or help choosing between treatments. You can also open the original PDF menu.",
    primaryCta: {
      label: "Book on WhatsApp",
      href: siteConfig.bookingWhatsappHref,
      external: true
    },
    secondaryCta: {
      label: "Open PDF",
      href: siteConfig.priceListPdfHref,
      external: true
    }
  }
};

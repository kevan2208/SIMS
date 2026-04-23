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
  action?: CtaAction;
};

const bookingMessage =
  "Hello Sim's Hair and Beauty, I would like to book an appointment. Could you please share your availability?";

const salonWhatsappNumber = "23057718511";
const fixedLineNumber = "2304138644";

export const siteConfig = {
  name: "Sim's Hair and Beauty",
  description: "Hair, facials, and nail care in Flacq, Mauritius. Book on WhatsApp.",
  location: "Mauritius",
  bookingWhatsappDisplay: "+230 5771 8511",
  bookingWhatsappHref: `https://wa.me/${salonWhatsappNumber}?text=${encodeURIComponent(bookingMessage)}`,
  bookingWhatsappLabel: "WhatsApp booking",
  fixedLineDisplay: "+230 413 8644",
  fixedLineHref: `tel:+${fixedLineNumber}`,
  addressLines: [
    "Flacq Retail Park, Mauritius, 40606",
    "Use WhatsApp for booking and use the salon fixed line for direct calls."
  ],
  directionsHref:
    "https://www.google.com/maps/place/Sim%E2%80%99s+Hair+%26+Beauty/@-20.2011771,57.7206667,17z/data=!3m1!4b1!4m6!3m5!1s0x217cf979683c37d1:0x5a17eb4cc4b3a807!8m2!3d-20.2011771!4d57.7206667!16s%2Fg%2F11fzf99wfw?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D",
  hours: [
    { label: "Monday to Saturday", value: "08:30 to 17:30" },
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
  body: "Appointments are usually arranged on WhatsApp. Browse the service menu and check directions before your visit.",
  trustNote: "Monday to Saturday, 08:30 to 17:30 • Flacq Retail Park"
};

export const landingVisit = {
  eyebrow: "Visit and book",
  title: "Plan your visit before you come in.",
  body: "Book on WhatsApp, check the opening hours, call the salon directly if needed, and open directions before you travel.",
  facts: [
    {
      eyebrow: "WhatsApp booking",
      title: siteConfig.bookingWhatsappDisplay,
      body: "Appointments and service questions are usually handled on WhatsApp.",
      action: {
        label: "Book on WhatsApp",
        href: siteConfig.bookingWhatsappHref,
        external: true
      }
    },
    {
      eyebrow: "Salon fixed line",
      title: siteConfig.fixedLineDisplay,
      body: "Use the fixed line when you want to call the salon directly.",
      action: {
        label: "Call fixed line",
        href: siteConfig.fixedLineHref
      }
    },
    {
      eyebrow: "Opening hours",
      title: "08:30 to 17:30",
      body: "Monday to Saturday. Sunday is closed."
    },
    {
      eyebrow: "Location",
      title: "Flacq Retail Park",
      body: "Mauritius, 40606. Open directions before you set off.",
      action: {
        label: "Get directions",
        href: siteConfig.directionsHref,
        external: true
      }
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
  title: "Absolute Repair Molecular Treatment",
  body:
    "Our signature repair service uses the L'Oreal Professionnel Absolut Repair Molecular protocol with Peptides Bonder and amino acids. It is suited to damaged, colour treated, or heat stressed hair that needs strength, softness, and movement without heaviness.",
  supportingNote:
    "This in salon protocol is designed for deeper repair and a smoother finish clients can feel from the first appointment.",
  productTitle: "L'Oreal Professionnel",
  productLabel: "Absolut Repair Molecular",
  productImage: "/products/absolut-repair-molecular-treatment.jpg",
  productRangeImage: "/products/absolut-repair-molecular-range.jpg",
  points: [
    "Hair that feels rough or straw like through the lengths",
    "Colour treated or frequently heat styled hair needing intensive care",
    "Clients who want softer, smoother lengths with natural movement"
  ]
};

export const pageIntros: Record<"services", PageIntro> = {
  services: {
    eyebrow: "Price list",
    title: "Services and pricing",
    body: "Browse the menu by category below, or open the original PDF if you need the full sheet."
  }
};

export const finalCtas: Record<"landing" | "services", CtaContent> = {
  landing: {
    eyebrow: "Before you come in",
    title: "Need directions before you head over?",
    body: "Open the route to Flacq Retail Park or call the salon fixed line before your visit.",
    primaryCta: {
      label: "Get directions",
      href: siteConfig.directionsHref,
      external: true
    },
    secondaryCta: {
      label: "Call fixed line",
      href: siteConfig.fixedLineHref
    }
  },
  services: {
    eyebrow: "Need help choosing",
    title: "Want help before you book?",
    body: "Send a WhatsApp message for service advice or call the salon directly.",
    primaryCta: {
      label: "Book on WhatsApp",
      href: siteConfig.bookingWhatsappHref,
      external: true
    },
    secondaryCta: {
      label: "Call fixed line",
      href: siteConfig.fixedLineHref
    }
  }
};

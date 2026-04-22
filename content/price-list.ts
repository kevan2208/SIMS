export type PriceListItem = {
  name: string;
  price: string;
};

export type PriceListCategory = {
  id: string;
  eyebrow: string;
  title: string;
  note?: string;
  items: PriceListItem[];
};

export type PriceListHighlight = {
  title: string;
  price: string;
  note: string;
  href: string;
};

export const priceListHighlights: PriceListHighlight[] = [
  {
    title: "Absolute Repair Molecular Treatment",
    price: "Rs 2000",
    note: "A popular choice when hair feels weakened, dry, or overworked.",
    href: "#hair-treatments"
  },
  {
    title: "Metal Detox Treatment + Blowdry",
    price: "Rs 1000",
    note: "Booked for a cleaner feel, smoother finish, and fresh shine.",
    href: "#hair-treatments"
  },
  {
    title: "Gel Manicure / Pedicure",
    price: "Rs 2500",
    note: "A regular favourite for neat, longer-lasting nail finishing.",
    href: "#hand-foot-care"
  },
  {
    title: "Gold Facial",
    price: "Rs 1200",
    note: "Chosen when skin needs brightness, softness, and a fresh glow.",
    href: "#facial-body-care"
  }
];

export const priceListCategories: PriceListCategory[] = [
  {
    id: "hair-care",
    eyebrow: "Hair care",
    title: "Washing, cutting, blowdry, and finishing.",
    note: "Hair prices can vary by length and styling time.",
    items: [
      { name: "Shampoo L'Oreal", price: "From Rs 300" },
      { name: "Shampoo normal", price: "From Rs 200" },
      { name: "Shampoo + Blowdry", price: "Rs 600 - 800" },
      { name: "Blowdry only", price: "Rs 500 - 700" },
      { name: "Blowdry + Steampod", price: "Rs 600 - 800" },
      { name: "Shampoo + Blowdry + Steampod", price: "Rs 700 - 900" },
      { name: "Shampoo + Haircut + Blowdry", price: "Rs 1000 - 1200" },
      { name: "Haircut only", price: "From Rs 500" },
      { name: "Shampoo + Haircut", price: "From Rs 700" },
      { name: "Men's haircut", price: "From Rs 250" },
      { name: "Men's haircut + Shampoo", price: "From Rs 400" },
      { name: "Men's haircut + Shampoo + Colour", price: "From Rs 800" },
      { name: "Men's Lissage Extenso", price: "From Rs 2000" },
      { name: "Child's haircut (0 - 5 years)", price: "From Rs 400" }
    ]
  },
  {
    id: "hair-colour",
    eyebrow: "Hair colour",
    title: "Roots, full colour, highlights, and toner services.",
    note: "Colour prices vary with product choice and hair length.",
    items: [
      { name: "Inoa roots only", price: "From Rs 1400" },
      { name: "Inoa roots + Blowdry", price: "From Rs 1800" },
      { name: "Majirel roots only", price: "From Rs 1300" },
      { name: "Majirel roots + Blowdry", price: "From Rs 1600" },
      { name: "Schwarzkopf (10 mins)", price: "From Rs 1300" },
      { name: "Application of own colour roots", price: "Rs 500" },
      { name: "Application of own colour full head", price: "Rs 700" },
      { name: "Full head colour - short", price: "Rs 2500" },
      { name: "Full head colour - medium", price: "Rs 3000" },
      { name: "Full head colour - long", price: "Rs 3500 - 6000" },
      { name: "Highlights - 1/2 head", price: "Rs 1500" },
      { name: "Highlights - 3/4 head", price: "Rs 2000" },
      { name: "Highlights - full head", price: "Rs 2500 - 3500" },
      { name: "Toner - normal", price: "Rs 1500 - 3500" },
      { name: "Toner - Dialight", price: "From Rs 200" },
      { name: "Rene Blanche - roots only", price: "From Rs 600" },
      { name: "Rene Blanche - full head", price: "From Rs 1500" }
    ]
  },
  {
    id: "hair-treatments",
    eyebrow: "Hair treatments",
    title: "Repair, smoothing, scalp care, and head massage.",
    items: [
      { name: "Organic protein Keratine", price: "From Rs 6000" },
      { name: "Lissage Brazilian Extenso", price: "From Rs 7000" },
      { name: "Protein de Soi (L'Oreal)", price: "From Rs 8000" },
      { name: "Metal Detox treatment", price: "Rs 600 - 800" },
      { name: "Pro Longer treatment", price: "Rs 600 - 800" },
      { name: "Dandruff and greasy hair treatment", price: "Rs 600" },
      { name: "Head massage (20 mins) with premium oil / hair loss prevention", price: "Rs 600" },
      { name: "Head massage (20 mins) with normal oil", price: "Rs 500" }
    ]
  },
  {
    id: "hand-foot-care",
    eyebrow: "Hand & foot care",
    title: "Classic manicure, pedicure, gel polish, and finishing.",
    items: [
      { name: "Manicure", price: "Rs 600" },
      { name: "Pedicure", price: "Rs 800" },
      { name: "Express pedicure", price: "Rs 600" },
      { name: "Jelly pedicure", price: "Rs 1000" },
      { name: "Jelly manicure", price: "Rs 700" },
      { name: "Cut and file + Nail polish", price: "Rs 300" },
      { name: "Cut and file only", price: "Rs 200" },
      { name: "Gel nail polish", price: "Rs 700" },
      { name: "Normal nail polish only", price: "Rs 200" },
      { name: "Remove gel polish", price: "Rs 300" }
    ]
  },
  {
    id: "threading",
    eyebrow: "Threading",
    title: "Quick shaping and facial threading essentials.",
    items: [
      { name: "Eyebrow shaping", price: "Rs 100" },
      { name: "Eyebrow clean-up", price: "Rs 75" },
      { name: "Upper lips", price: "Rs 75" },
      { name: "Chin", price: "Rs 100" },
      { name: "Full face", price: "Rs 400" }
    ]
  },
  {
    id: "waxing",
    eyebrow: "Waxing",
    title: "Face and body waxing services.",
    items: [
      { name: "Eyebrow", price: "Rs 150" },
      { name: "Upper lips", price: "Rs 150" },
      { name: "Chin", price: "From Rs 150" },
      { name: "Full face", price: "From Rs 500" },
      { name: "Underarms", price: "From Rs 300" },
      { name: "1/2 leg below knee", price: "Rs 500" },
      { name: "1/2 leg", price: "Rs 600" },
      { name: "3/4 leg", price: "Rs 700" },
      { name: "Full leg", price: "Rs 800" },
      { name: "Bikini", price: "Rs 1000" },
      { name: "Full arm", price: "Rs 600" },
      { name: "Bikini line", price: "Rs 600" },
      { name: "Men's full back", price: "Rs 800" },
      { name: "Men's full chest", price: "Rs 800" }
    ]
  },
  {
    id: "styling-makeup",
    eyebrow: "Hair styling & makeup",
    title: "Occasion styling, makeup, and finished looks.",
    items: [
      { name: "Light makeup", price: "Rs 800" },
      { name: "Heavy makeup", price: "Rs 1000" },
      { name: "Coiffure", price: "Rs 900" },
      { name: "French roll (coquille)", price: "Rs 600" },
      { name: "Curls only", price: "Rs 700" },
      { name: "Braid", price: "Rs 200 - 500" },
      { name: "Coiffure + Makeup + Fake lashes", price: "Rs 2000" }
    ]
  },
  {
    id: "wedding-home-service",
    eyebrow: "Wedding home service",
    title: "Bridal and home-service styling for special occasions.",
    items: [
      { name: "Coiffure", price: "Rs 1300" },
      { name: "Makeup", price: "Rs 1300" },
      { name: "Hairstyling + Makeup", price: "Rs 2500" },
      { name: "Bridal hair + Makeup", price: "Rs 8000" },
      { name: "Saree drapping", price: "Rs 300" },
      { name: "Fake lashes", price: "Rs 200" }
    ]
  },
  {
    id: "facial-body-care",
    eyebrow: "Facial & body care",
    title: "Facials, bleach, and back-care treatments.",
    items: [
      { name: "Anti Ageing", price: "Rs 1800" },
      { name: "Apaisant (Sensitive Skin)", price: "Rs 1700" },
      { name: "Acne", price: "Rs 1700" },
      { name: "Hydrating", price: "Rs 1700" },
      { name: "BIO", price: "Rs 1500" },
      { name: "Diamond", price: "Rs 1500" },
      { name: "Gold / Whitening", price: "Rs 1600" },
      { name: "Bleach face", price: "Rs 300" },
      { name: "Bleach back", price: "Rs 600" },
      { name: "Bleach hand", price: "Rs 600" },
      { name: "Back scrub", price: "Rs 500" },
      { name: "Back scrub with steam and massage", price: "Rs 1000" }
    ]
  },
  {
    id: "body-massage",
    eyebrow: "Body massage",
    title: "Massage services for relaxation and tension relief.",
    items: [
      { name: "Relaxing full body massage (60 mins)", price: "Rs 1400" },
      { name: "Back and shoulder massage (30 mins)", price: "Rs 700" },
      { name: "Leg massage (30 mins)", price: "Rs 700" },
      { name: "Reflexology (30 mins)", price: "Rs 700" },
      { name: "Head and shoulder massage (30 mins)", price: "Rs 700" }
    ]
  }
];

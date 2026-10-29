/**
 * Every piece of interface text, in English and French.
 * TO CHECK: the French was drafted by Claude; Kemino or Simi should read it through once before it goes live.
 */
export type Lang = "en" | "fr";

const en = {
  langName: "English",
  otherLangLabel: "FR",
  otherLangName: "Français",
  nav: { prices: "Prices", visit: "Visit", book: "Book", home: "home", main: "Main" },
  skip: "Skip to content",
  heroTitle: "Sim's Hair and Beauty, Flacq",
  heroLede: "Hair, facials and nails at Flacq Retail Park",
  ticket: { label: "Appointments", book: "Book on WhatsApp", call: "Call" },
  status: {
    openUntil: (t: string) => `Open now until ${t}`,
    closingSoon: (t: string) => `Open now, closing soon at ${t}`,
    opensToday: (t: string) => `Closed now, opens today at ${t}`,
    opensTomorrow: (t: string) => `Closed now, opens tomorrow at ${t}`,
    opensOn: (day: string, t: string) => `Closed now, opens ${day} at ${t}`,
    closed: "Closed",
    barOpen: (t: string) => `Open until ${t}`,
    barClosed: "Closed now",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  hoursSummary: "Monday to Saturday, 08:30 to 17:30. Closed Sunday.",
  promo: { label: "This month", until: (d: string) => `Until ${d}`, book: "Book this offer", viewPoster: "View the poster" },
  guide: {
    title: "Not sure what to book?",
    body: "Pick what sounds like you, and we'll recommend the right treatment when you message us.",
    add: "Add",
    added: "Added"
  },
  prices: {
    title: "Prices",
    body: "Some of our most booked services. Tap any to add it to your booking.",
    seeAll: "View the full menu",
    download: "Download the price list (PDF)",
    categories: "Price categories"
  },
  menu: {
    title: "Menu",
    metaTitle: "Prices and services",
    metaDescription:
      "Full price list for Sim's Hair and Beauty in Flacq, Mauritius: haircuts, colour, keratin and repair treatments, facials, waxing, threading, nails, massage, and wedding hair and makeup.",
    intro: "All prices in rupees. Where there's a range, the final price depends on hair length and time.",
    download: "Download the PDF",
    tapHint: "Tap the services you'd like, then send them to us on WhatsApp in one message.",
    sections: "Menu sections",
    ready: "Ready to book?"
  },
  row: {
    add: (name: string, price: string) => `Add ${name}, ${price}, to your booking`,
    remove: (name: string, price: string) => `Remove ${name}, ${price}, from your booking`
  },
  dock: {
    count: (n: number) => `${n} ${n === 1 ? "service" : "services"}`,
    clear: "Clear",
    book: "Book on WhatsApp",
    seeAll: "See all & edit",
    title: "Your booking",
    close: "Close your booking list",
    remove: (name: string) => `Remove ${name}`,
    estimated: "Estimated total",
    note: "The exact price depends on hair length and time; we'll confirm it on WhatsApp.",
    bookAll: "Book these on WhatsApp",
    clearAll: "Clear all"
  },
  message: {
    hello: "Hello Sim's Hair and Beauty, I'd like to book:",
    general: "Hello Sim's Hair and Beauty, I would like to book an appointment. Could you please share your availability?",
    availability: "Could you share your availability?",
    total: (price: string) => `Estimated total: ${price}`,
    promo: (title: string) => `Hello Sim's Hair and Beauty, I'd like to book this month's offer: ${title}. Could you share your availability?`
  },
  faqTitle: "Before you come in",
  faqs: [
    {
      question: "Do I need to book?",
      answer:
        "We work mainly by appointment, so booking on WhatsApp is the surest way to get a time that suits you. Walk-ins are welcome when a stylist is free, but you may need to wait, depending on how busy the salon is."
    },
    {
      question: "How do I book?",
      answer:
        "Pick the services you'd like on our price list and send them on WhatsApp in one message, or message +230 5771 8511 directly. You can also call the salon on 413 8644."
    },
    { question: "Is there parking?", answer: "Yes. There's parking at Flacq Retail Park." },
    { question: "How can I pay?", answer: "Cash, card, Juice, and Apple Pay." },
    { question: "When are you open?", answer: "Monday to Saturday, 08:30 to 17:30. We're closed on Sundays." },
    {
      question: "Do you do weddings at home?",
      answer:
        "Yes. We offer bridal hair and makeup, hairstyling, saree draping, and lashes as a home service. See the wedding section of the price list, then message us on WhatsApp with your date."
    }
  ],
  visit: {
    title: "Find us",
    where: "Where",
    whereText: (street: string, town: string) => `${street}, ${town}. Parking on site.`,
    when: "When",
    contact: "Contact",
    contactText: (wa: string, tel: string) => `WhatsApp ${wa}, salon ${tel}`,
    payment: "Payment",
    paymentMethods: ["Cash", "Card", "Juice", "Apple Pay"],
    reviews: "Read our Google reviews",
    mapTitle: "Map showing Sim's Hair and Beauty at Flacq Retail Park",
    inside: (street: string) => `Inside ${street}.`,
    openMaps: "Open in Google Maps"
  },
  gallery: { title: "Inside the salon", more: "More of our work on" },
  footer: { contact: "Contact", more: "More", salon: "Salon", fullList: "Full price list" },
  meta: {
    title: "Sim's Hair and Beauty | Hair, Facials and Nails in Flacq, Mauritius",
    description: "Hair, facials, and nail care at Flacq Retail Park, Mauritius. Book on WhatsApp."
  },
};

export type Strings = typeof en;

const fr: Strings = {
  langName: "Français",
  otherLangLabel: "EN",
  otherLangName: "English",
  nav: { prices: "Tarifs", visit: "Accès", book: "Réserver", home: "accueil", main: "Principal" },
  skip: "Aller au contenu",
  heroTitle: "Sim's Hair and Beauty, Flacq",
  heroLede: "Coiffure, soins du visage et ongles à Flacq Retail Park",
  ticket: { label: "Rendez-vous", book: "Réserver sur WhatsApp", call: "Appeler" },
  status: {
    openUntil: (t) => `Ouvert jusqu'à ${t}`,
    closingSoon: (t) => `Ouvert, ferme bientôt à ${t}`,
    opensToday: (t) => `Fermé, ouvre aujourd'hui à ${t}`,
    opensTomorrow: (t) => `Fermé, ouvre demain à ${t}`,
    opensOn: (day, t) => `Fermé, ouvre ${day} à ${t}`,
    closed: "Fermé",
    barOpen: (t) => `Ouvert jusqu'à ${t}`,
    barClosed: "Fermé",
    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
  },
  hoursSummary: "Du lundi au samedi, de 08h30 à 17h30. Fermé le dimanche.",
  promo: { label: "Ce mois-ci", until: (d) => `Jusqu'au ${d}`, book: "Réserver cette offre", viewPoster: "Voir l'affiche" },
  guide: {
    title: "Vous hésitez ?",
    body: "Choisissez ce qui vous ressemble, et nous vous conseillerons le bon soin quand vous nous écrirez.",
    add: "Ajouter",
    added: "Ajouté"
  },
  prices: {
    title: "Tarifs",
    body: "Quelques-unes de nos prestations les plus demandées. Touchez-en une pour l'ajouter à votre réservation.",
    seeAll: "Voir la carte complète",
    download: "Télécharger la carte des tarifs (PDF)",
    categories: "Catégories de tarifs"
  },
  menu: {
    title: "Carte",
    metaTitle: "Tarifs et prestations",
    metaDescription:
      "Tous les tarifs de Sim's Hair and Beauty à Flacq, Maurice : coupes, coloration, kératine et soins réparateurs, soins du visage, épilation, ongles, massages, coiffure et maquillage de mariée.",
    intro: "Tous les prix sont en roupies. Quand il y a une fourchette, le prix final dépend de la longueur des cheveux et du temps.",
    download: "Télécharger le PDF",
    tapHint: "Touchez les prestations qui vous intéressent, puis envoyez-les-nous sur WhatsApp en un seul message.",
    sections: "Sections de la carte",
    ready: "Envie de réserver ?"
  },
  row: {
    add: (name, price) => `Ajouter ${name}, ${price}, à votre réservation`,
    remove: (name, price) => `Retirer ${name}, ${price}, de votre réservation`
  },
  dock: {
    count: (n) => `${n} ${n === 1 ? "prestation" : "prestations"}`,
    clear: "Effacer",
    book: "Réserver sur WhatsApp",
    seeAll: "Voir et modifier",
    title: "Votre réservation",
    close: "Fermer votre liste de réservation",
    remove: (name) => `Retirer ${name}`,
    estimated: "Total estimé",
    note: "Le prix exact dépend de la longueur des cheveux et du temps ; nous vous le confirmerons sur WhatsApp.",
    bookAll: "Réserver sur WhatsApp",
    clearAll: "Tout effacer"
  },
  message: {
    hello: "Bonjour Sim's Hair and Beauty, je souhaite réserver :",
    general: "Bonjour Sim's Hair and Beauty, je souhaite prendre rendez-vous. Pourriez-vous me donner vos disponibilités ?",
    availability: "Pourriez-vous me donner vos disponibilités ?",
    total: (price) => `Total estimé : ${price}`,
    promo: (title) => `Bonjour Sim's Hair and Beauty, je souhaite réserver l'offre du mois : ${title}. Pourriez-vous me donner vos disponibilités ?`
  },
  faqTitle: "Avant votre visite",
  faqs: [
    {
      question: "Faut-il réserver ?",
      answer:
        "Nous travaillons surtout sur rendez-vous : réserver sur WhatsApp est le meilleur moyen d'avoir l'heure qui vous convient. Sans rendez-vous, nous vous accueillons si quelqu’un est disponible, mais l'attente peut être plus longue selon l'affluence."
    },
    {
      question: "Comment réserver ?",
      answer:
        "Choisissez vos prestations sur notre carte et envoyez-les sur WhatsApp en un seul message, ou écrivez directement au +230 5771 8511. Vous pouvez aussi appeler le salon au 413 8644."
    },
    { question: "Y a-t-il un parking ?", answer: "Oui, il y a un parking à Flacq Retail Park." },
    { question: "Quels moyens de paiement ?", answer: "Cash, carte, Juice et Apple Pay." },
    { question: "Quels sont vos horaires ?", answer: "Du lundi au samedi, de 08h30 à 17h30. Fermé le dimanche." },
    {
      question: "Vous déplacez-vous pour les mariages ?",
      answer:
        "Oui. Nous proposons coiffure et maquillage de mariée, coiffure, drapé de sari et faux cils à domicile. Consultez la section mariage de la carte, puis écrivez-nous sur WhatsApp avec votre date."
    }
  ],
  visit: {
    title: "Nous trouver",
    where: "Adresse",
    whereText: (street, town) => `${street}, ${town}. Parking sur place.`,
    when: "Horaires",
    contact: "Contact",
    contactText: (wa, tel) => `WhatsApp ${wa}, salon ${tel}`,
    payment: "Paiement",
    paymentMethods: ["Cash", "Carte", "Juice", "Apple Pay"],
    reviews: "Lire nos avis Google",
    mapTitle: "Carte indiquant Sim's Hair and Beauty à Flacq Retail Park",
    inside: (street) => `À ${street}.`,
    openMaps: "Ouvrir dans Google Maps"
  },
  gallery: { title: "Le salon", more: "Plus de réalisations sur" },
  footer: { contact: "Contact", more: "Plus", salon: "Salon", fullList: "Tous les tarifs" },
  meta: {
    title: "Sim's Hair and Beauty | Coiffure, soins du visage et ongles à Flacq, Maurice",
    description: "Coiffure, soins du visage et ongles à Flacq Retail Park, Maurice. Réservez sur WhatsApp."
  },
};

export const strings: Record<Lang, Strings> = { en, fr };

/** The same page in the other language. */
export function switchLangPath(path: string, to: Lang) {
  const bare = path.replace(/^\/fr(?=\/|$)/, "") || "/";
  return to === "fr" ? (bare === "/" ? "/fr" : `/fr${bare}`) : bare;
}

export function localePath(lang: Lang, path: string) {
  return lang === "fr" ? (path === "/" ? "/fr" : `/fr${path}`) : path;
}

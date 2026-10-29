import "server-only";
import { displayPrice } from "@/lib/price";

import snapshot from "@/content/snapshot.json";
import type { Lang } from "@/content/strings";
import { strings } from "@/content/strings";

/**
 * Salon content (prices, treatment guide, monthly promo) comes from the "Sim's website content"
 * Google Sheet when SIMS_SHEET_ID is set, refreshed every few minutes. If the sheet is missing,
 * unreachable, or malformed, the site uses content/snapshot.json, so it never breaks.
 */
export const REFRESH_SECONDS = 300;

type PriceRow = {
  categoryId: string;
  category: string;
  categoryFr: string;
  note: string;
  noteFr: string;
  name: string;
  nameFr: string;
  price: string;
  home: string;
};
type GuideRow = { concern: string; concernFr: string; service: string };
type PromoRow = {
  title: string;
  titleFr: string;
  details: string;
  detailsFr: string;
  price: string;
  starts: string;
  ends: string;
  poster: string;
};
type Raw = { prices: PriceRow[]; guide: GuideRow[]; promos: PromoRow[] };

export type Service = {
  /** Stable key for the booking list. */
  id: string;
  name: string;
  /** Name used in the WhatsApp message; adds the category when the same name exists in two places. */
  bookingName: string;
  /** Category name, shown under the service in the open booking list. */
  category: string;
  price: string;
};
export type Category = { id: string; name: string; note: string; items: Service[] };
export type HomeTab = { label: string; href: string; items: Service[] };
export type GuideItem = { concern: string; treatment: string; price: string; href: string; service: Service };
export type Promo = { title: string; details: string; price: string; ends: string; endsLabel: string; poster: string };

export type SiteContent = {
  categories: Category[];
  homeTabs: HomeTab[];
  guide: GuideItem[];
  promo: Promo | null;
  serviceCount: number;
  source: "sheet" | "snapshot";
};

// ---------- fetching ----------

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

async function fetchTab(sheetId: string, tab: string) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
  const res = await fetch(url, { next: { revalidate: REFRESH_SECONDS, tags: ["sheet"] } });
  if (!res.ok) throw new Error(`Sheet tab ${tab}: HTTP ${res.status}`);
  const text = await res.text();
  if (text.trimStart().startsWith("<")) throw new Error(`Sheet tab ${tab}: not shared publicly`);
  return parseCsv(text).slice(1).map((r) => r.map((c) => c.trim()));
}

async function loadRaw(): Promise<{ raw: Raw; source: SiteContent["source"] }> {
  const sheetId = process.env.SIMS_SHEET_ID;
  if (!sheetId) return { raw: snapshot as Raw, source: "snapshot" };

  try {
    const [prices, guide, promos] = await Promise.all([
      fetchTab(sheetId, "Prices"),
      fetchTab(sheetId, "Guide"),
      fetchTab(sheetId, "Promo").catch(() => [] as string[][])
    ]);
    const raw: Raw = {
      prices: prices
        .filter((r) => r[0] && r[5] && r[7])
        .map(([categoryId, category, categoryFr, note, noteFr, name, nameFr, price, home]) => ({
          categoryId,
          category,
          categoryFr: categoryFr ?? "",
          note: note ?? "",
          noteFr: noteFr ?? "",
          name,
          nameFr: nameFr ?? "",
          price,
          home: home ?? ""
        })),
      guide: guide.filter((r) => r[0] && r[2]).map(([concern, concernFr, service]) => ({ concern, concernFr: concernFr ?? "", service })),
      promos: promos
        .filter((r) => r[0])
        .map(([title, titleFr, details, detailsFr, price, starts, ends, poster]) => ({
          title,
          titleFr: titleFr ?? "",
          details: details ?? "",
          detailsFr: detailsFr ?? "",
          price: price ?? "",
          starts: starts ?? "",
          ends: ends ?? "",
          poster: poster ?? ""
        }))
    };
    // A sheet with almost nothing in it is far more likely a mistake than a real menu.
    if (raw.prices.length < 10) throw new Error(`Sheet has only ${raw.prices.length} price rows`);
    return { raw, source: "sheet" };
  } catch (error) {
    console.error("[content] Falling back to the built-in snapshot:", error);
    return { raw: snapshot as Raw, source: "snapshot" };
  }
}

// ---------- shaping ----------

function mauritiusToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Indian/Mauritius" }).format(new Date());
}

function formatDate(iso: string, lang: Lang) {
  const d = new Date(`${iso}T12:00:00+04:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", timeZone: "Indian/Mauritius" }).format(d);
}

export async function getContent(lang: Lang): Promise<SiteContent> {
  const { raw, source } = await loadRaw();
  const t = strings[lang];
  const pick = (en: string, fr: string) => (lang === "fr" && fr ? fr : en);

  const nameCounts = new Map<string, number>();
  raw.prices.forEach((r) => nameCounts.set(r.name, (nameCounts.get(r.name) ?? 0) + 1));

  const categories: Category[] = [];
  const byName = new Map<string, Service & { categoryId: string }>();
  for (const r of raw.prices) {
    let cat = categories.find((c) => c.id === r.categoryId);
    if (!cat) {
      cat = { id: r.categoryId, name: pick(r.category, r.categoryFr), note: "", items: [] };
      categories.push(cat);
    }
    if (r.note && !cat.note) cat.note = pick(r.note, r.noteFr);
    const name = pick(r.name, r.nameFr);
    const service: Service = {
      id: `${r.categoryId}:${r.name}`,
      name,
      bookingName: (nameCounts.get(r.name) ?? 0) > 1 ? `${name} (${cat.name.toLowerCase()})` : name,
      category: cat.name,
      price: displayPrice(r.price)
    };
    cat.items.push(service);
    if (!byName.has(r.name)) byName.set(r.name, { ...service, categoryId: r.categoryId });
  }

  const tabOrder = ["Hair", "Nails", "Face", "Waxing"];
  const tabFr: Record<string, string> = { Hair: "Cheveux", Nails: "Ongles", Face: "Visage", Waxing: "Épilation" };
  const homeTabs: HomeTab[] = tabOrder
    .map((label) => {
      const rows = raw.prices.filter((r) => r.home.toLowerCase() === label.toLowerCase());
      const items = rows.map((r) => categories.find((c) => c.id === r.categoryId)!.items.find((i) => i.id === `${r.categoryId}:${r.name}`)!);
      return { label: lang === "fr" ? tabFr[label] : label, href: rows[0] ? `#${rows[0].categoryId}` : "", items };
    })
    .filter((tab) => tab.items.length > 0);

  const guide: GuideItem[] = raw.guide.flatMap((g) => {
    const s = byName.get(g.service);
    if (!s) {
      console.warn(`[content] Guide row "${g.concern}" points to unknown service "${g.service}"`);
      return [];
    }
    return [{ concern: pick(g.concern, g.concernFr), treatment: s.name, price: s.price, href: `#${s.categoryId}`, service: s }];
  });

  const today = mauritiusToday();
  const live = raw.promos.find((p) => (!p.starts || p.starts <= today) && (!p.ends || p.ends >= today));
  const promo: Promo | null = live
    ? {
        title: pick(live.title, live.titleFr),
        details: pick(live.details, live.detailsFr),
        price: live.price ? displayPrice(live.price) : "",
        ends: live.ends,
        endsLabel: live.ends ? t.promo.until(formatDate(live.ends, lang)) : "",
        poster: live.poster
      }
    : null;

  return {
    categories,
    homeTabs,
    guide,
    promo,
    serviceCount: raw.prices.length,
    source
  };
}

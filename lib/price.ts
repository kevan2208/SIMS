/**
 * Prices as they come from the Google Sheet, in any of these forms:
 *   "800" or "Rs 800"                      fixed
 *   "800-1500", "Rs 800 – 1,500",
 *   "Rs 600 to 800", "Rs 600 à 800"        a range
 *   "7000+", "From Rs 7000",
 *   "À partir de Rs 7000"                  a starting price with no upper limit
 * are shown everywhere (site, PDF, share images, WhatsApp) as "Rs 800", "Rs 800 – 1,500" or "Rs 7,000+".
 */
export type Price = { min: number; max: number | null };

const num = (s: string) => Number(s.replace(/[,\s  ]/g, ""));
const N = String.raw`(\d[\d,\s  ]*)`;

export function parsePrice(raw: string): Price | null {
  const s = (raw ?? "").trim().replace(/^rs\.?\s*/i, "");
  let m = new RegExp(String.raw`^${N}$`).exec(s);
  if (m) return { min: num(m[1]), max: num(m[1]) };
  m = new RegExp(String.raw`^${N}\s*(?:-|–|—|to|à)\s*(?:rs\.?\s*)?${N}$`, "i").exec(s);
  if (m) {
    const [a, b] = [num(m[1]), num(m[2])];
    return { min: Math.min(a, b), max: Math.max(a, b) };
  }
  m = new RegExp(String.raw`^${N}\s*\+$`).exec(s);
  if (m) return { min: num(m[1]), max: null };
  m = new RegExp(String.raw`^(?:from|à partir de|a partir de)\s*(?:rs\.?\s*)?${N}$`, "i").exec(s);
  if (m) return { min: num(m[1]), max: null };
  return null;
}

const group = (n: number) => n.toLocaleString("en-US");

export function formatPrice(p: Price): string {
  if (p.max === null) return `Rs ${group(p.min)}+`;
  if (p.max === p.min) return `Rs ${group(p.min)}`;
  return `Rs ${group(p.min)} – ${group(p.max)}`;
}

/** Tidy a sheet price for display; anything unrecognised is shown exactly as typed. */
export function displayPrice(raw: string): string {
  const p = parsePrice(raw);
  return p ? formatPrice(p) : (raw ?? "").trim();
}

/** Sum of several prices, or null if any of them can't be read. */
export function sumPrices(prices: string[]): Price | null {
  let min = 0;
  let max: number | null = 0;
  for (const raw of prices) {
    const p = parsePrice(raw);
    if (!p) return null;
    min += p.min;
    max = max === null || p.max === null ? null : max + p.max;
  }
  return { min, max };
}

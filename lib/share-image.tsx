import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";
import { strings, type Lang } from "@/content/strings";
import type { Category } from "@/lib/content";

export const FORMATS = {
  post: { width: 1080, height: 1350, label: "Instagram / Facebook post (4:5)" },
  status: { width: 1080, height: 1920, label: "WhatsApp / Instagram status (9:16)" }
} as const;
export type Format = keyof typeof FORMATS;

/** Most rows one image holds before a category is split over several images ("1/2", "2/2"). */
const MAX_ROWS: Record<Format, number> = { post: 11, status: 10 };

/** The images for one category: usually one, more when the list is long. */
export function shareParts(category: Category, format: Format) {
  const per = Math.ceil(category.items.length / Math.ceil(category.items.length / MAX_ROWS[format]));
  const parts: Array<{ slug: string; items: Category["items"]; label: string }> = [];
  for (let i = 0; i < category.items.length; i += per) parts.push({ slug: "", items: category.items.slice(i, i + per), label: "" });
  return parts.map((p, i) => ({
    ...p,
    slug: parts.length > 1 ? `${category.id}-${i + 1}` : category.id,
    label: parts.length > 1 ? `${i + 1}/${parts.length}` : ""
  }));
}

// Poster preferences: big logo and headline, a tight price panel with one clean border,
// a warmer, lighter maroon, and no dead space.
const INK = "#1a1416";
const MAROON = "#b23a48";
const PLUM = "#6e4651";
const LINE = "#e3a7b6";

let fontCache: Promise<Array<{ name: string; data: Buffer; weight: 400 | 600; style: "normal" }>> | null = null;
function loadFonts() {
  const dir = path.join(process.cwd(), "assets", "fonts");
  fontCache ??= Promise.all([
    readFile(path.join(dir, "Prata-Regular.ttf")).then((data) => ({ name: "Prata", data, weight: 400 as const, style: "normal" as const })),
    readFile(path.join(dir, "Manrope-400.ttf")).then((data) => ({ name: "Manrope", data, weight: 400 as const, style: "normal" as const })),
    readFile(path.join(dir, "Manrope-600.ttf")).then((data) => ({ name: "Manrope", data, weight: 600 as const, style: "normal" as const }))
  ]);
  return fontCache;
}

let logoCache: Promise<string> | null = null;
function loadLogo() {
  logoCache ??= readFile(path.join(process.cwd(), "public", "logo-sims.svg")).then(
    (b) => `data:image/svg+xml;base64,${b.toString("base64")}`
  );
  return logoCache;
}

export async function renderShareImage(lang: Lang, format: Format, category: Category, part: { items: Category["items"]; label: string }) {
  const t = strings[lang];
  const { width, height } = FORMATS[format];
  const [fonts, logo] = await Promise.all([loadFonts(), loadLogo()]);
  const items = part.items;

  // Pick the largest text size whose rows still fit the space left for the panel, so short lists
  // don't leave a gap and long ones (or longer French names) never overflow.
  const tall = format === "status";
  const logoWidth = tall ? 640 : 460;
  const titleSize = tall ? 84 : 66;
  const space = tall
    ? height - 200 - logoWidth * 0.747 - (titleSize * 1.3 + 40) - 110 - 60 - 80
    : height - 108 - logoWidth * 0.747 - (titleSize * 1.3 + 14) - 90 - 60 - 70;
  const INNER = 860 - 80 - 3 * 2 - 40; // panel width minus padding, border, and the shortest dotted leader
  const heightAt = (size: number) =>
    items.reduce((sum, i) => {
      const nameWidth = Math.max(220, INNER - i.price.length * size * 0.62);
      const lines = Math.max(1, Math.ceil((i.name.length * size * 0.56) / nameWidth));
      return sum + lines * size * 1.2 + size * 0.6;
    }, 0);
  // Largest size where every name still fits on one line next to its price (wrapped names look messy)…
  const oneLine = Math.min(...items.map((i) => INNER / (i.name.length * 0.56 + i.price.length * 0.62)));
  // …capped, and never below a size that's comfortable to read on a phone (names may wrap then).
  let rowFont = Math.floor(Math.max(tall ? 38 : 32, Math.min(tall ? 58 : 50, oneLine)));
  while (rowFont > 24 && heightAt(rowFont) > space) rowFont -= 1;
  // Short lists: spread the rows out to use the leftover height instead of leaving empty bands.
  const spare = Math.max(0, space - heightAt(rowFont));
  const rowPad = Math.min(rowFont * 0.75, rowFont * 0.3 + spare / (items.length * 2));
  const title = part.label ? `${category.name} ${part.label}` : category.name;

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: tall ? "110px 70px 90px" : "56px 70px 52px",
          background: "linear-gradient(170deg, #fff6f8 0%, #fbe3e9 52%, #f5ccd7 100%)",
          fontFamily: "Manrope",
          color: INK
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" height={(logoWidth * 747) / 1000} src={logo} width={logoWidth} />
          <div style={{ fontFamily: "Prata", fontSize: titleSize, marginTop: tall ? 40 : 14, color: MAROON, textAlign: "center" }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 860,
            padding: "26px 40px",
            border: `3px solid ${LINE}`,
            borderRadius: 18,
            background: "rgba(255,255,255,0.72)"
          }}
        >
          {items.map((i) => (
            <div key={i.id} style={{ display: "flex", alignItems: "flex-end", padding: `${rowPad}px 0` }}>
              <div style={{ fontSize: rowFont, lineHeight: 1.2, flexShrink: 1 }}>{i.name}</div>
              <div style={{ flexGrow: 1, minWidth: 40, borderBottom: `3px dashed ${LINE}`, margin: `0 14px ${rowFont * 0.28}px` }} />
              <div style={{ fontSize: rowFont, fontWeight: 600, color: MAROON, flexShrink: 0 }}>{i.price}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: PLUM }}>
          <div style={{ fontSize: tall ? 40 : 32, fontWeight: 600, color: INK }}>
            {`${t.ticket.book} ${siteConfig.bookingWhatsappDisplay}`}
          </div>
          <div style={{ fontSize: tall ? 30 : 25, marginTop: 8 }}>
            {`${siteConfig.address.street}, ${siteConfig.address.locality}`}
          </div>
        </div>
      </div>
    ),
    { width, height, fonts }
  );
}

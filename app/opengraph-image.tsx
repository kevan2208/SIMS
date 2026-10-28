import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name}, hair, facials and nails at Flacq Retail Park, Mauritius`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo-sims.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(175deg, #fff6f8 0%, #fbe3e9 50%, #f5ccd7 100%)",
          color: "#1a1416",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "70px 80px",
          width: "100%"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
          <div style={{ fontSize: 64, lineHeight: 1.08 }}>Hair, facials and nails at Flacq Retail Park</div>
          <div style={{ color: "#6e4651", fontSize: 30, marginTop: 28 }}>{`Book on WhatsApp ${siteConfig.bookingWhatsappDisplay}`}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" height={374} src={logoSrc} width={500} />
      </div>
    ),
    size
  );
}

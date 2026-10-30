import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo-sims.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ alignItems: "center", background: "#fbe3e9", display: "flex", height: "100%", justifyContent: "center", width: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" height={120} src={logoSrc} width={160} />
      </div>
    ),
    size
  );
}

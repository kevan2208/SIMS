import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} | Hair, facials, and nails in Flacq, Mauritius`;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

async function getLogoDataUri() {
  const logoPath = path.join(process.cwd(), "public", "logo-sims-hair-beauty.png");
  const logoBuffer = await readFile(logoPath);

  return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const logoDataUri = await getLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "radial-gradient(circle at top left, rgba(139, 38, 57, 0.16), transparent 28%), radial-gradient(circle at top right, rgba(164, 71, 92, 0.1), transparent 24%), linear-gradient(180deg, #f8eff1 0%, #f2e3e7 100%)",
          color: "#231217",
          display: "flex",
          height: "100%",
          padding: "46px",
          width: "100%"
        }}
      >
        <div
          style={{
            background: "linear-gradient(180deg, rgba(251, 245, 247, 0.95), rgba(244, 232, 234, 0.94))",
            border: "1px solid rgba(206, 183, 188, 0.9)",
            borderRadius: "34px",
            boxShadow: "0 18px 42px rgba(87, 59, 55, 0.08), 0 8px 18px rgba(87, 59, 55, 0.04)",
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            overflow: "hidden",
            padding: "42px 44px",
            position: "relative"
          }}
        >
          <div
            style={{
              background:
                "radial-gradient(circle at center, rgba(164, 71, 92, 0.16), rgba(139, 38, 57, 0.03) 48%, transparent 74%)",
              borderRadius: "9999px",
              height: "300px",
              left: "-40px",
              position: "absolute",
              top: "-70px",
              width: "300px"
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: "580px",
              position: "relative",
              zIndex: 1
            }}
          >
            <div
              style={{
                color: "#8b2639",
                display: "flex",
                fontSize: "22px",
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase"
              }}
            >
              Sim&apos;s Hair and Beauty • Flacq, Mauritius
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "Georgia, serif",
                  fontSize: "78px",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.92
                }}
              >
                Hair, facials, and nails in one calm salon space.
              </div>

              <div
                style={{
                  color: "#5a444a",
                  display: "flex",
                  fontSize: "30px",
                  lineHeight: 1.35,
                  maxWidth: "520px"
                }}
              >
                Appointments are usually arranged on WhatsApp. Browse services, pricing, and directions before your visit.
              </div>
            </div>

            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: "16px"
              }}
            >
              <div
                style={{
                  background: "linear-gradient(180deg, rgba(254, 250, 251, 0.995), rgba(248, 241, 243, 0.985))",
                  border: "1px solid rgba(206, 183, 188, 0.82)",
                  borderRadius: "9999px",
                  boxShadow: "0 16px 34px rgba(87, 59, 55, 0.08)",
                  color: "#231217",
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: 600,
                  padding: "18px 28px"
                }}
              >
                Book on WhatsApp
              </div>
              <div
                style={{
                  color: "#6d565d",
                  display: "flex",
                  fontSize: "23px",
                  fontWeight: 500
                }}
              >
                Monday to Saturday, 08:30 to 17:30
              </div>
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              minWidth: "360px",
              position: "relative",
              zIndex: 1
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.14))",
                border: "1px solid rgba(206, 183, 188, 0.76)",
                borderRadius: "36px",
                boxShadow: "0 22px 52px rgba(87, 59, 55, 0.12), 0 8px 22px rgba(87, 59, 55, 0.05)",
                display: "flex",
                height: "440px",
                justifyContent: "center",
                padding: "24px",
                width: "360px"
              }}
            >
              <img
                alt={siteConfig.name}
                height="390"
                src={logoDataUri}
                style={{
                  objectFit: "contain"
                }}
                width="310"
              />
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

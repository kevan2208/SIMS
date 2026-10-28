import { db } from "@/lib/db";

export const runtime = "nodejs";

const EVENTS = new Set(["whatsapp", "call", "add", "book-list", "promo"]);

/** Records one booking tap. Accepts only the known events and short strings; never stores anything about the visitor beyond phone vs computer. */
export async function POST(req: Request) {
  const sql = db();
  if (!sql) return new Response(null, { status: 204 });

  let body: { event?: unknown; label?: unknown; path?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  const event = typeof body.event === "string" && EVENTS.has(body.event) ? body.event : null;
  if (!event) return new Response(null, { status: 400 });

  const label = typeof body.label === "string" ? body.label.slice(0, 300) : "";
  const path = typeof body.path === "string" ? body.path.slice(0, 120) : "";
  const lang = path.startsWith("/fr") ? "fr" : "en";
  const device = /Mobi|Android|iPhone/i.test(req.headers.get("user-agent") ?? "") ? "phone" : "computer";

  try {
    await sql`INSERT INTO taps (event, label, path, lang, device) VALUES (${event}, ${label}, ${path}, ${lang}, ${device})`;
  } catch (error) {
    console.error("[tap] insert failed", error);
  }
  return new Response(null, { status: 204 });
}

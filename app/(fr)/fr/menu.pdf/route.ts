import { getContent } from "@/lib/content";
import { renderMenuPdf } from "@/lib/menu-pdf";

export const runtime = "nodejs";
export const revalidate = 300;

/** The printable price menu, generated from the same data as the website. */
export async function GET() {
  const { categories } = await getContent("fr");
  const pdf = await renderMenuPdf("fr", categories);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": 'inline; filename="sims-hair-and-beauty-menu-fr.pdf"',
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}

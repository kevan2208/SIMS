import { getContent } from "@/lib/content";
import { FORMATS, renderShareImage, shareParts, type Format } from "@/lib/share-image";

export const runtime = "nodejs";
export const revalidate = 300;

/** /share/{en|fr}/{post|status}/{category-id}.png: a ready-to-post price image for one category. */
export async function GET(_req: Request, { params }: { params: { slug: string[] } }) {
  const [lang, format, file] = params.slug ?? [];
  const slug = file?.replace(/\.png$/, "");
  if ((lang !== "en" && lang !== "fr") || !(format in FORMATS) || !slug) {
    return new Response("Not found", { status: 404 });
  }
  const { categories } = await getContent(lang);
  for (const category of categories) {
    const part = shareParts(category, format as Format).find((p) => p.slug === slug);
    if (part) {
      const image = await renderShareImage(lang, format as Format, category, part);
      image.headers.set("cache-control", "public, max-age=0, s-maxage=300, stale-while-revalidate=86400");
      return image;
    }
  }
  return new Response("Not found", { status: 404 });
}

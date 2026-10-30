import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { getContent } from "@/lib/content";
import { FORMATS, shareParts, type Format } from "@/lib/share-image";

export const revalidate = 300;
export const metadata: Metadata = { title: "Price images", robots: { index: false, follow: false } };

/**
 * Private page (not linked from the site): price images for social media, one per category,
 * always made from the current prices. On a phone, tap an image and long-press to save it.
 */
export default async function SharePage(props: { searchParams: Promise<{ lang?: string }> }) {
  const searchParams = await props.searchParams;
  const lang = searchParams.lang === "fr" ? "fr" : "en";
  const { categories, source } = await getContent(lang);

  return (
    <main className="pink-wash -mt-16 pt-16">
      <Container className="py-10">
        <h1 className="font-display text-[2.2rem] text-ink">Price images</h1>
        <p className="mt-2 max-w-[38rem] text-[0.98rem] text-mauve">
          Made from the current prices{source === "sheet" ? " in the Google Sheet" : " (built-in copy; the sheet isn't connected yet)"}. Tap
          one to open it full size, then long-press to save it to your phone.
        </p>
        <p className="mt-3 text-[0.95rem]">
          <a className={lang === "en" ? "font-semibold text-ink" : "text-sims-red underline"} href="/share">
            English
          </a>
          {"  "}
          <a className={lang === "fr" ? "ml-3 font-semibold text-ink" : "ml-3 text-sims-red underline"} href="/share?lang=fr">
            Français
          </a>
        </p>

        {(Object.keys(FORMATS) as Format[]).map((format) => (
          <section className="mt-10" key={format}>
            <h2 className="font-display text-[1.5rem] text-ink">{FORMATS[format].label}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {categories.flatMap((c) => shareParts(c, format).map((part) => ({ c, part }))).map(({ c, part }) => {
                const src = `/share/${lang}/${format}/${part.slug}.png`;
                return (
                  <li key={part.slug}>
                    <a className="block overflow-hidden rounded-md bg-white ring-1 ring-seam" href={src} rel="noreferrer" target="_blank">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt={`${c.name} prices`} className="w-full" loading="lazy" src={src} />
                    </a>
                    <p className="mt-1.5 text-[0.88rem] text-plum">
                      {c.name} {part.label}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </Container>
    </main>
  );
}

import Image from "next/image";

import { galleryPhotos, siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { strings, type Lang } from "@/content/strings";

/** Hidden until photos are listed in content/site.ts. */
export function Gallery({ lang }: { lang: Lang }) {
  if (galleryPhotos.length === 0) return null;
  const t = strings[lang];

  const instagram = siteConfig.socials.find((s) => s.label === "Instagram");

  return (
    <section aria-labelledby="gallery-title" className="py-14 sm:py-20">
      <Container>
        <h2 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.6rem]" id="gallery-title">
          {t.gallery.title}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {galleryPhotos.map((photo) => (
            <Image
              alt={photo.alt}
              className="aspect-square w-full rounded-[14px] object-cover"
              height={600}
              key={photo.src}
              sizes="(min-width: 640px) 33vw, 50vw"
              src={photo.src}
              width={600}
            />
          ))}
        </div>
        {instagram ? (
          <p className="mt-6 text-[0.98rem] text-mauve">
            {t.gallery.more}{" "}
            <a className="text-sims-red underline underline-offset-4" href={instagram.href} rel="noreferrer" target="_blank">
              Instagram
            </a>
            .
          </p>
        ) : null}
      </Container>
    </section>
  );
}

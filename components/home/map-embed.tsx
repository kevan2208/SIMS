"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Google map costs about 450 KB, so it only loads once the visitor scrolls near it.
 * Chrome's own `loading="lazy"` starts it far too early on a phone-length page.
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-[20rem] w-full md:h-full md:min-h-[24rem]" ref={ref}>
      {near ? (
        <iframe
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
          title={title}
        />
      ) : null}
    </div>
  );
}

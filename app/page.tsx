import type { Metadata } from "next";

import { Faq } from "@/components/home/faq";
import { Gallery } from "@/components/home/gallery";
import { Guide } from "@/components/home/guide";
import { Hero } from "@/components/home/hero";
import { Prices } from "@/components/home/prices";
import { Visit } from "@/components/home/visit";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" }
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Guide />
      <Prices />
      <Gallery />
      <Faq />
      <Visit />
    </main>
  );
}

import type { Metadata } from "next";

import { Faq } from "@/components/home/faq";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { MenuPreview } from "@/components/home/menu-preview";
import { Signature } from "@/components/home/signature";
import { Visit } from "@/components/home/visit";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" }
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Signature />
      <MenuPreview />
      <Gallery />
      <Faq />
      <Visit />
    </main>
  );
}

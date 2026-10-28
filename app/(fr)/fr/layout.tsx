import { RootShell, rootMetadata, rootViewport } from "@/components/layout/root-shell";

export const metadata = rootMetadata("fr");
export const viewport = rootViewport;

export default function FrenchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="fr">{children}</RootShell>;
}

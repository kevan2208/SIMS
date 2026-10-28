import { HomePage, homeMetadata } from "@/components/pages/home-page";

export const revalidate = 300;
export const generateMetadata = () => homeMetadata("fr");

export default function Page() {
  return <HomePage lang="fr" />;
}

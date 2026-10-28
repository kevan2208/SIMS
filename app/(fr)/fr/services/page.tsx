import { ServicesPage, servicesMetadata } from "@/components/pages/services-page";

export const revalidate = 300;
export const generateMetadata = () => servicesMetadata("fr");

export default function Page() {
  return <ServicesPage lang="fr" />;
}

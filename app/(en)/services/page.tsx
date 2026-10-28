import { ServicesPage, servicesMetadata } from "@/components/pages/services-page";

export const revalidate = 300;
export const generateMetadata = () => servicesMetadata("en");

export default function Page() {
  return <ServicesPage lang="en" />;
}

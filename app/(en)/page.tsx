import { HomePage, homeMetadata } from "@/components/pages/home-page";

export const revalidate = 300;
export const generateMetadata = () => homeMetadata("en");

export default function Page() {
  return <HomePage lang="en" />;
}

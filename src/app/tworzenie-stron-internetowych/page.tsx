import SeoServicePage, { createServiceMetadata } from "@/components/SeoServicePage";
import { getServicePage } from "@/lib/service-pages";

const data = getServicePage("tworzenie-stron-internetowych")!;

export const metadata = createServiceMetadata(data);

export default function WebsitesPage() {
  return <SeoServicePage data={data} />;
}

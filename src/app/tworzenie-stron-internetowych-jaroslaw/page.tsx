import SeoServicePage, { createServiceMetadata } from "@/components/SeoServicePage";
import { getServicePage } from "@/lib/service-pages";

const data = getServicePage("tworzenie-stron-internetowych-jaroslaw")!;

export const metadata = createServiceMetadata(data);

export default function JaroslawWebsitesPage() {
  return <SeoServicePage data={data} />;
}

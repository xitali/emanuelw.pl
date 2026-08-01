import SeoServicePage, { createServiceMetadata } from "@/components/SeoServicePage";
import { getServicePage } from "@/lib/service-pages";

const data = getServicePage("tworzenie-aplikacji-webowych")!;

export const metadata = createServiceMetadata(data);

export default function WebAppsPage() {
  return <SeoServicePage data={data} />;
}

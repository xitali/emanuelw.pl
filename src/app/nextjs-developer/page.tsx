import SeoServicePage, { createServiceMetadata } from "@/components/SeoServicePage";
import { getServicePage } from "@/lib/service-pages";

const data = getServicePage("nextjs-developer")!;

export const metadata = createServiceMetadata(data);

export default function NextDeveloperPage() {
  return <SeoServicePage data={data} />;
}

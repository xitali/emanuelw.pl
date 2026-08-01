import SeoServicePage, { createServiceMetadata } from "@/components/SeoServicePage";
import { getServicePage } from "@/lib/service-pages";

const data = getServicePage("sklepy-internetowe")!;

export const metadata = createServiceMetadata(data);

export default function EcommercePage() {
  return <SeoServicePage data={data} />;
}

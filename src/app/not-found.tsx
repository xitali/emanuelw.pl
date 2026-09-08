import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PublicPageShell from "@/components/portfolio/PublicPageShell";
export default function NotFound() {
  return <PublicPageShell><main id="main-content" className="portfolio-subpage portfolio-status"><p className="portfolio-kicker">404 / NIE ZNALEZIONO</p><h1>Nie ma tu tej strony.</h1><p>Adres może być nieaktualny. Wróć na stronę główną, aby znaleźć projekty, ofertę i kontakt.</p><Link href="/" className="portfolio-button"><ArrowLeft size={17} />Strona główna</Link></main></PublicPageShell>;
}

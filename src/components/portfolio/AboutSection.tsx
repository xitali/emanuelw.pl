import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  return <section id="o-mnie" className="portfolio-about portfolio-container" aria-labelledby="about-heading">
    <div className="about-portrait"><Image src="/emanuel_wloch.jpg" alt="Emanuel Włoch" fill sizes="(max-width: 1023px) 80vw, 35vw" className="object-cover object-top" /><span>EMANUEL WŁOCH / JAROSŁAW, PL</span></div>
    <div><p className="portfolio-kicker">03 / CZŁOWIEK ZA KODEM</p><h2 id="about-heading">Myślę o całości.<br /><span>Dbam o szczegóły.</span></h2><p>Jestem full-stack developerem z Jarosławia. Projektuję i wdrażam strony, sklepy oraz aplikacje webowe — od interfejsu po bezpieczny backend.</p><p>Łączę design, programowanie i wdrożenie w jeden proces. Liczy się dla mnie produkt, który dobrze wygląda, szybko działa i jest wygodny w codziennym użyciu.</p><Link className="portfolio-text-link" href="/o-mnie">Poznaj mnie bliżej <ArrowUpRight size={18} /></Link></div>
  </section>;
}

"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandMark, IconArrowUpRight, IconMenu } from "./icons";

const links = [["Oferta", "#uslugi"], ["Realizacje", "#projekty"], ["Współpraca", "#wspolpraca"], ["O mnie", "#o-mnie"]];
export default function PortfolioNav({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  return <header className="portfolio-nav" ref={header}>
    <a className="portfolio-skip" href="#main-content">Przejdź do treści</a>
    <Link className="portfolio-wordmark" href="/" aria-label="Emanuel Włoch — strona główna"><BrandMark size={30} />ew<span> / </span><small>Emanuel Włoch</small></Link>
    <nav id="portfolio-menu" aria-label="Główna nawigacja" className={open ? "is-open" : ""}>
      {links.map(([label, href]) => <a key={href} href={href === "#projekty" ? "/realizacje" : home ? href : `/${href}`} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="portfolio-button portfolio-button--secondary nav-contact" href={home ? "#kontakt" : "/#kontakt"} onClick={() => setOpen(false)}>Omów projekt <IconArrowUpRight size={15} /></a>
    </nav>
    <button ref={button} className="portfolio-menu-toggle" aria-label={open ? "Zamknij menu" : "Otwórz menu"} aria-expanded={open} aria-controls="portfolio-menu" onClick={() => setOpen(!open)}><IconMenu /></button>
  </header>;
}

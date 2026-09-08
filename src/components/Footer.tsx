import Link from "next/link";
const groups = [
  { title: "Usługi", links: [["/tworzenie-stron-internetowych", "Strony internetowe"], ["/tworzenie-aplikacji-webowych", "Aplikacje webowe"], ["/sklepy-internetowe", "Sklepy internetowe"], ["/nextjs-developer", "Next.js developer"]] },
  { title: "Lokalnie", links: [["/tworzenie-stron-internetowych-jaroslaw", "Strony internetowe Jarosław"], ["/tworzenie-stron-internetowych-rzeszow", "Strony internetowe Rzeszów"]] },
  { title: "Informacje", links: [["/uslugi", "Pełna oferta"], ["/o-mnie", "O mnie"], ["/poradniki", "Poradniki"], ["/#projekty", "Realizacje"], ["/polityka-prywatnosci", "Polityka prywatności"]] },
];
export default function Footer({ visitCount = 0 }: { visitCount?: number }) {
  return <footer className="portfolio-footer"><div className="portfolio-container">
    <div className="portfolio-footer-grid"><div><Link href="/" className="portfolio-wordmark" aria-label="Emanuel Włoch — strona główna">ew<span>/</span><small>Emanuel Włoch</small></Link><p>Strony internetowe, sklepy i aplikacje webowe projektowane od interfejsu po bezpieczne wdrożenie.</p><p>Jarosław, Podkarpackie<br />Współpraca zdalna w całej Polsce</p></div>
    {groups.map(group => <nav key={group.title} aria-label={`${group.title} w stopce`}><h2>{group.title}</h2><ul>{group.links.map(([href,label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}</div>
    <div className="portfolio-footer-bottom"><span>© {new Date().getFullYear()} Emanuel Włoch</span>{visitCount > 0 && <span>Odsłony: {visitCount.toLocaleString("pl-PL")}</span>}<a href="https://github.com/xitali" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
  </div></footer>;
}

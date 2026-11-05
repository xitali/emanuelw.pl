export default function StaticProduct() {
  return <div className="device-fallback" aria-hidden="true">
    <div className="fallback-desktop"><div className="fallback-browser-bar"><i/><i/><i/><span>twoja-firma.pl</span></div><div className="fallback-screen-content"><small>TWÓJ POMYSŁ. TWOJA STRONA.</small><strong>Twoja firma.<br/>Dobrze pokazana.</strong><i className="fallback-cta">Porozmawiajmy ↗</i><div className="fallback-artwork"><b/><b/><b/></div></div></div>
    <div className="fallback-tablet"><span>Twoja oferta.</span><i/><b/></div><div className="fallback-phone"><span>Na telefonie.</span><i/><b/></div>
  </div>;
}

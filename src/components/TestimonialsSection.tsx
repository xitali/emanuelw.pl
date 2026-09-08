"use client";
import type { Testimonial } from "@/types";
import { Star } from "lucide-react";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null;
  return <section id="opinie" className="portfolio-testimonials" aria-labelledby="testimonials-heading"><div className="portfolio-container">
    <header className="portfolio-section-heading"><div><p className="portfolio-kicker">GŁOSEM KLIENTÓW</p><h2 id="testimonials-heading">Dobra współpraca.<br /><span>Prawdziwe opinie.</span></h2></div><p>Doświadczenia osób,<br />z którymi tworzyłem.</p></header>
    <div className="testimonial-grid">{testimonials.map(item => <article className="testimonial-card" key={item.id}>
      <div className="testimonial-rating" aria-label={`Ocena: ${item.rating} na 5`}>{Array.from({length: 5}, (_,i) => <Star key={i} size={14} aria-hidden="true" fill={i < item.rating ? "currentColor" : "none"} />)}</div>
      <blockquote>{item.content}</blockquote><footer><strong>{item.client_name}</strong>{item.company && <p>{item.company}</p>}</footer>
    </article>)}</div>
  </div></section>;
}

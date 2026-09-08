import type { ReactNode } from "react";
import PortfolioNav from "./PortfolioNav";
import Footer from "@/components/Footer";

export default function PublicPageShell({ children }: { children: ReactNode }) {
  return <div className="portfolio-site dark"><PortfolioNav home={false} />{children}<Footer /></div>;
}

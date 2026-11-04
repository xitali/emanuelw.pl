import ConversionTracker from "@/components/ConversionTracker";
import type { ReactNode } from "react";
import PortfolioNav from "./PortfolioNav";
import Footer from "@/components/Footer";
import MotionLayer from "./motion/MotionLayer";

export default function PublicPageShell({ children }: { children: ReactNode }) {
  return <div className="portfolio-site dark"><ConversionTracker /><MotionLayer /><PortfolioNav home={false} />{children}<Footer /></div>;
}

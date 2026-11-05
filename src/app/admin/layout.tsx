import type { Metadata, Viewport } from "next";
import "./admin.css";

export const viewport: Viewport = {
  themeColor: "#0b0d0f",
};

export const metadata: Metadata = {
  title: "Panel administracyjny",
  applicationName: "Emanuel Admin",
  manifest: "/admin.webmanifest",
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="admin-site">{children}</div>;
}

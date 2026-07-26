import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#060913",
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
  return children;
}

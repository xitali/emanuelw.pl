import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getContactMessages, getPageVisitsCount, getAdminProjects, getServices, getTestimonials, getPageVisitsStats } from "@/lib/turso";
import AdminDashboardClient from "./AdminDashboardClient";

export const revalidate = 0; // Dynamic route for admin panel

interface AdminPageProps {
  searchParams: Promise<{
    tab?: string;
    message?: string;
  }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }
  const params = await searchParams;

  const [messages, visitsCount, projects, services, testimonials, analytics] = await Promise.all([
    getContactMessages(),
    getPageVisitsCount(),
    getAdminProjects(),
    getServices(),
    getTestimonials(),
    getPageVisitsStats(),
  ]);

  return (
    <AdminDashboardClient
      messages={messages}
      visitsCount={visitsCount}
      projects={projects}
      services={services}
      testimonials={testimonials}
      analytics={analytics}
      initialTab={params.tab === "messages" ? "messages" : "projects"}
      initialMessageId={params.message}
    />
  );
}

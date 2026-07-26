import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getContactMessages, getPageVisitsCount, getAdminProjects, getServices, getTestimonials, getPageVisitsStats } from "@/lib/turso";
import AdminDashboardClient from "./AdminDashboardClient";

export const revalidate = 0; // Dynamic route for admin panel

export default async function AdminPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

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
    />
  );
}

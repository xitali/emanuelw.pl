import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getContactMessages, getPageVisitsCount, getProjects, getServices } from "@/lib/turso";
import AdminDashboardClient from "./AdminDashboardClient";

export const revalidate = 0; // Dynamic route for admin panel

export default async function AdminPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const [messages, visitsCount, projects, services] = await Promise.all([
    getContactMessages(),
    getPageVisitsCount(),
    getProjects(),
    getServices(),
  ]);

  return (
    <AdminDashboardClient
      messages={messages}
      visitsCount={visitsCount}
      projects={projects}
      services={services}
    />
  );
}

import type { Project } from "@/types";
import { caseTextFields, caseListFields } from "@/lib/project-case-fields";

const labels: Record<string, string> = {
  main_challenge: "Problem i wyzwanie", innovation: "Rozwiązanie", project_result: "Rezultat", target_audience: "Odbiorcy", hosting_platform: "Hosting", accessibility_features: "Dostępność",
  key_features: "Funkcjonalności", performance_metrics: "Wydajność — wynik, źródło i data", success_metrics: "Wyniki biznesowe — wynik, źródło i data", user_feedback: "Opinie o projekcie — autor i firma", technical_metrics: "Pozostałe pomiary", frontend_technologies: "Technologie interfejsu", backend_technologies: "Technologie zaplecza", tools_and_services: "Narzędzia i usługi",
};

export default function ProjectCaseFields({ project }: { project?: Project }) {
  return <fieldset className="space-y-4 border-t border-slate-500/30 pt-5"><legend className="font-semibold">Opis realizacji i dowody</legend><p className="text-sm">Uzupełniaj wyłącznie potwierdzone informacje. W listach wpisuj jeden element w wierszu. Bez pomiarów pozostaw pola puste.</p>
    {[...caseTextFields, ...caseListFields].map(name => <div key={name}><label className="block text-sm mb-1" htmlFor={`case-${name}-${project?.id || "new"}`}>{labels[name]}</label><textarea id={`case-${name}-${project?.id || "new"}`} name={name} rows={3} maxLength={5000} defaultValue={Array.isArray(project?.[name]) ? (project[name] as string[]).join("\n") : project?.[name] as string || ""} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white" /></div>)}
  </fieldset>;
}

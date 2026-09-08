const labels: Record<string, string> = {
  "landing-page": "Strona ofertowa",
  "web-app": "Aplikacja internetowa",
  web: "Strona internetowa",
  "e-commerce": "Sklep internetowy",
  mobile: "Aplikacja mobilna",
  "mobile-app": "Aplikacja mobilna",
  "in-development": "W trakcie realizacji",
  completed: "Ukończony",
  published: "Opublikowany",
};

export function projectLabel(value: string | undefined | null, fallback = "Realizacja") {
  return value ? labels[value.toLowerCase()] || value : fallback;
}

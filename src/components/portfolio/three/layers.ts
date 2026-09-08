export type Vector3Tuple = [number, number, number];
export interface ProductLayer {
  id: string;
  label: string;
  description: string;
  technologies: string[];
  assembledPosition: Vector3Tuple;
  explodedPosition: Vector3Tuple;
  assembledRotation: Vector3Tuple;
  explodedRotation: Vector3Tuple;
  color: string;
}

const definitions = [
  { id: "design", label: "UI / UX", description: "Design, który prowadzi. Czytelna hierarchia, dostępność i dopracowany ruch.", technologies: ["Tailwind CSS", "Motion", "A11y"], color: "#c8dfed" },
  { id: "frontend", label: "Frontend", description: "Interfejs, który reaguje. Szybkie, responsywne doświadczenie na każdym ekranie.", technologies: ["React", "Next.js", "TypeScript"], color: "#88bddd" },
  { id: "auth", label: "Bezpieczeństwo", description: "Dostęp pod kontrolą. Podpisane sesje, hashowanie haseł i ochrona zasobów.", technologies: ["JOSE", "bcrypt"], color: "#8a99a5" },
  { id: "backend", label: "Backend / API", description: "Logika, na której można polegać. Integracje, walidacja i bezpieczne operacje.", technologies: ["Server Actions", "Route Handlers", "Zod"], color: "#7eacca" },
  { id: "database", label: "Baza danych", description: "Dane na swoim miejscu. Relacyjny model i powtarzalne migracje SQL.", technologies: ["Turso", "libSQL"], color: "#718d9e" },
  { id: "cloud", label: "Chmura", description: "Miejsce dla całego produktu. Hosting aplikacji i trwałe przechowywanie mediów.", technologies: ["Vercel", "Vercel Blob"], color: "#83949e" },
  { id: "deployment", label: "Wdrożenie", description: "Od kodu do wdrożenia. Kontrola typów, testy i automatyzacja publikacji.", technologies: ["GitHub", "Vitest", "CI"], color: "#637682" },
] as const;

// A model adapter can replace each part's geometry without changing the timeline.
export const productLayers: ProductLayer[] = definitions.map((part, index) => ({
  ...part,
  technologies: [...part.technologies],
  assembledPosition: [0, 0, 0.48 - index * 0.16],
  explodedPosition: [0, (3 - index) * 1.9, 0],
  assembledRotation: [0, 0, 0],
  explodedRotation: [-1, 0, 0],
}));

export interface SceneState {
  progress: number;
  explosion: number;
  turn: number;
  zoom: number;
  retreat: number;
  invalidate: () => void;
  connect: (invalidate: () => void) => () => void;
}

export function createSceneState(): SceneState {
  // Imperative animation store: GSAP owns values, React owns its lifecycle.
  const state: SceneState = { progress: 0, explosion: 0, turn: 0, zoom: 0, retreat: 0, invalidate: () => {}, connect(invalidate) {
    state.invalidate = invalidate;
    invalidate();
    return () => { state.invalidate = () => {}; };
  } };
  return state;
}

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
  { id: "design", label: "UI / UX", description: "Twoi klienci łatwo znajdą ofertę i kontakt. Zobaczysz projekt, zanim zacznę programowanie.", technologies: ["Tailwind CSS", "Motion", "A11y"], color: "#c8dfed" },
  { id: "frontend", label: "Frontend", description: "Twoja strona dopasuje się do telefonu i komputera. Zadbam o wygodną obsługę.", technologies: ["React", "Next.js", "TypeScript"], color: "#88bddd" },
  { id: "auth", label: "Bezpieczeństwo", description: "Ty decydujesz, kto może edytować treści i przeglądać dane. Zabezpieczę dostęp do panelu.", technologies: ["JOSE", "bcrypt"], color: "#8a99a5" },
  { id: "backend", label: "Backend / API", description: "Formularze, rezerwacje i połączenia z innymi systemami dopasuję do zadań Twojej firmy.", technologies: ["Server Actions", "Route Handlers", "Zod"], color: "#7eacca" },
  { id: "database", label: "Baza danych", description: "Ofertę, zamówienia i wiadomości przechowasz w uporządkowanej bazie. Ustalimy, jakie dane są Ci potrzebne.", technologies: ["Turso", "libSQL"], color: "#718d9e" },
  { id: "cloud", label: "Chmura", description: "Pomogę Ci wybrać miejsce dla Twojej strony, zdjęć i filmów oraz połączyć je z domeną.", technologies: ["Vercel", "Vercel Blob"], color: "#83949e" },
  { id: "deployment", label: "Wdrożenie", description: "Przed publikacją sprawdzę działanie strony. Po uruchomieniu pokażę Ci, jak z niej korzystać.", technologies: ["GitHub", "Vitest", "CI"], color: "#637682" },
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
  seek: (progress: number) => void;
  connect: (invalidate: () => void) => () => void;
}

export function createSceneState(): SceneState {
  // Imperative animation store: GSAP owns values, React owns its lifecycle.
  const state: SceneState = { progress: 0, explosion: 0, turn: 0, zoom: 0, retreat: 0, invalidate: () => {}, seek(progress) { state.progress = Math.max(0, Math.min(1, progress)); state.invalidate(); }, connect(invalidate) {
    state.invalidate = invalidate;
    invalidate();
    return () => { state.invalidate = () => {}; };
  } };
  return state;
}

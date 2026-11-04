import type { ReactNode, SVGProps } from "react";

/**
 * Autorski zestaw ikon „EW”: siatka 24×24, obrys 1.5, zaokrąglone zakończenia,
 * duotone — główny kształt w currentColor, akcent w --icon-accent.
 * Elementy z `data-draw` są ścieżkami animowanymi (stroke-dashoffset, patrz premium.css).
 * Brak "use client", więc działają zarówno w komponentach serwerowych, jak i klienckich.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number; title?: string };

function Icon({ size = 24, title, className = "", children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ew-icon ${className}`.trim()}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const D = { "data-draw": "", pathLength: 1 } as const;
const A = { className: "ew-accent", "data-draw": "", pathLength: 1 } as const;

/* —— Usługi —— */
export const IconSite = (p: IconProps) => <Icon {...p}>
  <rect x="3" y="4.5" width="18" height="15" rx="2.5" {...D} />
  <path d="M3 9h18" {...D} />
  <path d="M6.5 6.75h.01M9 6.75h.01" />
  <path d="M7 13.5h6M7 16h3.5" {...A} />
  <rect x="15" y="12.5" width="3" height="4" rx=".8" {...A} />
</Icon>;

export const IconCart = (p: IconProps) => <Icon {...p}>
  <path d="M3 4h2.2l1.7 9.2a1.6 1.6 0 0 0 1.6 1.3h8a1.6 1.6 0 0 0 1.55-1.2L19.5 8H6" {...D} />
  <circle cx="9.5" cy="19" r="1.25" />
  <circle cx="16.5" cy="19" r="1.25" />
  <path d="M10 11l1.6 1.6L14.6 9.6" {...A} />
</Icon>;

export const IconApp = (p: IconProps) => <Icon {...p}>
  <rect x="4" y="3.5" width="16" height="17" rx="3" {...D} />
  <rect x="7.5" y="7" width="3.5" height="3.5" rx=".9" {...A} />
  <path d="M13.5 8h3M13.5 10h2" {...D} />
  <path d="M7.5 14.5h9M7.5 17.2h5.5" {...D} />
</Icon>;

/* —— Warstwy produktu (ProductStory / TechnologyDetails) —— */
export const IconDesign = (p: IconProps) => <Icon {...p}>
  <path d="M4 20l1.1-4.2L15.6 5.3a2 2 0 0 1 2.8 0l.3.3a2 2 0 0 1 0 2.8L8.2 18.9z" {...D} />
  <path d="M13.8 7.1l3.1 3.1" />
  <path d="M5.1 15.8l3.1 3.1" {...A} />
  <path d="M14 20h6" {...A} />
</Icon>;

export const IconFrontend = (p: IconProps) => <Icon {...p}>
  <path d="M8.5 7.5L4 12l4.5 4.5" {...D} />
  <path d="M15.5 7.5L20 12l-4.5 4.5" {...D} />
  <path d="M13.2 5.5l-2.4 13" {...A} />
</Icon>;

export const IconShield = (p: IconProps) => <Icon {...p}>
  <path d="M12 3.2l7 2.6v5.4c0 4.3-2.8 7.7-7 9.6-4.2-1.9-7-5.3-7-9.6V5.8z" {...D} />
  <rect x="9.2" y="10.6" width="5.6" height="4.4" rx="1.1" {...A} />
  <path d="M10.4 10.6V9.4a1.6 1.6 0 0 1 3.2 0v1.2" {...A} />
</Icon>;

export const IconApi = (p: IconProps) => <Icon {...p}>
  <circle cx="5.5" cy="12" r="2.2" {...D} />
  <circle cx="18.5" cy="6" r="2.2" {...D} />
  <circle cx="18.5" cy="18" r="2.2" {...D} />
  <path d="M7.6 11l8.8-4M7.6 13l8.8 4" {...A} />
</Icon>;

export const IconDatabase = (p: IconProps) => <Icon {...p}>
  <ellipse cx="12" cy="6" rx="7" ry="2.8" {...D} />
  <path d="M5 6v12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V6" {...D} />
  <path d="M5 12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8" {...A} />
</Icon>;

export const IconCloud = (p: IconProps) => <Icon {...p}>
  <path d="M7 18.5a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 17.1 9.3 4.6 4.6 0 0 1 17.5 18.5z" {...D} />
  <path d="M12 12.2v4.6M10.2 14l1.8-1.8 1.8 1.8" {...A} />
</Icon>;

export const IconRocket = (p: IconProps) => <Icon {...p}>
  <path d="M14.5 4.2C17.3 4 19.3 4.9 20 5.2c.3.7 1.2 2.7 1 5.5-1 2.7-3.6 5.4-6.6 6.9l-4.5-4.5C11.4 10.3 13.2 6.2 14.5 4.2z" {...D} />
  <circle cx="15.2" cy="8.8" r="1.4" {...A} />
  <path d="M9.9 13.1l-3 .6-2.2 2.4 3.2.4M10.9 14.1l-.6 3-2.4 2.2-.4-3.2" />
  <path d="M5 19l-1 1" {...A} />
</Icon>;

/** Mapowanie id warstwy z `three/layers.ts` na ikonę. */
export const layerIcons = {
  design: IconDesign,
  frontend: IconFrontend,
  auth: IconShield,
  backend: IconApi,
  database: IconDatabase,
  cloud: IconCloud,
  deployment: IconRocket,
} as const;

/* —— Kontakt / social —— */
export const IconMail = (p: IconProps) => <Icon {...p}>
  <rect x="3" y="5.5" width="18" height="13" rx="2.5" {...D} />
  <path d="M4 7.5l8 6 8-6" {...A} />
</Icon>;

export const IconPhone = (p: IconProps) => <Icon {...p}>
  <path d="M6.6 3.8h2.4l1.3 3.6-1.7 1.3a10.4 10.4 0 0 0 5.7 5.7l1.3-1.7 3.6 1.3v2.4a2 2 0 0 1-2.2 2C10.6 18 6 13.4 4.6 6a2 2 0 0 1 2-2.2z" {...D} />
  <path d="M14.5 4.5a5 5 0 0 1 5 5M14.5 7.5a2 2 0 0 1 2 2" {...A} />
</Icon>;

export const IconPin = (p: IconProps) => <Icon {...p}>
  <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21z" {...D} />
  <circle cx="12" cy="10" r="2.3" {...A} />
</Icon>;

export const IconGithub = (p: IconProps) => <Icon {...p}>
  <path d="M9 19c-4 1.2-4-2-5.6-2.5M14.5 21v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.3 11.3 0 0 0-6 0C6.1 2.9 5.1 3.2 5.1 3.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.7 9.6c0 4.7 2.8 5.7 5.5 6a2.8 2.8 0 0 0-.8 2.2V21" {...D} />
</Icon>;

export const IconInstagram = (p: IconProps) => <Icon {...p}>
  <rect x="3.5" y="3.5" width="17" height="17" rx="5" {...D} />
  <circle cx="12" cy="12" r="3.8" {...A} />
  <path d="M17 7h.01" />
</Icon>;

export const IconFacebook = (p: IconProps) => <Icon {...p}>
  <path d="M14.5 21v-8h2.7l.5-3.2h-3.2V7.9c0-.9.4-1.6 1.7-1.6h1.6V3.5a18 18 0 0 0-2.4-.2c-2.5 0-4 1.5-4 4.1v2.4H8.3V13H11v8" {...D} />
</Icon>;

/* —— UI —— */
export const IconArrowUpRight = (p: IconProps) => <Icon {...p} className={`ew-arrow ${p.className ?? ""}`.trim()}>
  <path d="M7 17L17 7" />
  <path d="M8.5 7H17v8.5" />
</Icon>;

export const IconArrowDown = (p: IconProps) => <Icon {...p} className={`ew-arrow ${p.className ?? ""}`.trim()}>
  <path d="M12 5v14M6 13l6 6 6-6" />
</Icon>;

export const IconQuote = (p: IconProps) => <Icon {...p}>
  <path d="M10 7.5C7 8 5 10.3 5 13.5V17h5v-5H7.2c.1-1.6 1-2.6 2.8-3z" {...D} />
  <path d="M19 7.5C16 8 14 10.3 14 13.5V17h5v-5h-2.8c.1-1.6 1-2.6 2.8-3z" {...A} />
</Icon>;

export const IconStar = ({ filled = false, ...p }: IconProps & { filled?: boolean }) => <Icon {...p} fill={filled ? "currentColor" : "none"}>
  <path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
</Icon>;

export const IconCheck = (p: IconProps) => <Icon {...p}>
  <circle cx="12" cy="12" r="8.5" {...D} />
  <path d="M8.5 12.3l2.5 2.5 4.5-5" {...A} />
</Icon>;

export const IconAlert = (p: IconProps) => <Icon {...p}>
  <circle cx="12" cy="12" r="8.5" {...D} />
  <path d="M12 7.8v5M12 16.2h.01" {...A} />
</Icon>;

export const IconSend = (p: IconProps) => <Icon {...p} className={`ew-arrow ${p.className ?? ""}`.trim()}>
  <path d="M4 12l16-7-6.5 15-2.5-6z" />
  <path d="M11 14l9-9" className="ew-accent" />
</Icon>;

/** Animowana ikona menu: dwie kreski morfują w „X” (stan przez aria-expanded rodzica). */
export const IconMenu = (p: IconProps) => <Icon {...p} className={`ew-menu ${p.className ?? ""}`.trim()}>
  <path className="ew-menu-top" d="M5 9h14" />
  <path className="ew-menu-bottom" d="M5 15h14" />
</Icon>;

/** Znak marki — ten sam glif co favicon (chevron + kursor). */
export function BrandMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" className={`ew-mark ${className}`.trim()} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ew-mark-g" x1="150" y1="170" x2="390" y2="342" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f1f8fc" />
          <stop offset="1" stopColor="#8fc0de" />
        </linearGradient>
      </defs>
      <path d="M158 172 252 256l-94 84" fill="none" stroke="url(#ew-mark-g)" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
      <path className="ew-mark-cursor" d="M290 342h96" fill="none" stroke="#acd1e8" strokeWidth="52" strokeLinecap="round" />
    </svg>
  );
}

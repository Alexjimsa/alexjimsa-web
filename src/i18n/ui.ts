// src/i18n/ui.ts
export const ui = {
  es: {
    nav: { about: "Sobre mí", projects: "Proyectos", blog: "Blog" },
    hero: {
      hey: "Hey, soy Álex",
      roles: ["Desarrollador web", "Geólogo", "Analista GIS"],
    },
  },
  en: {
    nav: { about: "About", projects: "Projects", blog: "Blog" },
    hero: {
      hey: "Hey, I'm Alex",
      roles: ["Web developer", "Geologist", "GIS analyst"],
    },
  },
} as const;

export type Locale = keyof typeof ui; // 'es' | 'en'

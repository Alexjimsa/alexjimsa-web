// src/i18n/ui.ts
export const ui = {
  es: {
    nav: {
      about: "Sobre mí",
      projects: "Proyectos",
      blog: "Blog",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      blog: "Blog",
    },
  },
} as const;

export type Locale = keyof typeof ui; // 'es' | 'en'

// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- Common (shared frontmatter) ---
const common = z.object({
  lang: z.enum(['es', 'en']),
  title: z.string(),
  excerpt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  heroImage: z.string().optional(),     // (si algún día usas image(), ya lo cambiamos)
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(), // kebab-case; requerido al publicar
  translationKey: z.string().optional(), // <- clave común ES/EN para emparejar
});

// --- Pages (About) ---
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: common.extend({
    pageId: z.literal('about'),
    // No necesitamos translationKey aquí (la ruta es fija /about y /en/about),
    // pero si quisieras emparejar por key, deja translationKey como opcional.
  }),
});

// --- Blog ---
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: common.extend({
    date: z.coerce.date().optional(),
    published: z.boolean().default(false),
    tags: z.array(z.string()).default([]),

    // i18n helpers:
    translationKey: z.string(),                // <- REQUERIDO en blog
    original: z.enum(['es', 'en']).optional(), // idioma original (para "Ver original")
    canonicalUrl: z.string().url().optional(), // si re-publicas en Medium, etc. (opcional)
  }).superRefine((data, ctx) => {
    if (data.published) {
      if (!data.date) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'If "published" is true, "date" is required.', path: ['date'] });
      }
      if (!data.slug) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'If "published" is true, "slug" is required.', path: ['slug'] });
      }
      if (!data.translationKey) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'If "published" is true, "translationKey" is required.', path: ['translationKey'] });
      }
    }
  }),
});

// --- Projects ---
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: common.extend({
    // i18n: emparejamos versiones
    translationKey: z.string(), // <- REQUERIDO en projects
    published: z.boolean().default(true),

    // Orden/estado
    date: z.coerce.date().optional(),     // fin (si completed)
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['in-progress', 'completed']).default('completed'),
    startedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }).superRefine((data, ctx) => {
    if (data.published && !data.slug) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'If "published" is true, "slug" is required.', path: ['slug'] });
    }
    if (data.status === 'completed' && !data.date) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Completed projects require "date".', path: ['date'] });
    }
  }),
});

export const collections = { pages, blog, projects };

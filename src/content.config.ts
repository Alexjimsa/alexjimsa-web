// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- Esquema común ---
const common = z.object({
  lang: z.enum(['es', 'en']),
  title: z.string(),
  excerpt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  heroImage: z.string().optional(), // más adelante: image() si te interesa
  slug: z.string().optional(),      // si lo pones, sobreescribe el id (docs)
});

// --- Pages (About) ---
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: common.extend({
    pageId: z.literal('about'),
  }),
});

// --- Blog ---
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: common.extend({
    date: z.coerce.date().optional(),
    published: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    // usamos el slug del frontmatter para URLs limpias
    slug: z.string().regex(/^[a-z0-9-]+$/).optional(), // kebab-case
  }).superRefine((data, ctx) => {
    if (data.published) {
      if (!data.date) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'If "published" is true, "date" is required.', path: ['date'] });
      }
      if (!data.slug) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'If "published" is true, "slug" is required.', path: ['slug'] });
      }
    }
  }),
});


// --- Projects ---
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: common.extend({
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { pages, blog, projects };
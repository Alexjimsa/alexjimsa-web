// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx'; // ← official MDX

// https://docs.astro.build/config
export default defineConfig({
  integrations: [mdx()], // ← activate MDX
});

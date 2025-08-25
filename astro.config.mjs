// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://docs.astro.build/config
export default defineConfig({
  integrations: [mdx()], // ← activate MDX
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false // ES without prefix; EN with /en/ (recommended pattern)
    }
  }
});

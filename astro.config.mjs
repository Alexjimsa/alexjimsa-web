// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://docs.astro.build/config
export default defineConfig({
  integrations: [mdx(), react()], // ← activate MDX and React
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false // ES without prefix; EN with /en/ (recommended pattern)
    }
  }
});

// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://heymeowcat.is-a.dev',
  base: '/noteguard-site',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  }
});

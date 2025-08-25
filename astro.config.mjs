// astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://xiaosihuang003.github.io',
  vite: { plugins: [tailwind()] },
  integrations: [sitemap()],
  redirects: {
    '/': '/en/',
    '/about': '/en/about',
    '/projects': '/en/projects',
  },
})

// astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@tailwindcss/vite'

// ⬇️ Add MDX + math rendering
import mdx from '@astrojs/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
  site: 'https://xiaosihuang003.github.io',
  vite: { plugins: [tailwind()] },

  // Enable LaTeX for both .md and .mdx
  integrations: [
    sitemap(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],

  // Ensure plain .md also uses the math pipeline
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  redirects: {
    '/': '/en/',
    '/about': '/en/about',
    '/projects': '/en/projects',
  },
})

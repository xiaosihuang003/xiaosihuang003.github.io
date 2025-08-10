// @ts-check
//import { defineConfig } from 'astro/config';

//import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
//export default defineConfig({
//  site: 'https://xiaosihuang003.github.io',
// vite: {
//   plugins: [tailwindcss()]
// }
//});

// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';   // ← v4 正确写法

export default defineConfig({
  site: 'https://xiaosihuang003.github.io',
  vite: {
    plugins: [tailwind()],                  // 用 Vite 插件方式启用 Tailwind
  },
  integrations: [sitemap()],                // 只保留 sitemap 集成
});

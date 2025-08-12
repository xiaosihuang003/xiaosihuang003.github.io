// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en','fi','sv','zh','yue']),
    date: z.coerce.date(),            // ✅ 接受 "2025-03-02" 或真正的 Date
    summary: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };

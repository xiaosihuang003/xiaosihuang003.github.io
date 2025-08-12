// src/content.config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    date: z.coerce.date(),              // ✅ 关键：自动把字符串/Date 转成 Date
    lang: z.enum(["en","fi","sv","zh","yue"]),
    tags: z.array(z.string()).default([]),
    vizUrl: z.string().url().optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    year: z.number(),                   // 这行是你之前缺的字段
    lang: z.enum(["en","fi","sv","zh","yue"]),
    tech: z.array(z.string()).default([]),
    cover: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

export const collections = { blog, projects };

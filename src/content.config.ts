// src/content.config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),              // 用 "2025-01-20" 这种字符串
    lang: z.enum(["en","fi","sv","zh","yue"]),
    tags: z.array(z.string()).default([]),
    vizUrl: z.string().url().optional(), // 对应你的 Tableau 链接
    cover: z.string().optional(),        // 可选封面
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    lang: z.enum(["en","fi","sv","zh","yue"]),
    tech: z.array(z.string()).default([]),
    cover: z.string().optional(),
    url: z.string().url().optional(),    // 外链（Tableau/文章/报告）
  }),
});

export const collections = { blog, projects };

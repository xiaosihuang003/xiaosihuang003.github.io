// src/content.config.ts
import { defineCollection, z } from "astro:content";

const Lang = z.enum(["en", "fi", "sv", "yue", "zh"]);

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),                 // 这里用 z.date()
    lang: Lang,
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    excerpt: z.string().max(280).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
  }),
});

// 顺便把 projects 定义上，去掉启动时的黄色提示
const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lang: Lang,
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };

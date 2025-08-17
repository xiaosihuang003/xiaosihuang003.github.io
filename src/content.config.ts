// src/content.config.ts
import { defineCollection, z } from "astro:content";

const Lang = z.enum(["en", "fi", "sv", "yue", "zh", "no"]); 

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    lang: Lang,
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    // ✅ 新增：封面图片来源（文字与链接，任选其一或都填）
    coverCredit: z.string().optional(),
    coverCreditUrl: z.string().url().optional(),

    excerpt: z.string().max(280).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
  }),
});

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

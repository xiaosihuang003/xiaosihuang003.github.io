// src/content/config.ts
import { defineCollection, z } from "astro:content";

const languages = z.enum(["en", "fi", "sv", "yue", "zh"]);

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),                 // 前言里写 "YYYY-MM-DD"
    lang: languages,
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    excerpt: z.string().max(280).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
  }),
});

export const collections = {
  blog,
  // ...如果你还有别的 collections 也放这里
};

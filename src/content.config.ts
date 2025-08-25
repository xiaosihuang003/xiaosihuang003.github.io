// src/content.config.ts
import { defineCollection, z } from "astro:content";

// 语言枚举
const Lang = z.enum(["en", "fi", "no", "sv", "zh", "yue"]);

const blog = defineCollection({
  type: "content",
  // ❗不强制 frontmatter 里写 lang
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    // '2025-08-12' 这类字符串
    date: z.coerce.date(),
    // 可选：语言将从路径推断（如 blog/my-slug/en.md → en）
    lang: Lang.optional(),

    cover: z.string().optional(),
    coverAlt: z.string().optional(),
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
    date: z.coerce.date(),
    // 同理：不强制 frontmatter 写 lang
    lang: Lang.optional(),

    excerpt: z.string().max(280).optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),

    role: z.string().optional(),
    stack: z.array(z.string()).optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    results: z.array(z.string()).optional(),
    company: z.string().optional(),
    status: z.enum(["live", "wip", "archived"]).optional(),
    draft: z.boolean().default(false),
  }),
});

/** ✅ 新增：技术文档集合（结构沿用 blog，避免影响样式与页面逻辑） */
const docs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    lang: Lang.optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverCredit: z.string().optional(),
    coverCreditUrl: z.string().url().optional(),
    excerpt: z.string().max(280).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
  }),
});

export const collections = { blog, projects, docs };

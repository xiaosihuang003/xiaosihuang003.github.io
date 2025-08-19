// src/content.config.ts
import { defineCollection, z } from "astro:content";

const Lang = z.enum(["en","fi","sv","yue","zh","no"]);

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    lang: Lang,
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
    date: z.date(),            // 用来排序
    lang: Lang,
    excerpt: z.string().max(280).optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),

    // ✅ 新增但可选：
    role: z.string().optional(),              // 你的角色：Data Analyst / Developer …
    stack: z.array(z.string()).optional(),    // 技术栈：Python / Pandas / Tableau …
    repo: z.string().url().optional(),        // GitHub 仓库
    demo: z.string().url().optional(),        // 在线 Demo / Tableau Public
    results: z.array(z.string()).optional(),  // 结果/成效/数字（2~4条短句）
    company: z.string().optional(),           // 若有甲方/学校/竞赛
    status: z.enum(["live","wip","archived"]).optional(), // 状态徽标
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };

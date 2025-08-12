import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    cover: z.string().optional(),   // /assets/cover.png
    date: z.string(),               // "2025-08-12"
    tags: z.array(z.string()).default([]),
    lang: z.enum(["en","fi","sv","zh","yue"]),
    links: z.object({
      live: z.string().url().optional(),
      repo: z.string().url().optional(),
      tableau: z.string().url().optional()
    }).optional()
  })
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    lang: z.enum(["en","fi","sv","zh","yue"]),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { projects, posts };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One .mdx file per project in src/content/projects.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    tags: z.array(z.string()).default([]),
    // Tile background color for the project card.
    color: z.string().default('#e9e3d3'),
    link: z.string().url().optional(),
    repo: z.string().url().optional(),
    featured: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

// One .md file per job / role in src/content/experience.
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    org: z.string(),
    role: z.string(),
    start: z.string(), // e.g. "2024-06"
    end: z.string().optional(), // omit = present
    location: z.string().optional(),
    url: z.string().url().optional(),
    summary: z.string(),
  }),
});

export const collections = { projects, experience };

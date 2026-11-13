import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One .mdx file per project in src/content/projects.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // Product framing shown on the card: your role and the outcome.
    role: z.string(),
    impact: z.string(),
    // Which group on the home page this card sits in (see workGroups in src/data/site.ts).
    group: z.enum(['google', 'tableau', 'berkeley', 'side', 'utk']),
    year: z.number().optional(),
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

// One .md file per reference in src/content/references.
// A reference is not a favorite: it's the exact moment that stayed with you, and why.
// Keep this shape stable. It's the same model a future references app would use,
// and it's exported publicly at /references.json.
const references = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/references' }),
  schema: ({ image }) =>
    z.object({
      // 01 · The reference: what stayed with you.
      title: z.string(),
      source: z.object({
        name: z.string(), // "The Return of the King"
        creator: z.string().optional(), // "Peter Jackson", "Jeff Buckley"
        year: z.number().optional(),
      }),
      category: z.enum(['Music', 'Film', 'Sport', 'Words', 'Tech', 'Food', 'Other']),
      // 02 · The moment: what exactly.
      moment: z.string(),
      // 03 · The meaning: why it stayed with you. Short is fine.
      meaning: z.string(),
      // 04 · The feeling: what it represents. These connect references across categories.
      feelings: z.array(z.string()).min(1),
      // Point at the moment instead of hosting it (e.g. a YouTube link with ?t=).
      link: z.string().url().optional(),
      // Optional image you have the rights to, placed next to the .md file.
      image: image().optional(),
      imageAlt: z.string().optional(),
      added: z.coerce.date(),
      // private = kept in the repo but never built into the site or the export.
      visibility: z.enum(['public', 'private']).default('public'),
      featured: z.boolean().default(false),
    }),
});

export const collections = { projects, experience, references };

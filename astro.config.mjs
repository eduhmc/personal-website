import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// TODO: set to your real domain once you have one.
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx()],
});

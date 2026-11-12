import type { APIRoute } from 'astro';
import { getPublicReferences } from '../lib/references';
import { site } from '../data/site';

// Public references as plain data: the seed of a future references app.
// Images are left out; each entry links back to its page on this site.
export const GET: APIRoute = async ({ site: origin }) => {
  const refs = await getPublicReferences();
  const body = {
    owner: site.name,
    version: 1,
    references: refs.map(({ id, data }) => ({
      id,
      title: data.title,
      source: data.source,
      category: data.category,
      moment: data.moment,
      meaning: data.meaning,
      feelings: data.feelings,
      link: data.link ?? null,
      added: data.added.toISOString().slice(0, 10),
      url: new URL(`/references/${id}`, origin).href,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } });
};

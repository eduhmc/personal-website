import { getCollection, type CollectionEntry } from 'astro:content';

export type Reference = CollectionEntry<'references'>;

// Tile color per category (used when a reference has no image).
export const categoryColor: Record<Reference['data']['category'], string> = {
  Music: '#f6d6d0',
  Film: '#e4dcf3',
  Sport: '#e2efdc',
  Words: '#faecc0',
  Tech: '#dfe9f7',
  Food: '#f3e3d3',
  Other: '#e9e3d3',
};

/** Public references only, newest first. Private ones never leave the repo. */
export async function getPublicReferences(): Promise<Reference[]> {
  const all = await getCollection('references', (r) => r.data.visibility === 'public');
  return all.sort((a, b) => b.data.added.getTime() - a.data.added.getTime() || a.data.title.localeCompare(b.data.title));
}

/** Group references by a key; a reference can land in several groups. Biggest groups first. */
export function groupBy(refs: Reference[], keys: (r: Reference) => string[]): [string, Reference[]][] {
  const groups = new Map<string, Reference[]>();
  for (const r of refs) {
    for (const k of keys(r)) {
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k)!.push(r);
    }
  }
  return [...groups].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

export const sourceLine = (r: Reference) =>
  [r.data.source.name, r.data.source.creator, r.data.source.year].filter(Boolean).join(' · ');

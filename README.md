# personal-website

My personal site — Astro + React islands + MDX.

## Run it

Needs Node 22+ (`.nvmrc`).

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

## Where things live

| What | File |
|---|---|
| Name, intro sentence, facts card, about, now, links, education, skills | `src/data/site.ts` |
| Things I like (dot-grid icons + game) | `src/data/likes.ts` |
| Projects (one file each, becomes /projects/<file-name>) | `src/content/projects/*.mdx` |
| Jobs / experience | `src/content/experience/*.md` |
| Colors, fonts, spacing | `src/styles/global.css` |
| Resume PDF (download button on /cv appears automatically) | `public/resume.pdf` |

Anything in `[brackets]` is a placeholder.

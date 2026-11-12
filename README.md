# personal-website

My personal site — Astro + MDX.

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
| Projects (one file each, becomes /projects/<file-name>) | `src/content/projects/*.mdx` |
| Jobs / experience | `src/content/experience/*.md` |
| References: moments that stayed with you (`visibility: private` keeps one off the site) | `src/content/references/*.md` |
| Colors, fonts, spacing | `src/styles/global.css` |
| Resume PDF (download button on /cv appears automatically) | `public/resume.pdf` |

Anything in `[brackets]` is a placeholder.

Public references are also exported as data at `/references.json`.

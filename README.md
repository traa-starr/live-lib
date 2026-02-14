# Living Library (Universal Law School)

## What changed

- Upgraded to a multi-route app with premium UI motion and a reusable design system.
- Added advanced library interactions: debounced search, filters, sorting, keyboard shortcuts, and accessible modal detail view.
- Added a richer transmissions archive with timeline navigation and dedicated reading pages.
- Preserved content model: `src/data/resources.json` and `src/content/transmissions/*.md` remain canonical sources.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content model

### Resources

Edit `src/data/resources.json`.

Each resource supports:

```json
{
  "id": "unique-id",
  "title": "...",
  "author": "...",
  "year": 2024,
  "type": "book",
  "tags": ["topic-a", "topic-b"],
  "level": "beginner",
  "status": "established",
  "annotation": "...",
  "citation": "...",
  "url": "https://...",
  "impact": 80
}
```

Missing optional fields are normalized in `src/lib/resources.js`.

### Transmissions

Add markdown files inside `src/content/transmissions/`.

Frontmatter is preferred:

```md
---
date: 2026-01-20
title: Sample Transmission
tags: [methods, archive]
---

# Optional heading
Body text here.
```

Fallback parsing in `src/lib/transmissions.js` can infer metadata from filename (`YYYY-MM-DD-title.md`), first H1, and a `Tags:` line.

## Project structure

- `src/pages/*` route-level pages
- `src/components/*` reusable feature components
- `src/ui/*` design system primitives
- `src/lib/*` data normalization and parsing

## Notes

- Router paths: `/`, `/library`, `/transmissions`, `/transmissions/:slug`, `/about`
- Motion uses Framer Motion with reduced-motion support.
- Markdown is rendered with `react-markdown` + `remark-gfm`.

## Optional formatting and linting

You can add your preferred linting stack (ESLint + Prettier) if your deployment workflow requires it.

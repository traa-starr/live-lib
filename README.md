# Living Library (Universal Law School)

 codex/create-living-library-module-with-react-93kurp
## What changed

- Upgraded to a multi-route app with premium UI motion and a reusable design system.
- Added advanced library interactions: debounced search, filters, sorting, keyboard shortcuts, and accessible modal detail view.
- Added a richer transmissions archive with timeline navigation and dedicated reading pages.
- Preserved content model: `src/data/resources.json` and `src/content/transmissions/*.md` remain canonical sources.

## Run locally

A standalone React + Tailwind module that can later be embedded into a Shopify theme app extension.

## Features

- Resource Library sourced from `src/data/resources.json`.
- Keyword search across title, author, and annotation.
- Filter chips for Topic, Type, Level, and Status.
- Clickable resource cards with a detail modal showing full annotation and citation.
- Transmission page that loads Markdown posts from `src/content/transmissions/*.md`.
- Modular component structure to simplify future migration into a Shopify extension.

## Tech stack

- React (hooks)
- Tailwind CSS
- Vite
- Marked (for Markdown rendering)

## Local setup
 main

```bash
npm install
npm run dev
```

 codex/create-living-library-module-with-react-93kurp

Open `http://localhost:5173`.

 main
## Build

```bash
npm run build
npm run preview
```

 codex/create-living-library-module-with-react-93kurp
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

## Content management

### Add or replace resources

1. Edit `src/data/resources.json`.
2. Keep each resource object in this shape:

```json
{
  "title": "...",
  "author": "...",
  "year": 2025,
  "type": "book",
  "topicTags": ["..."] ,
  "level": "beginner",
  "status": "established",
  "annotation": "...",
  "citation": "..."
}
```

> `year` is optional.

### Add transmission posts

1. Create a new `.md` file in `src/content/transmissions/`.
2. Include frontmatter and markdown body:
 main

```md
---
date: 2026-01-20
title: Sample Transmission
 codex/create-living-library-module-with-react-93kurp
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

tags: [updates, methods]
---

Your markdown body here.
```

Posts are automatically discovered and rendered in reverse chronological order.

## Notes for future Shopify embedding

- `LibraryPage` currently imports local JSON directly. Swap that import for app-provided data while preserving resource shape.
- Components are intentionally decoupled (`ResourceCard`, `FilterChips`, `ResourceDetailModal`, `TransmissionPage`) to make extraction into a theme app extension easier.
 main

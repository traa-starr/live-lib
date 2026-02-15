# Living Library

Premium Vite + React app for a no-code knowledge pipeline: markdown content in-repo, strict metadata validation, searchable indexing, and cinematic UI.

## Development

```bash
npm install
npm run dev
npm run build
```

## Routes

- `/` landing + manifesto + featured shelves
- `/library` search/index engine for resources and transmissions
- `/transmissions` transmission archive
- `/transmissions/:slug` transmission detail
- `/about` project overview

## No-code content pipeline

Drop markdown files into:

- `content/resources/*.md`
- `content/transmissions/*.md`
- `content/authors/*.md` (optional)

The loaders live in:

- `src/lib/content/loadResources.js`
- `src/lib/content/loadTransmissions.js`

They parse frontmatter, validate required schema fields with helpful errors, compute transmission `readingTime`, and extract h2/h3 headings for mini TOC.

### Resource frontmatter schema

```md
---
title: "Attention as Infrastructure"
slug: "attention-as-infrastructure"
type: "article"
tags: [cognition, systems]
url: "https://example.org/resource"
creator: "Mira Sol"
year: 2025
description: "What this resource adds."
cover: "/media/cover.jpg" # optional
featured: true # optional
embeds: # optional
  - kind: youtube
    url: https://www.youtube.com/watch?v=...
    title: Clip
---
```

### Transmission frontmatter schema

```md
---
title: "Reading Protocol"
slug: "reading-protocol"
date: "2026-01-12"
tags: [reading, synthesis]
summary: "One paragraph summary"
cover: "/media/cover.jpg" # optional
audio: "https://...mp3" # optional
video: "https://youtube.com/watch?v=..." # optional
embeds: # optional
  - kind: quote
    title: Key line
    caption: If it doesn't change a choice, it wasn't integrated.
---
```

## Optional CMS (Decap)

Files:

- `public/admin/index.html`
- `public/admin/config.yml`

To enable:

1. Update `backend.repo` in `config.yml`.
2. Configure GitHub OAuth for Decap CMS.
3. Visit `/admin` in dev or production.

If auth is not configured, the app still runs normally.

# Living Library (Universal Law School)

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

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

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

```md
---
date: 2026-01-20
title: Sample Transmission
tags: [updates, methods]
---

Your markdown body here.
```

Posts are automatically discovered and rendered in reverse chronological order.

## Notes for future Shopify embedding

- `LibraryPage` currently imports local JSON directly. Swap that import for app-provided data while preserving resource shape.
- Components are intentionally decoupled (`ResourceCard`, `FilterChips`, `ResourceDetailModal`, `TransmissionPage`) to make extraction into a theme app extension easier.

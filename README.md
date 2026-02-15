# Living Library

Premium Vite + React app with a dark-first UI, searchable knowledge engine, markdown content pipeline, and Decap CMS at `/admin`.

## Development

```bash
npm install
npm run dev
```

## Key Routes

- `/` premium landing and featured content
- `/library` searchable resource engine
- `/transmissions` archive
- `/transmissions/:slug` detail
- `/about` overview
- `/admin` Decap CMS

## Content Pipeline

Add markdown files to:

- `content/resources/*.md`
- `content/transmissions/*.md`

Validate content locally/CI:

```bash
npm run content:check
```

## Frontmatter Highlights

Resources support:

- `featured` (optional boolean)
- `cover` (optional string)
- `embeds` (optional array of `{ type, url, title?, caption? }`)

Transmissions support:

- `date` (optional string / ISO format)
- `cover` (optional string)
- `embeds` (optional array with the same embed schema)

Allowed embed types:

- `youtube`
- `spotify`
- `soundcloud`
- `applepodcasts`
- `audio`
- `image`
- `video`
- `link`

## CMS

Decap CMS config:

- `public/admin/index.html`
- `public/admin/config.yml`

Content editors can add/update entries directly in `content/resources` and `content/transmissions` through `/admin`.

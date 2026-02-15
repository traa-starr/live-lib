function toYoutubeEmbed(url, start) {
  const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
  if (!id) return null;
  const params = new URLSearchParams({ rel: '0', modestbranding: '1' });
  if (start) params.set('start', String(start));
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function toVimeoEmbed(url) {
  const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
  return id ? `https://player.vimeo.com/video/${id}` : null;
}

function toSpotifyEmbed(url) {
  const path = url.replace('https://open.spotify.com/', '').split('?')[0];
  return path ? `https://open.spotify.com/embed/${path}` : null;
}

function toSoundCloudEmbed(url) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
}

function Wrapper({ title, caption, children, link }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-[var(--text)]">{title || 'Media embed'}</h4>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="text-xs text-[var(--accent)] underline-offset-2 hover:underline">
            Open in new tab
          </a>
        )}
      </div>
      {children}
      {caption && <p className="mt-3 text-sm text-[var(--muted)]">{caption}</p>}
    </article>
  );
}

export default function EmbedRenderer({ embed }) {
  if (!embed?.kind) return null;

  if (embed.kind === 'quote') {
    return (
      <Wrapper title={embed.title} caption={embed.caption}>
        <blockquote className="border-l-2 border-[var(--accent)] pl-4 text-sm text-slate-100">{embed.caption}</blockquote>
      </Wrapper>
    );
  }

  if (embed.kind === 'image') {
    return (
      <Wrapper title={embed.title} caption={embed.caption} link={embed.url}>
        <img src={embed.url} alt={embed.title || 'Embedded visual'} className="aspect-video w-full rounded-xl object-cover" loading="lazy" />
      </Wrapper>
    );
  }

  if (embed.kind === 'audio') {
    return (
      <Wrapper title={embed.title} caption={embed.caption} link={embed.url}>
        {embed.poster && <img src={embed.poster} alt="" className="mb-3 aspect-video w-full rounded-xl object-cover" />}
        <audio controls className="w-full" src={embed.url} preload="none" />
      </Wrapper>
    );
  }

  if (embed.kind === 'link') {
    return (
      <Wrapper title={embed.title} caption={embed.caption} link={embed.url}>
        <a href={embed.url} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-100">
          {embed.url}
        </a>
      </Wrapper>
    );
  }

  const srcMap = {
    youtube: toYoutubeEmbed(embed.url, embed.start),
    vimeo: toVimeoEmbed(embed.url),
    spotify: toSpotifyEmbed(embed.url),
    soundcloud: toSoundCloudEmbed(embed.url),
  };

  const src = srcMap[embed.kind];
  if (!src) return null;

  const frameClass = embed.kind === 'spotify' ? 'h-[232px]' : 'aspect-video';

  return (
    <Wrapper title={embed.title} caption={embed.caption} link={embed.url}>
      <iframe
        src={src}
        title={embed.title || embed.kind}
        className={`w-full rounded-xl border-0 ${frameClass}`}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </Wrapper>
  );
}

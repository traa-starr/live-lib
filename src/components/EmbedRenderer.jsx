import { useMemo, useState } from 'react';
import { ExternalLink, Link2 } from 'lucide-react';

function Wrapper({ title, caption, sourceUrl, children }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]/85 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-[var(--text)]">{title || 'Embedded media'}</h4>
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
          >
            Open source
            <ExternalLink size={12} />
          </a>
        )}
      </div>
      {children}
      {caption && <p className="mt-3 text-sm text-[var(--muted)]">{caption}</p>}
    </article>
  );
}

function buildYoutubeEmbed(url) {
  if (!url) return null;
  if (url.includes('youtube-nocookie.com/embed/')) return url;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  if (!match?.[1]) return null;
  return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1`;
}

function buildSpotifyEmbed(url) {
  if (!url) return null;
  if (url.includes('/embed/')) return url;
  if (!url.includes('open.spotify.com/')) return null;
  const path = url.split('open.spotify.com/')[1]?.split('?')[0];
  return path ? `https://open.spotify.com/embed/${path}` : null;
}

function buildSoundCloudEmbed(url) {
  if (!url) return null;
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=false&show_comments=false&show_user=true&visual=true`;
}

function buildApplePodcastEmbed(url) {
  if (!url) return null;
  if (url.includes('embed.podcasts.apple.com')) return url;
  if (url.includes('podcasts.apple.com')) {
    return url.replace('https://podcasts.apple.com/', 'https://embed.podcasts.apple.com/');
  }
  return null;
}

function Fallback({ url, message = 'Embed unavailable in this environment.' }) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--panel2)]/70 p-4 text-sm text-[var(--muted)]">
      <p>{message}</p>
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[var(--accent)]">
          Open link
          <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}

function LinkCard({ embed }) {
  const hostname = useMemo(() => {
    try {
      return new URL(embed.url).hostname.replace(/^www\./, '');
    } catch {
      return 'External link';
    }
  }, [embed.url]);

  return (
    <a
      href={embed.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl border border-[var(--border)] bg-[var(--panel2)]/65 p-4 transition hover:border-[var(--accent)]/55"
    >
      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        <Link2 size={12} />
        {hostname}
      </p>
      <p className="mt-2 text-sm font-medium text-[var(--text)]">{embed.title || embed.url}</p>
      {embed.caption && <p className="mt-2 text-sm text-[var(--muted)]">{embed.caption}</p>}
    </a>
  );
}

export default function EmbedRenderer({ embed }) {
  const [mediaError, setMediaError] = useState(false);
  const type = embed?.type || embed?.kind;
  if (!type) return null;

  if (type === 'link') {
    return (
      <Wrapper title={embed.title} caption={embed.caption} sourceUrl={embed.url}>
        <LinkCard embed={embed} />
      </Wrapper>
    );
  }

  if (type === 'image') {
    if (!embed.url) {
      return (
        <Wrapper title={embed.title} caption={embed.caption}>
          <Fallback />
        </Wrapper>
      );
    }

    return (
      <Wrapper title={embed.title} caption={embed.caption} sourceUrl={embed.url}>
        {mediaError ? (
          <Fallback url={embed.url} message="Image failed to load here." />
        ) : (
          <img
            src={embed.url}
            alt={embed.title || 'Embedded visual'}
            className="max-h-[26rem] w-full rounded-xl object-cover"
            loading="lazy"
            onError={() => setMediaError(true)}
          />
        )}
      </Wrapper>
    );
  }

  if (type === 'audio') {
    return (
      <Wrapper title={embed.title} caption={embed.caption} sourceUrl={embed.url}>
        {mediaError ? (
          <Fallback url={embed.url} message="Audio playback failed in this environment." />
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-black/25 p-3">
            <audio
              controls
              className="w-full"
              src={embed.url}
              preload="none"
              onError={() => setMediaError(true)}
            />
          </div>
        )}
      </Wrapper>
    );
  }

  if (type === 'video') {
    return (
      <Wrapper title={embed.title} caption={embed.caption} sourceUrl={embed.url}>
        {mediaError ? (
          <Fallback url={embed.url} message="Video playback failed in this environment." />
        ) : (
          <video
            controls
            preload="metadata"
            className="aspect-video w-full rounded-xl border border-[var(--border)] bg-black"
            src={embed.url}
            onError={() => setMediaError(true)}
          />
        )}
      </Wrapper>
    );
  }

  const iframeByType = {
    youtube: buildYoutubeEmbed(embed.url),
    spotify: buildSpotifyEmbed(embed.url),
    soundcloud: buildSoundCloudEmbed(embed.url),
    applepodcasts: buildApplePodcastEmbed(embed.url) || embed.url,
  };

  const iframeSrc = iframeByType[type];
  if (!iframeSrc) {
    return (
      <Wrapper title={embed.title} caption={embed.caption} sourceUrl={embed.url}>
        <Fallback url={embed.url} message="This embed type could not be rendered automatically." />
      </Wrapper>
    );
  }

  const frameHeight = type === 'spotify' ? 'h-[352px]' : type === 'applepodcasts' ? 'h-[450px]' : 'aspect-video';

  return (
    <Wrapper title={embed.title} caption={embed.caption} sourceUrl={embed.url}>
      <div className={`w-full overflow-hidden rounded-xl border border-[var(--border)] ${frameHeight}`}>
        <iframe
          src={iframeSrc}
          title={embed.title || `${type} embed`}
          className="h-full w-full border-0 bg-black"
          loading="lazy"
          allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">If this preview fails to load, use the source link above.</p>
    </Wrapper>
  );
}

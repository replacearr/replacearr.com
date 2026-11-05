import "./product.css";

const features = [
  {
    title: "Unified media + indexer engine",
    body: "Series, movies, music, books, subtitles, download clients, quality profiles, root folders, calendar, queue, and history live in one Go process — not six *arr containers you have to keep in sync.",
    bullets: [
      "Replaces Sonarr, Radarr, Prowlarr, Lidarr, Readarr, and Bazarr",
      "Native MusicBrainz and OpenLibrary modules",
      "Cardigann YAML indexer catalog + one SQLite database in WAL mode",
    ],
    src: "/images/desktop/02-series.png",
    alt: "Series library in Replacearr",
  },
  {
    title: "Wire-compatible *arr APIs",
    body: "External tools can keep talking the protocols they already know. Replacearr exposes compatibility mounts so you migrate the control plane without rewriting every client.",
    bullets: [
      "Sonarr-, Radarr-, and Prowlarr-shaped prefixes for migration",
      "Native unified API at /api/v1 for the embedded UI",
      "Works with request apps, subtitle tools, and dashboards that expect *arr keys",
    ],
    src: "/images/desktop/21-compatibility.png",
    alt: "Compatibility settings",
  },
  {
    title: "Search without a second indexer box",
    body: "TV and movie search call the indexer engine in-process. No HTTP sync hop between an indexer service and your libraries.",
    bullets: [
      "Torznab / Newznab search paths",
      "Blocklist and grab flow in the same app",
      "Indexer results next to your libraries",
    ],
    src: "/images/desktop/06-indexers-search.png",
    alt: "Indexer search results",
  },
  {
    title: "RBAC and scoped API keys",
    body: "Multi-user roles and keys scoped to the surface each integration needs — without handing every client a god key.",
    bullets: [
      "Built-in roles plus granular permissions",
      "JWT for the UI; X-Api-Key and ?apikey= for clients",
      "Scopes for all or per compatibility surface",
    ],
    src: "/images/desktop/09-users.png",
    alt: "Users and roles",
  },
  {
    title: "Go plugin SDK",
    body: "Ship custom indexers, download clients, or notification hooks as ordinary Go binaries. Plugins run out-of-process over JSON-RPC — no CGO, no shared-library lock-in.",
    bullets: [
      "Public API in pkg/pluginsdk",
      "Marketplace install from a registry.json catalog",
      "Isolated stdio host supervision",
    ],
    src: "/images/desktop/08-plugins.png",
    alt: "Plugins screen",
  },
] as const;

export default function ProductPage() {
  return (
    <div className="page">
      <header className="product-hero">
        <p className="section-kicker">Product</p>
        <h1 className="section-title">Everything the sprawl used to be</h1>
        <p className="section-lede">
          Sonarr, Radarr, Prowlarr, Lidarr, Readarr, and Bazarr — one Go binary instead of six
          processes. Libraries, indexers, users, and plugins under one roof, with a footprint nearer
          ~50 MB than the gigabytes a full *arr stack often idles at.
        </p>
      </header>

      <div className="section feature-list">
        {features.map((feature) => (
          <article key={feature.title} className="feature">
            <div className="feature-copy">
              <h2>{feature.title}</h2>
              <p>{feature.body}</p>
              <ul>
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
            <div className="shot-frame">
              <img
                className="shot"
                src={feature.src}
                alt={feature.alt}
                width={1440}
                height={900}
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

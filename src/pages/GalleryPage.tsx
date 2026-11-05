import "./gallery.css";

const desktop = [
  { src: "01-dashboard.png", caption: "Dashboard" },
  { src: "02-series.png", caption: "Series" },
  { src: "03-movies.png", caption: "Movies" },
  { src: "04-music.png", caption: "Music" },
  { src: "05-books.png", caption: "Books" },
  { src: "06-indexers-search.png", caption: "Indexer search" },
  { src: "07-queue.png", caption: "Queue" },
  { src: "08-plugins.png", caption: "Plugins" },
  { src: "09-users.png", caption: "Users" },
  { src: "20-system-status.png", caption: "System status" },
  { src: "21-compatibility.png", caption: "Compatibility" },
] as const;

const mobile = [
  { src: "01-dashboard.png", caption: "Dashboard" },
  { src: "02-series.png", caption: "Series" },
  { src: "06-indexers-search.png", caption: "Search" },
  { src: "07-queue.png", caption: "Queue" },
] as const;

export default function GalleryPage() {
  return (
    <div className="page">
      <header className="gallery-hero">
        <p className="section-kicker">Gallery</p>
        <h1 className="section-title">The real UI</h1>
        <p className="section-lede">
          Captures from Replacearr itself. Sensitive values are redacted in the source screenshots.
        </p>
      </header>

      <section className="section">
        <div className="gallery-grid">
          {desktop.map((shot) => (
            <figure key={shot.src} className="gallery-item">
              <div className="shot-frame">
                <img
                  src={`/images/desktop/${shot.src}`}
                  alt={shot.caption}
                  width={1440}
                  height={900}
                  loading="lazy"
                />
              </div>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="gallery-mobile">
          <p className="section-kicker">Mobile</p>
          <h2 className="section-title">Phone-sized passes</h2>
          <div className="gallery-mobile-grid">
            {mobile.map((shot) => (
              <figure key={shot.src} className="gallery-item">
                <div className="shot-frame">
                  <img
                    src={`/images/mobile/${shot.src}`}
                    alt={`${shot.caption} (mobile)`}
                    width={390}
                    height={844}
                    loading="lazy"
                  />
                </div>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import "./home.css";

const ease = [0.16, 1, 0.3, 1] as const;

const proofs = [
  {
    title: "One process",
    body: "Sonarr, Radarr, Prowlarr, Lidarr, Readarr, and Bazarr collapse into one Go binary — one SQLite database, one React UI.",
  },
  {
    title: "~50 MB, not gigabytes",
    body: "The running Replacearr process sits around 50 MB RSS. A full *arr stack of separate .NET (and Bazarr) services commonly burns well over a gigabyte idle.",
  },
  {
    title: "Go, not .NET",
    body: "A single static Go binary with a faster, leaner runtime than babysitting a pile of *arr containers.",
  },
] as const;

const strip = [
  {
    src: "/images/desktop/02-series.png",
    alt: "Series library",
    caption: "Series",
  },
  {
    src: "/images/desktop/03-movies.png",
    alt: "Movies library",
    caption: "Movies",
  },
  {
    src: "/images/desktop/06-indexers-search.png",
    alt: "Indexer search",
    caption: "Indexers",
  },
] as const;

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="page">
      <section className="home-hero">
        <motion.div
          className="home-atmosphere"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease }}
        />

        <motion.div
          className="home-hero-copy"
          initial={reduceMotion ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease }}
        >
          <img
            className="home-mark"
            src="/images/logos/replacearr-mark.svg"
            width={96}
            height={96}
            alt=""
          />
          <h1 className="home-brand">Replacearr</h1>
          <p className="home-lede">
            One Go binary instead of Sonarr, Radarr, Prowlarr, Lidarr, Readarr, and Bazarr — leaner
            than a pile of .NET *arr processes.
          </p>
          <div className="home-actions">
            <a className="btn home-btn-primary" href="https://github.com/replacearr/replacearr">
              View on GitHub
            </a>
            <Link className="btn home-btn-ghost" to="/install">
              Get Docker image
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="section">
        <p className="section-kicker">Why it exists</p>
        <h2 className="section-title">Stop babysitting six apps</h2>
        <p className="section-lede">
          Replacearr collapses Sonarr, Radarr, Prowlarr, Lidarr, Readarr, and Bazarr into a single
          static Go binary: one process, one database, one UI — with compatibility mounts for tools
          that still speak the old *arr APIs.
        </p>

        <aside className="home-savings" aria-label="Memory comparison">
          <div className="home-savings-stat">
            <span className="home-savings-value">~50 MB</span>
            <span className="home-savings-label">Replacearr RSS (live Go process)</span>
          </div>
          <p className="home-savings-vs">vs</p>
          <div className="home-savings-stat">
            <span className="home-savings-value">1–2+ GB</span>
            <span className="home-savings-label">
              Typical idle footprint running the *arr stack as separate apps
            </span>
          </div>
          <p className="home-savings-note">
            Measured on our running Replacearr instance (~47 MB process RSS). The usual stack is six
            runtimes — mostly .NET, plus Bazarr — each with its own overhead. One Go binary replaces
            all of them.
          </p>
        </aside>

        <div className="home-proofs">
          {proofs.map((proof) => (
            <article key={proof.title} className="home-proof">
              <h3>{proof.title}</h3>
              <p>{proof.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-kicker">In the UI</p>
        <h2 className="section-title">Libraries and search, together</h2>
        <p className="section-lede">
          Real screens from the app — not mock dashboards. See more on the{" "}
          <Link to="/gallery" style={{ color: "var(--accent-ink)", fontWeight: 600 }}>
            gallery
          </Link>
          .
        </p>

        <div className="home-strip">
          {strip.map((item) => (
            <Link key={item.src} to="/gallery">
              <div className="shot-frame">
                <img src={item.src} alt={item.alt} width={1440} height={900} loading="lazy" />
              </div>
              <p className="home-strip-caption">{item.caption}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

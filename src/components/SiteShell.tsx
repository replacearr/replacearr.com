import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/product", label: "Product" },
  { to: "/install", label: "Install" },
  { to: "/gallery", label: "Gallery" },
] as const;

export default function SiteShell() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site">
      <motion.header
        initial={reduceMotion ? false : { y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className={`site-nav${scrolled ? " is-scrolled" : ""}`} aria-label="Primary">
          <Link className="nav-brand" to="/">
            <img src="/images/logos/replacearr-mark.svg" width={32} height={32} alt="" />
            Replacearr
          </Link>

          <div className="nav-links">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            <a className="btn btn-primary nav-github" href="https://github.com/replacearr/replacearr">
              GitHub
            </a>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <div id="mobile-nav" className={`nav-drawer${menuOpen ? " is-open" : ""}`}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
          <a href="https://github.com/replacearr/replacearr">GitHub</a>
          <a href="https://hub.docker.com/r/ldrrp/replacearr">Docker Hub</a>
          <a href="https://discord.gg/WUrKJuE5XB">Discord</a>
        </div>
      </motion.header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Link className="footer-brand" to="/">
              <img src="/images/logos/replacearr-mark.svg" width={28} height={28} alt="" />
              Replacearr
            </Link>
            <p className="footer-copy">
              One Go binary for TV, movies, music, books, and indexers — without running a pile of
              separate *arr processes.
            </p>
          </div>
          <div>
            <div className="footer-links">
              <a href="https://github.com/replacearr/replacearr">GitHub</a>
              <a href="https://hub.docker.com/r/ldrrp/replacearr">Docker Hub</a>
              <a href="https://discord.gg/WUrKJuE5XB">Discord</a>
            </div>
            <p className="footer-meta" style={{ marginTop: "0.85rem" }}>
              Experimental · PRs welcome
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

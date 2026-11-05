import "./install.css";

export default function InstallPage() {
  return (
    <div className="page">
      <header className="install-hero">
        <p className="section-kicker">Install</p>
        <h1 className="section-title">Run one container. Or one binary.</h1>
        <p className="section-lede">
          Pull the published image, or build from source. Paths match a typical LinuxServer-style
          layout: config plus media roots under <code>/data</code>.
        </p>
      </header>

      <section className="section">
        <div className="install-grid">
          <article className="install-card">
            <h2>Docker Hub</h2>
            <p>Published image for production-style deploys with PUID/PGID and TZ.</p>
            <a className="btn btn-accent" href="https://hub.docker.com/r/ldrrp/replacearr">
              ldrrp/replacearr
            </a>
          </article>
          <article className="install-card">
            <h2>Source</h2>
            <p>Clone the repo for compose files, Air-based local stack, and the plugin SDK.</p>
            <a className="btn btn-secondary" href="https://github.com/replacearr/replacearr">
              GitHub repository
            </a>
          </article>
          <article className="install-card">
            <h2>Community</h2>
            <p>Ask questions, share setups, and follow experimental releases on Discord.</p>
            <a className="btn btn-secondary" href="https://discord.gg/WUrKJuE5XB">
              Join Discord
            </a>
          </article>
        </div>

        <div className="install-steps">
          <p className="section-kicker">Quick start</p>
          <h2 className="section-title">Pull and run</h2>
          <p className="section-lede">
            Prefer the compose file in the repo for volume layout. For a one-liner smoke test:
          </p>
          <code className="prose-code">
            {`docker pull ldrrp/replacearr:latest
docker run --rm -p 9696:9696 \\
  -v \"$PWD/config:/config\" \\
  ldrrp/replacearr:latest`}
          </code>
          <ol>
            <li>Mount persistent config (database, definitions, plugins).</li>
            <li>Map TV, Movies, Music, Books, and Audiobooks roots as needed.</li>
            <li>Open the UI, create the admin user, then point clients at Replacearr.</li>
          </ol>
          <p className="install-note">
            This project is still experimental. Expect sharp edges — issues and PRs are welcome on
            GitHub.
          </p>
        </div>
      </section>
    </div>
  );
}

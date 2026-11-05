import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  formatBytes,
  formatPluginType,
  getPluginById,
  loadPluginCatalog,
  PLUGINS_REPO_URL,
  type PluginManifest,
} from "../lib/pluginsCatalog";
import "./plugins.css";

type LocationState = {
  fromSearch?: string;
};

export default function PluginDetailPage() {
  const { pluginId = "" } = useParams();
  const location = useLocation();
  const fromSearch = (location.state as LocationState | null)?.fromSearch;

  const [plugin, setPlugin] = useState<PluginManifest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const backTo = fromSearch ? `/plugins?${fromSearch}` : "/plugins";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setNotFound(false);
    setPlugin(null);

    loadPluginCatalog()
      .then((catalog) => {
        if (cancelled) return;
        const match = getPluginById(catalog, pluginId);
        if (!match) {
          setNotFound(true);
        } else {
          setPlugin(match);
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load plugin catalog");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pluginId]);

  return (
    <div className="page">
      <header className="plugin-detail-hero">
        <Link className="plugin-back" to={backTo}>
          ← Back to marketplace
        </Link>

        {loading ? <p className="plugins-status">Loading plugin…</p> : null}

        {error ? (
          <p className="plugins-status is-error" role="alert">
            Could not load plugin details. {error}
          </p>
        ) : null}

        {notFound ? (
          <>
            <p className="section-kicker">Plugins</p>
            <h1 className="section-title">Plugin not found</h1>
            <p className="section-lede">
              No curated plugin with id <code>{pluginId}</code> is listed in the live registry.
            </p>
            <div className="plugin-detail-actions">
              <Link className="btn btn-accent" to="/plugins">
                Browse marketplace
              </Link>
              <a className="btn btn-secondary" href={PLUGINS_REPO_URL}>
                Open registry
              </a>
            </div>
          </>
        ) : null}

        {plugin ? (
          <>
            <p className="section-kicker">Plugin</p>
            <div className="plugin-detail-title-row">
              <h1 className="section-title">{plugin.name}</h1>
              <span className="plugin-detail-version">v{plugin.version}</span>
            </div>
            <p className="section-lede">{plugin.description}</p>
            <div className="plugin-tags is-detail">
              {plugin.types.map((pluginType) => (
                <span key={pluginType} className="plugin-tag">
                  {formatPluginType(pluginType)}
                </span>
              ))}
            </div>
            <div className="plugin-detail-actions">
              <a className="btn btn-accent" href={plugin.homepage} rel="noreferrer">
                Homepage
              </a>
              <a className="btn btn-secondary" href={plugin.repository} rel="noreferrer">
                Repository
              </a>
            </div>
          </>
        ) : null}
      </header>

      {plugin ? (
        <section className="section">
          <div className="plugin-detail-panel">
            <h2>Details</h2>
            <dl className="plugin-detail-dl">
              <div>
                <dt>ID</dt>
                <dd>
                  <code>{plugin.id}</code>
                </dd>
              </div>
              <div>
                <dt>Author</dt>
                <dd>{plugin.author}</dd>
              </div>
              <div>
                <dt>Version</dt>
                <dd>v{plugin.version}</dd>
              </div>
              <div>
                <dt>Min Replacearr</dt>
                <dd>{plugin.minReplacearrVersion}</dd>
              </div>
              <div>
                <dt>Homepage</dt>
                <dd>
                  <a href={plugin.homepage} rel="noreferrer">
                    {plugin.homepage}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Repository</dt>
                <dd>
                  <a href={plugin.repository} rel="noreferrer">
                    {plugin.repository}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="plugin-detail-panel">
            <h2>Release assets</h2>
            <div className="plugin-assets">
              {plugin.assets.map((asset) => (
                <div key={`${asset.goos}-${asset.goarch}-${asset.url}`} className="plugin-asset">
                  <div className="plugin-asset-platform">
                    {asset.goos}/{asset.goarch}
                  </div>
                  <div className="plugin-asset-meta">
                    {formatBytes(asset.size)} · sha256 {asset.sha256.slice(0, 12)}…
                  </div>
                  <a href={asset.url} rel="noreferrer">
                    Download binary
                  </a>
                </div>
              ))}
            </div>
          </div>

          <p className="plugin-install-note">
            Install curated plugins from Replacearr → Plugins → Marketplace. Manual binary installs
            belong in your plugin directory after verifying the pinned sha256 from the registry.
          </p>
        </section>
      ) : null}
    </div>
  );
}

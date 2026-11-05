import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  filterPlugins,
  formatPluginType,
  loadPluginCatalog,
  paginatePlugins,
  PLUGIN_TYPES,
  PLUGINS_REPO_URL,
  type PluginCatalog,
} from "../lib/pluginsCatalog";
import "./plugins.css";

function parsePage(value: string | null): number {
  const n = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default function PluginsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "";
  const page = parsePage(searchParams.get("page"));

  const [catalog, setCatalog] = useState<PluginCatalog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    loadPluginCatalog()
      .then((data) => {
        if (!cancelled) {
          setCatalog(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setCatalog(null);
          setError(err instanceof Error ? err.message : "Failed to load plugin catalog");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!catalog) return [];
    return filterPlugins(catalog.plugins, { query, type });
  }, [catalog, query, type]);

  const paged = useMemo(() => paginatePlugins(filtered, page), [filtered, page]);

  useEffect(() => {
    if (!catalog) return;
    if (page !== paged.page) {
      const next = new URLSearchParams(searchParams);
      if (paged.page <= 1) next.delete("page");
      else next.set("page", String(paged.page));
      setSearchParams(next, { replace: true });
    }
  }, [catalog, page, paged.page, searchParams, setSearchParams]);

  function updateParam(key: "q" | "type" | "page", value: string) {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.delete("page");
    setSearchParams(next);
  }

  return (
    <div className="page">
      <header className="plugins-hero">
        <p className="section-kicker">Plugins</p>
        <h1 className="section-title">Marketplace</h1>
        <p className="section-lede">
          Browse curated Replacearr plugins. The catalog is loaded live from{" "}
          <a href={PLUGINS_REPO_URL}>replacearr-plugins</a> so this page stays current with the
          registry.
        </p>

        <div className="plugins-toolbar">
          <label className="sr-only" htmlFor="plugin-search">
            Search plugins
          </label>
          <input
            id="plugin-search"
            className="plugins-search"
            type="search"
            placeholder="Search by name, author, or description"
            value={query}
            onChange={(e) => updateParam("q", e.target.value)}
          />
          <label className="sr-only" htmlFor="plugin-type">
            Filter by type
          </label>
          <select
            id="plugin-type"
            className="plugins-type"
            value={type}
            onChange={(e) => updateParam("type", e.target.value)}
          >
            <option value="">All types</option>
            {PLUGIN_TYPES.map((pluginType) => (
              <option key={pluginType} value={pluginType}>
                {formatPluginType(pluginType)}
              </option>
            ))}
          </select>
        </div>

        <p className="plugins-meta">
          {loading
            ? "Loading catalog…"
            : error
              ? null
              : `${filtered.length} plugin${filtered.length === 1 ? "" : "s"}${
                  query || type ? " match" : " in the curated registry"
                }`}
          {" · "}
          <a href={PLUGINS_REPO_URL}>View registry on GitHub</a>
        </p>
      </header>

      <section className="section">
        {loading ? <p className="plugins-status">Fetching the live plugin registry…</p> : null}

        {error ? (
          <p className="plugins-status is-error" role="alert">
            Could not load the marketplace catalog. {error}
          </p>
        ) : null}

        {!loading && !error && filtered.length === 0 ? (
          <p className="plugins-status">No plugins match that search.</p>
        ) : null}

        {!loading && !error && paged.items.length > 0 ? (
          <>
            <div className="plugins-grid">
              {paged.items.map((plugin) => (
                <Link
                  key={plugin.id}
                  className="plugin-card"
                  to={`/plugins/${plugin.id}`}
                  state={{ fromSearch: searchParams.toString() }}
                >
                  <div className="plugin-card-top">
                    <h2>{plugin.name}</h2>
                    <span className="plugin-card-version">v{plugin.version}</span>
                  </div>
                  <p>{plugin.description}</p>
                  <div className="plugin-tags">
                    {plugin.types.map((pluginType) => (
                      <span key={pluginType} className="plugin-tag">
                        {formatPluginType(pluginType)}
                      </span>
                    ))}
                  </div>
                  <span className="plugin-card-meta">by {plugin.author}</span>
                </Link>
              ))}
            </div>

            {paged.totalPages > 1 ? (
              <div className="plugins-pagination">
                <p className="plugins-pagination-info">
                  Page {paged.page} of {paged.totalPages}
                </p>
                <div className="plugins-pagination-controls">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={paged.page <= 1}
                    onClick={() => updateParam("page", String(paged.page - 1))}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={paged.page >= paged.totalPages}
                    onClick={() => updateParam("page", String(paged.page + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  );
}

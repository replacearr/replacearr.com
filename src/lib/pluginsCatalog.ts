/** Live marketplace catalog from replacearr/replacearr-plugins (not vendored). */

export const CATALOG_URL =
  "https://raw.githubusercontent.com/replacearr/replacearr-plugins/main/registry.json";

export const PLUGINS_REPO_URL = "https://github.com/replacearr/replacearr-plugins";

export const PLUGIN_TYPES = [
  "indexer",
  "download_client",
  "metadata",
  "notification",
  "media_module",
  "network_proxy",
  "compat",
] as const;

export type PluginType = (typeof PLUGIN_TYPES)[number];

export type PluginAsset = {
  goos: string;
  goarch: string;
  url: string;
  sha256: string;
  size: number;
};

export type PluginManifest = {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  types: string[];
  homepage: string;
  repository: string;
  minReplacearrVersion: string;
  assets: PluginAsset[];
};

type RegistryEntry = {
  id: string;
  manifest: string;
};

type Registry = {
  schemaVersion: number;
  plugins: RegistryEntry[];
};

export type PluginCatalog = {
  schemaVersion: number;
  plugins: PluginManifest[];
  fetchedAt: number;
};

const PAGE_SIZE = 9;

let catalogPromise: Promise<PluginCatalog> | null = null;

function registryBaseURL(registryURL: string): string {
  const url = new URL(registryURL);
  const path = url.pathname.replace(/\/[^/]*$/, "/");
  return `${url.origin}${path}`;
}

function resolveManifestURL(registryURL: string, relativePath: string): string {
  return new URL(relativePath, registryBaseURL(registryURL)).toString();
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} (${res.status})`);
  }
  return (await res.json()) as T;
}

export async function loadPluginCatalog(force = false): Promise<PluginCatalog> {
  if (!force && catalogPromise) {
    return catalogPromise;
  }

  catalogPromise = (async () => {
    const registry = await fetchJSON<Registry>(CATALOG_URL);
    if (!Array.isArray(registry.plugins)) {
      throw new Error("Invalid plugin registry: missing plugins list");
    }

    const manifests = await Promise.all(
      registry.plugins.map(async (entry) => {
        const manifestURL = resolveManifestURL(CATALOG_URL, entry.manifest);
        const manifest = await fetchJSON<PluginManifest>(manifestURL);
        return {
          ...manifest,
          id: manifest.id || entry.id,
        };
      }),
    );

    return {
      schemaVersion: registry.schemaVersion,
      plugins: manifests.sort((a, b) => a.name.localeCompare(b.name)),
      fetchedAt: Date.now(),
    };
  })();

  try {
    return await catalogPromise;
  } catch (err) {
    catalogPromise = null;
    throw err;
  }
}

export function getPluginById(
  catalog: PluginCatalog,
  id: string,
): PluginManifest | undefined {
  return catalog.plugins.find((plugin) => plugin.id === id);
}

export type PluginFilters = {
  query: string;
  type: string;
};

export function filterPlugins(
  plugins: PluginManifest[],
  filters: PluginFilters,
): PluginManifest[] {
  const q = filters.query.trim().toLowerCase();
  const type = filters.type.trim().toLowerCase();

  return plugins.filter((plugin) => {
    if (type && !plugin.types.some((t) => t.toLowerCase() === type)) {
      return false;
    }
    if (!q) return true;
    const haystack = [
      plugin.id,
      plugin.name,
      plugin.author,
      plugin.description,
      ...plugin.types,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function paginatePlugins<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
  };
}

export function formatPluginType(type: string): string {
  return type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

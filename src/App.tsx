import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SiteShell from "./components/SiteShell";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import InstallPage from "./pages/InstallPage";
import PluginDetailPage from "./pages/PluginDetailPage";
import PluginsPage from "./pages/PluginsPage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="install" element={<InstallPage />} />
          <Route path="plugins" element={<PluginsPage />} />
          <Route path="plugins/:pluginId" element={<PluginDetailPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

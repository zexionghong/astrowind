import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PATHS } from './routes';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { StaticResidentialPage } from './pages/StaticResidentialPage';
import { DynamicResidentialPage } from './pages/DynamicResidentialPage';
import { DatacenterPage } from './pages/DatacenterPage';
import { AiAcceleratorPage } from './pages/AiAcceleratorPage';
import { ScenariosPage } from './pages/ScenariosPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { RegisterPage } from './pages/RegisterPage';
import { UseCasePage } from './pages/UseCasePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.pricing} element={<PricingPage />} />
          <Route path={PATHS.prodSrp} element={<StaticResidentialPage />} />
          <Route path={PATHS.prodDrp} element={<DynamicResidentialPage />} />
          <Route path={PATHS.prodDc} element={<DatacenterPage />} />
          <Route path={PATHS.prodAi} element={<AiAcceleratorPage />} />
          <Route path={PATHS.scenarios} element={<ScenariosPage />} />
          <Route path="/use-case/:slug" element={<UseCasePage />} />
          <Route path={PATHS.resources} element={<ResourcesPage />} />
          <Route path={PATHS.blog} element={<BlogPage />} />
          <Route path={`${PATHS.blog}/:slug`} element={<BlogPostPage />} />
          <Route path={PATHS.about} element={<AboutPage />} />
          <Route path={PATHS.register} element={<RegisterPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

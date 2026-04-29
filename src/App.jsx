import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Work from './pages/Work.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import Contact from './pages/Contact.jsx';
import Kaart from './pages/Kaart.jsx';
import KaartServices from './pages/KaartServices.jsx';
import Resources from './pages/Resources.jsx';
import Sarthak from './pages/Sarthak.jsx';
import MarginCalculator from './pages/tools/MarginCalculator.jsx';
import BudgetAllocator from './pages/tools/BudgetAllocator.jsx';
import UGCBriefGenerator from './pages/tools/UGCBriefGenerator.jsx';
import LTVCalculator from './pages/tools/LTVCalculator.jsx';
import MRRProjector from './pages/tools/MRRProjector.jsx';
import CODCalculator from './pages/tools/CODCalculator.jsx';
import AppStackBuilder from './pages/tools/AppStackBuilder.jsx';
import EmailFlowPlanner from './pages/tools/EmailFlowPlanner.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import SendAgreement from './pages/admin/SendAgreement.jsx';
import AdminPortals from './pages/admin/AdminPortals.jsx';
import ClientPortal from './pages/ClientPortal.jsx';
import Sign from './pages/Sign.jsx';
import ShopifyDevelopment from './pages/seo/ShopifyDevelopment.jsx';
import SaaSDevelopment from './pages/seo/SaaSDevelopment.jsx';
import MVPDevelopment from './pages/seo/MVPDevelopment.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<CaseStudy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/kaart" element={<Kaart />} />
      <Route path="/kaart/services" element={<KaartServices />} />
      <Route path="/sarthak" element={<Sarthak />} />
      <Route path="/toolkit" element={<Resources />} />
      <Route path="/toolkit/margin-calculator"  element={<MarginCalculator />} />
      <Route path="/toolkit/budget-allocator"   element={<BudgetAllocator />} />
      <Route path="/toolkit/ugc-brief"          element={<UGCBriefGenerator />} />
      <Route path="/toolkit/ltv-calculator"     element={<LTVCalculator />} />
      <Route path="/toolkit/mrr-projector"      element={<MRRProjector />} />
      <Route path="/toolkit/cod-calculator"     element={<CODCalculator />} />
      <Route path="/toolkit/app-stack-builder"  element={<AppStackBuilder />} />
      <Route path="/toolkit/email-flow-planner" element={<EmailFlowPlanner />} />
      {/* Blog */}
      <Route path="/blog"        element={<Blog />} />
      <Route path="/blog/:slug"  element={<BlogPost />} />
      {/* E-sign & Admin */}
      <Route path="/admin/agreements" element={<SendAgreement />} />
      <Route path="/admin/portals"    element={<AdminPortals />} />
      {/* Client portals */}
      <Route path="/clients/:slug"    element={<ClientPortal />} />
      <Route path="/sign"             element={<Sign />} />
      {/* SEO landing pages */}
      <Route path="/shopify-development" element={<ShopifyDevelopment />} />
      <Route path="/saas-development"    element={<SaaSDevelopment />} />
      <Route path="/mvp-development"     element={<MVPDevelopment />} />
    </Routes>
  );
}

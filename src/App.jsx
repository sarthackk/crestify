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
import MarginCalculator from './pages/tools/MarginCalculator.jsx';
import BudgetAllocator from './pages/tools/BudgetAllocator.jsx';
import UGCBriefGenerator from './pages/tools/UGCBriefGenerator.jsx';

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
      <Route path="/toolkit" element={<Resources />} />
      <Route path="/toolkit/margin-calculator" element={<MarginCalculator />} />
      <Route path="/toolkit/budget-allocator" element={<BudgetAllocator />} />
      <Route path="/toolkit/ugc-brief" element={<UGCBriefGenerator />} />
    </Routes>
  );
}

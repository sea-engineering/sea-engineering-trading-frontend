import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import ProcurementLogistics from './pages/ProcurementLogistics';
import WhyUs from './pages/WhyUs';
import Contact from './pages/Contact';
import IndustrialEquipment from './pages/IndustrialEquipment';
import OilfieldEquipment from './pages/OilfieldEquipment';
import GeneralCommodities from './pages/GeneralCommodities';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products/procurement-logistics" element={<ProcurementLogistics />} />
          <Route path="why-us" element={<WhyUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products/industrial-equipment" element={<IndustrialEquipment />} />
          <Route path="products/oilfield-equipment" element={<OilfieldEquipment />} />
          <Route path="products/general-commodities" element={<GeneralCommodities />} />

          {/* Route aliases / backward compatibility */}
          <Route path="products/industrial" element={<Navigate to="/products/industrial-equipment" replace />} />
          <Route path="products/oilfield" element={<Navigate to="/products/oilfield-equipment" replace />} />
          <Route path="products/general" element={<Navigate to="/products/general-commodities" replace />} />
          <Route path="procurement-logistics" element={<Navigate to="/products/procurement-logistics" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

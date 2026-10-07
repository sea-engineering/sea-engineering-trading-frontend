import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
      </Route>
    </Routes>
  );
}

export default App;

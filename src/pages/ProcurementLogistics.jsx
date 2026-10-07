import React from 'react';
import ProductPageLayout from '../components/ProductPageLayout';

const ProcurementLogistics = () => {
  return (
    <ProductPageLayout 
      pageKey="procurement-logistics" 
      fallbackGlobalTitleEn="Procurement & Logistics" 
      fallbackGlobalTitleFr="Approvisionnement et Logistique" 
    />
  );
};

export default ProcurementLogistics;

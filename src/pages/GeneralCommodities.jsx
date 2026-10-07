import React from 'react';
import ProductPageLayout from '../components/ProductPageLayout';

const GeneralCommodities = () => {
  return (
    <ProductPageLayout 
      pageKey="general-commodities" 
      fallbackGlobalTitleEn="General Commodities" 
      fallbackGlobalTitleFr="Produits de base" 
    />
  );
};

export default GeneralCommodities;

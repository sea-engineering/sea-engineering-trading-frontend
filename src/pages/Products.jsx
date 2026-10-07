import React from 'react';
import { useParams } from 'react-router-dom';

const Products = () => {
  const { category } = useParams();
  return (
    <div className="container py-5">
      <h1 className="text-capitalize">{category?.replace('-', ' ')} Equipment</h1>
    </div>
  );
};
export default Products;

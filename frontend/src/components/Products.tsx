import "../index.css";
import ProductItem from "./ProductItem";
import { ProductContext } from "../context/context";
import React, { useContext, useEffect } from "react";

interface ProductProps {
  category: string;
}

const Products: React.FC<ProductProps> = ({ category }) => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const { products, fetchProducts } = context;

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        fetchProducts(category);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="flex flex-wrap gap-4 p-1 mt-4 items-center justify-center">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))
      ) : (
        <p>Mevcut Ürün Yok</p>
      )}
    </div>
  );
};

export default Products;

import "../index.css";
import ProductItem from "./ProductItem";
import { ProductContext } from "../context/context";
import React, { useContext, useEffect, useState } from "react";
import { Product } from "../types/Types";

interface ProductProps {
  category: string;
}

const Products: React.FC<ProductProps> = ({ category }) => {
  const context = useContext(ProductContext);
  const [products, setProducts] = useState<Product[]>([]); // Initialize as empty array

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const getProducts = context.fetchProducts;

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        if (getProducts) {
          const response = await getProducts(category);
          if (response) {
            // Check if response is not null
            setProducts(response); // Set products only if response is valid
          }
        }
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

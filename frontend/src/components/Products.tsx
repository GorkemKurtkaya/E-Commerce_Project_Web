import "../index.css";
import ProductItem from "./ProductItem";
import { ProductContext } from "../context/context";
import React, { useContext, useEffect, useState } from "react";

interface ProductProps {
  category: string;
}

const Products: React.FC<ProductProps> = ({ category }) => {
  const context = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const { products, fetchProducts } = context;

  useEffect(() => {
    fetchProducts(category); // Ürünleri çekmek için bu fonksiyonu çağırıyoruz
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Ürünleri arama terimine göre filtrele
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // <div className="flex flex-wrap gap-4 p-1 mt-4 items-center justify-center">
    //   {products.length > 0 ? (
    //     products.map((product, index) => (
    //       <ProductItem key={index} product={product} />
    //     ))
    //   ) : (
    //     <p>Mevcut Ürün Yok</p>
    //   )}
    // </div>

    <div className="container mx-auto p-4">
      {/* Arama inputu */}

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Kullanıcının girdiği değeri kaydet
          className="border border-gray-300 h-10 px-3 rounded-md sm:w-full md:w-1/4 text-sm"
        />
      </div>

      {/* Filtrelenmiş ürünler listesi */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))
        ) : (
          <p>Mevcut Ürün Yok</p>
        )}
      </div>
    </div>
  );
};

export default Products;

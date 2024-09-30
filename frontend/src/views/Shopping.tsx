import "../index.css";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Product } from "../types/Types";

function Shopping() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const getProductsCount = () => {
      const storedProducts = localStorage.getItem("shoppingCart");
      if (storedProducts) {
        const productList: Product[] = JSON.parse(storedProducts);
        setProducts(productList);

        const initialQuantities = productList.reduce((acc, product) => {
          acc[product.id] = 1; // Default quantity for each product
          return acc;
        }, {} as { [key: number]: number });

        setQuantities(initialQuantities);
      }
    };
    getProductsCount();
  }, []);

  // Update quantities and localStorage
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Quantity cannot be less than 1
    setQuantities((prev) => {
      const updatedQuantities = { ...prev, [id]: newQuantity };
      // Update localStorage
      const storedProducts = localStorage.getItem("shoppingCart");
      if (storedProducts) {
        const productList: Product[] = JSON.parse(storedProducts);
        const updatedProductList = productList.map((product) => {
          return { ...product, quantity: updatedQuantities[product.id] || 1 };
        });
        localStorage.setItem(
          "shoppingCart",
          JSON.stringify(updatedProductList)
        );
      }
      return updatedQuantities;
    });
  };

  const handleRemoveProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id]; // Remove product quantity
      // Update localStorage
      const storedProducts = localStorage.getItem("shoppingCart");
      if (storedProducts) {
        const productList: Product[] = JSON.parse(storedProducts);
        const updatedProductList = productList.filter(
          (product) => product.id !== id
        );
        localStorage.setItem(
          "shoppingCart",
          JSON.stringify(updatedProductList)
        );
      }
      return newQuantities;
    });
  };

  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Alışveriş Sepeti</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-500">
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-400">
                      <td className="py-4">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                          <img
                            className="h-16 w-16"
                            src={product.imageUrl}
                            alt={product.name}
                          />
                          <span className="font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 p-4">
                        <div className="flex justify-center items-center h-full">
                          <button
                            className="border border-gray-600 rounded-md py-2 px-4"
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                quantities[product.id] - 1
                              )
                            }
                          >
                            -
                          </button>

                          <input
                            value={quantities[product.id]}
                            type="number"
                            className="text-center w-12 border border-gray-500 rounded-md mx-2 py-2 appearance-none"
                            onChange={(e) =>
                              handleQuantityChange(
                                product.id,
                                Number(e.target.value)
                              )
                            }
                          />

                          <button
                            className="border border-gray-600 rounded-md py-2 px-4"
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                quantities[product.id] + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-left">
                        ${quantities[product.id] * product.price}
                      </td>
                      <td>
                        <i
                          className="fa-solid fa-trash cursor-pointer text-[#ff0000]"
                          onClick={() => handleRemoveProduct(product.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  $
                  {products
                    .reduce(
                      (total, product) =>
                        total + quantities[product.id] * product.price,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>
                  $
                  {(
                    products.reduce(
                      (total, product) =>
                        total + quantities[product.id] * product.price,
                      0
                    ) / 5
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  $
                  {(
                    products.reduce(
                      (total, product) =>
                        total + quantities[product.id] * product.price,
                      0
                    ) +
                    products.reduce(
                      (total, product) =>
                        total + quantities[product.id] * product.price,
                      0
                    ) /
                      5
                  ).toFixed(2)}
                </span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopping;

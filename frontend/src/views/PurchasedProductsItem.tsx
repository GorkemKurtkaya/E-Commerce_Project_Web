import "../index.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context/context";
import { Order } from "../types/Types";

function PurchasedProductsItem() {
  const location = useLocation();
  const orderId = location.state?.orderId; // Ürünü state'den al

  const [order, setOrder] = useState<Order | null>(null);

  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const getOrderById = context.fetchGetOrderById;

  useEffect(() => {
    // Statik veriler arasında orderId'ye göre arama yap
    const getOrder = async () => {
      const response = await getOrderById(orderId);
      console.log(response);
      if (response) {
        setOrder(response);
      }
    };
    getOrder();
    // const foundOrder = staticOrders.find((order) => order.id === orderId);
    // setOrder(foundOrder || null);
  }, [orderId]);

  if (!order) {
    return <div>Sipariş bulunamadı.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center">Sipariş Detayları</h1>
      <p className="text-lg text-right">Sipariş Tarihi: {order.date}</p>
      <h2 className="text-xl font-semibold mt-4 mb-4">Ürünler:</h2>
      <ul className="list-none p-0">
        {order.products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between mb-2 p-2 border-b border-gray-200"
          >
            <img
              src={product.imageUri}
              alt={product.name}
              className="w-12 h-12"
            />
            <div className="flex-1 px-4 text-left">{product.name}</div>
            <span className="text-gray-600">${product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="text-right mt-4 font-semibold">
        Toplam Fiyat: $
        {order.products
          .reduce((total, product) => total + product.price, 0)
          .toFixed(2)}
      </p>
    </div>
  );
}

export default PurchasedProductsItem;

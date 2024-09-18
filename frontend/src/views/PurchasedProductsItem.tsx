import "../index.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
}

interface Order {
  id: number;
  date: string;
  products: Product[];
}

const staticOrders: Order[] = [
  {
    id: 1,
    date: "2024/09/15",
    products: [
      {
        id: 1,
        image: "https://via.placeholder.com/50",
        name: "Ürün 1",
        price: 29.99,
      },
      {
        id: 2,
        image: "https://via.placeholder.com/50",
        name: "Ürün 2",
        price: 49.99,
      },
      {
        id: 3,
        image: "https://via.placeholder.com/50",
        name: "Ürün 3",
        price: 19.99,
      },
      {
        id: 4,
        image: "https://via.placeholder.com/50",
        name: "Ürün 4",
        price: 39.99,
      },
    ],
  },
  {
    id: 2,
    date: "2024/09/14",
    products: [
      {
        id: 5,
        image: "https://via.placeholder.com/50",
        name: "Ürün 5",
        price: 19.99,
      },
      {
        id: 6,
        image: "https://via.placeholder.com/50",
        name: "Ürün 6",
        price: 29.99,
      },
    ],
  },
];

function PurchasedProductsItem() {
  const location = useLocation();
  const orderId = location.state?.orderId; // Ürünü state'den al

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Statik veriler arasında orderId'ye göre arama yap
    const foundOrder = staticOrders.find((order) => order.id === orderId);
    setOrder(foundOrder || null);
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
            <img src={product.image} alt={product.name} className="w-12 h-12" />
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

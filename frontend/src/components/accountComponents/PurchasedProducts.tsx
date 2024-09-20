import "../../index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

function PurchasedProducts() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([
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
  ]);

  const handleClick = (id: number) => {
    navigate(`/purchasedProductsItem/${id}`, { state: { orderId: id } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center">
        Geçmiş Siparişlerim
      </h1>
      <table className="min-w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="p-4 text-left">Sipariş Tarihi</th>
            <th className="p-4 text-left">Ürünler</th>
            <th className="p-4 text-right">Toplam Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <tr
                className=" hover:cursor-pointer hover:bg-gray-200"
                onClick={() => handleClick(order.id)}
              >
                <td className="p-4">{order.date}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="flex space-x-2 overflow-hidden">
                      {order.products.slice(0, 3).map((product) => (
                        <img
                          key={product.id}
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12"
                        />
                      ))}
                      {order.products.length > 3 && (
                        <span className="w-12 h-12 flex items-center justify-center text-2xl text-gray-800">
                          ...
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  $
                  {order.products
                    .reduce((total, product) => total + product.price, 0)
                    .toFixed(2)}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchasedProducts;

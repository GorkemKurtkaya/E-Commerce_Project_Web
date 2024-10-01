// import "../../index.css";
// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ProductContext } from "../../context/context";
// import { Order, Product } from "../../types/Types";

// function PurchasedProducts() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [productsDetails, setProductsDetails] = useState<{
//     [key: string]: Product | null;
//   }>({});
//   const context = useContext(ProductContext);

//   if (!context) {
//     throw new Error("ProductContext must be used within a ProductProvider");
//   }

//   const getOrders = context.fetchGetOrders;
//   const getProduct = context.getProductById;

//   // Ürün detaylarını getiren fonksiyon
//   const fetchProductDetails = async (productId: string) => {
//     if (getProduct) {
//       const productDetails = await getProduct(productId);
//       return productDetails;
//     }
//     return null;
//   };

//   useEffect(() => {
//     const fetchOrdersAndProducts = async () => {
//       try {
//         if (getOrders) {
//           const fetchedOrders = await getOrders();
//           setOrders(fetchedOrders);

//           // Her bir siparişteki ürünlerin detaylarını getir ve state'e kaydet
//           const productDetailsPromises = fetchedOrders.flatMap(
//             (order: { products: { productId: string }[] }) =>
//               order.products.map(async (product: { productId: string }) => {
//                 const details = await fetchProductDetails(product.productId);
//                 return { productId: product.productId, details };
//               })
//           );

//           const resolvedDetails = await Promise.all(productDetailsPromises);
//           const productDetailsMap: { [key: string]: Product | null } = {};
//           resolvedDetails.forEach(({ productId, details }: { productId: string; details: Product | null }) => {
//             productDetailsMap[productId] = details;
//           });

//           setProductsDetails(productDetailsMap);
//         }
//       } catch (error) {
//         console.log("Hata", error);
//       }
//     };

//     fetchOrdersAndProducts();
//   }, [getOrders, getProduct]);

//   const handleClick = (id: string) => {
//     navigate(`/purchasedProductsItem/${id}`, { state: { orderId: id } });
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold text-center">
//         Geçmiş Siparişlerim
//       </h1>
//       <table className="min-w-full border-collapse mt-4">
//         <thead>
//           <tr>
//             <th className="p-4 text-left">Sipariş Tarihi</th>
//             <th className="p-4 text-left">Ürünler</th>
//             <th className="p-4 text-right">Toplam Fiyat</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <React.Fragment key={order._id}>
//               <tr
//                 className="hover:cursor-pointer hover:bg-gray-200"
//                 onClick={() => handleClick(order._id)}
//               >
//                 <td className="p-4">
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="p-4">
//                   <div className="flex items-center">
//                     <div className="flex space-x-2 overflow-hidden">
//                       {order.products
//                         .slice(0, 3)
//                         .map((product: { productId: string }) => {
//                           const productDetails =
//                             productsDetails[product.productId];

//                           // Null kontrolü
//                           return productDetails ? (
//                             <div
//                               key={product.productId}
//                               className="flex items-center space-x-2"
//                             >
//                               <img
//                                 src={productDetails.imageUri || ""}
//                                 alt={productDetails.title || ""}
//                                 className="w-12 h-12"
//                               />
//                             </div>
//                           ) : (
//                             <div
//                               key={product.productId}
//                               className="flex items-center space-x-2"
//                             >
//                               <span>Yükleniyor...</span>
//                             </div>
//                           );
//                         })}

//                       {order.products.length > 3 && (
//                         <span className="w-12 h-12 flex items-center justify-center text-2xl text-gray-800">
//                           ...
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="p-4 text-right">
//                   $
//                   {order.products
//                     .reduce(
//                       (total: number, product: { amount: number }) =>
//                         total + product.amount,
//                       0
//                     )
//                     .toFixed(2)}
//                 </td>
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PurchasedProducts;
import "../../index.css";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/context";
import { Order, Product } from "../../types/Types";

function PurchasedProducts() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsDetails, setProductsDetails] = useState<{
    [key: string]: Product | null;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const getOrders = context.fetchGetAllOrders;
  const getProduct = context.getProductById;

  // Ürün detaylarını getiren fonksiyon
  const fetchProductDetails = async (
    productId: string
  ): Promise<Product | null> => {
    if (getProduct) {
      const productDetails = await getProduct(productId);
      return productDetails;
    }
    return null;
  };

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        if (getOrders) {
          const fetchedOrders: Order[] | null = await getOrders(); // getOrders sonuç türünü açıkça belirttik

          // fetchedOrders null kontrolü
          if (fetchedOrders) {
            setOrders(fetchedOrders);

            // Her bir siparişteki ürünlerin detaylarını getir ve state'e kaydet
            const productDetailsPromises = fetchedOrders.flatMap(
              (
                order: Order // Order tipini burada belirtiyoruz
              ) =>
                order.products.map(async (product: { productId: string }) => {
                  const details = await fetchProductDetails(product.productId);
                  return { productId: product.productId, details };
                })
            );

            const resolvedDetails = await Promise.all(productDetailsPromises);
            const productDetailsMap: { [key: string]: Product | null } = {};
            resolvedDetails.forEach(
              ({
                productId,
                details,
              }: {
                productId: string;
                details: Product | null;
              }) => {
                productDetailsMap[productId] = details;
              }
            );

            setProductsDetails(productDetailsMap);
          } else {
            console.log("Siparişler yüklenemedi.");
          }
        }
      } catch (error) {
        console.log("Hata", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [getOrders, getProduct]);

  const handleClick = (id: string) => {
    console.log(id);
    navigate(`/purchasedProductsItem/${id}`, { state: { orderId: id } });
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

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
            <React.Fragment key={order._id}>
              <tr
                className="hover:cursor-pointer hover:bg-gray-200"
                onClick={() => handleClick(order._id)}
              >
                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="flex space-x-2 overflow-hidden">
                      {order.products
                        .slice(0, 3)
                        .map((product: { productId: string }) => {
                          const productDetails =
                            productsDetails[product.productId];

                          return productDetails ? (
                            <div
                              key={product.productId}
                              className="flex items-center space-x-2"
                            >
                              <img
                                src={productDetails.imageUri || ""}
                                alt={productDetails.title || ""}
                                className="w-12 h-12"
                              />
                            </div>
                          ) : (
                            <div
                              key={product.productId}
                              className="flex items-center space-x-2"
                            >
                              <span>Yükleniyor...</span>
                            </div>
                          );
                        })}

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
                    .reduce(
                      (total: number, product: { amount: number }) =>
                        total + product.amount,
                      0
                    )
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

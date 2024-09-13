import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../types/Product"; // Ürün tipini içeri aktarıyoruz

interface ProductContextType {
  products: Product[];
  fetchProducts: (category: string) => void;
  fetchUser: (
    email: string,
    password: string
  ) => Promise<{ name: string; email: string } | null>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = (category: string) => {
    const staticProducts: Product[] = [
      {
        id: 1,
        name: "Peace Lily",
        category: "Trash",
        price: "$36.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 2,
        name: "Snake Plant",
        category: "Trash",
        price: "$30.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 3,
        name: "Aloe Vera",
        category: "Trash",
        price: "$25.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 4,
        name: "Aloe Vera",
        category: "Indoor",
        price: "$25.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 5,
        name: "Aloe Vera",
        category: "Indoor",
        price: "$25.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 6,
        name: "Aloe Vera",
        category: "Indoor",
        price: "$25.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 7,
        name: "Aloe Vera",
        category: "Indoor",
        price: "$25.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 8,
        name: "Aloe Vera",
        category: "Indoor",
        price: "$25.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 9,
        name: "Aloe Vera",
        category: "Indoor",
        price: "$25.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
      {
        id: 10,
        name: "Aloe Vera",
        category: "Indoor",
        price: "$25.00",
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      },
    ];

    if (category !== "") {
      const filteredProducts = staticProducts.filter(
        (product) => product.category === category
      );

      setProducts(filteredProducts);
    } else {
      setProducts(staticProducts);
    }
  };

  const fetchUser = (
    email: string,
    password: string
  ): Promise<{ name: string; email: string } | null> => {
    return new Promise((resolve) => {
      const staticUsers = [
        {
          id: 1,
          name: "Ömer",
          email: "asd@example.com",
          password: "123456",
        },
        {
          id: 2,
          name: "Fikri",
          email: "qwe@example.com",
          password: "1234567",
        },
        {
          id: 3,
          name: "Ömer Fikri Gülcemal",
          email: "cnc@example.com",
          password: "12345678",
        },
        {
          id: 4,
          name: "Ömer Fikri Gülcemal",
          email: "123@example.com",
          password: "123456789",
        },
      ];
      const foundUser = staticUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        // Eşleşen kullanıcıyı dön
        const user = {
          name: foundUser.name,
          email: foundUser.email,
        };
        resolve(user);
        localStorage.setItem("user", JSON.stringify(user)); // Kullanıcı bilgisini saklıyoruz
      } else {
        // Eşleşme yoksa null dön
        resolve(null);
      }
    });
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts, fetchUser }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };

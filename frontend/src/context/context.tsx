import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../types/Product"; // Ürün tipini içeri aktarıyoruz
import axios from "axios";
import Cookies from "js-cookie";

interface ProductContextType {
  products: Product[];
  searchProducts: (query: string) => Product[];
  fetchProducts: (category: string) => void;
  fetchUser: (
    email: string,
    password: string
  ) => Promise<{ email: string; password: string } | null>;
  fetchSignupUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ name: string; email: string; password: string } | null>;
  fetchToken: () => void;
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

  const searchProducts = (query: string): Product[] => {
    return products.filter((product) => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
  };

  const fetchUser = async (
    email: string,
    password: string
  ): Promise<{ email: string; password: string } | null> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, // Buraya taşındı
        }
      );

      console.log("Giriş başarılı", response.data);
      const token = fetchToken();
      if (token) {
        console.log("Token bulundu:", token);
      } else {
        console.log("Token bulunamadı.");
      }

      // Eğer başarılıysa, kullanıcı bilgilerini döndür
      return response.data;
    } catch (error) {
      console.error("Giriş sırasında bir hata oluştu:", error);
      return null; // Hata durumunda null döndürüyoruz
    }
  };

  const fetchToken = () => {
    const token = Cookies.get("jwt");
    if (token) {
      console.log("Token başarıyla alındı:", token);
      return token;
    } else {
      console.error("Token bulunamadı. Cookie ayarlarını kontrol edin.");
      return null;
    }
  };

  const fetchSignupUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ name: string; email: string; password: string } | null> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        { name: name, email: email, password: password }
      );
      console.log("Kayıt Başarılı", response);

      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      return null;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchToken,
        fetchProducts,
        fetchUser,
        fetchSignupUser,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };

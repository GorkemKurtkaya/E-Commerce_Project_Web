import React, { createContext, useState, ReactNode } from "react";
import { Product, User } from "../types/Types"; // Ürün tipini içeri aktarıyoruz
import axios from "axios";

interface ProductContextType {
  products: Product[];
  searchProducts: (query: string) => Product[];
  fetchProducts: (category: string) => void;
  AuthCheck: () => Promise<boolean>;
  fetchUser: (
    email: string,
    password: string
  ) => Promise<{ email: string; password: string } | null>;
  fetchSignupUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ name: string; email: string; password: string } | null>;
  fetchUserInfos: () => Promise<User | null>;
  fetchChangePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<boolean>;
  fetchUserLogOut: () => Promise<boolean>;
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

      // Eğer başarılıysa, kullanıcı bilgilerini döndür
      return response.data;
    } catch (error) {
      console.error("Giriş sırasında bir hata oluştu:", error);
      return null; // Hata durumunda null döndürüyoruz
    }
  };

  const AuthCheck = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/auth", {
        withCredentials: true,
      });

      if (response.status === 200) {
        //Kullanıcı doğrulandı
        // Kullanıcı verilerini çekebilirsiniz
        return true; // Başarılı giriş
      }
    } catch (error) {
      console.error("Doğrulama hatası:", error);
      return false; // Başarısız giriş
    }
    return false; // Diğer durumlar
  };

  const fetchUserInfos = async (): Promise<User | null> => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users/checkUser",
        {
          withCredentials: true,
        }
      );
      const userInfos = response.data.user;
      return userInfos; // Kullanıcı bilgilerini döndür
    } catch (error) {
      console.error("Kullanıcı bilgileri çekilirken hata oluştu:", error);
      return null; // Hata durumunda null döndür
    }
  };

  const fetchChangePassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/changePassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Şifre başarıyla değiştirildi.");
        return true; // Başarılı giriş
      } else {
        console.error("Şifre değiştirme başarısız oldu:", response.status);
        return false; // Başarısız giriş
      }
    } catch (error) {
      console.error("Şİfre Değiştirilmedi", error);
      return false; // Başarısız giriş
    }
  };

  const fetchUserLogOut = async () => {
    try {
      // JWT token'ını içeren bir istek gönder
      await axios.get("http://localhost:3000/logout", {
        withCredentials: true, // JWT'nin cookies'ten gönderilmesini sağlamak için
      });

      // Kullanıcı bilgilerini ve token'ı kaldır
      return false; // Kullanıcı çıkış yaptı olarak ayarla

      // Login sayfasına yönlendir
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
      return true;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        AuthCheck,
        fetchProducts,
        fetchUser,
        fetchSignupUser,
        searchProducts,
        fetchUserInfos,
        fetchChangePassword,
        fetchUserLogOut,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };

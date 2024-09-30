import React, { createContext, useState, ReactNode } from "react";
import { Product, User, Address } from "../types/Types";
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
  fetchUserId: () => Promise<string>;
  fetchChangeName: (name: string) => void;
  fetchGetAdresses: () => Promise<Address | null>;
  fetchAddAddress: (id: string) => void;
  fetchUpdateAddress: (id: string, address: string) => void;
  fetchDeleteAddress: (address: string) => void;
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
        price: 36.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 2,
        name: "Snake Plant",
        category: "Trash",
        price: 30.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 3,
        name: "Aloe Vera",
        category: "Trash",
        price: 25.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 4,
        name: "Aloe Vera",
        category: "Indoor",
        price: 25.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 5,
        name: "Aloe Vera",
        category: "Indoor",
        price: 25.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 6,
        name: "Aloe Vera",
        category: "Indoor",
        price: 25.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 7,
        name: "Aloe Vera",
        category: "Indoor",
        price: 25.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 8,
        name: "Aloe Vera",
        category: "Indoor",
        price: 25.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 9,
        name: "Aloe Vera",
        category: "Indoor",
        price: 25.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
      },
      {
        id: 10,
        name: "Aloe Vera",
        category: "Indoor",
        price: 25.0,
        imageUrl:
          "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
        quantity: 3,
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

  const fetchUserId = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users/checkUser",
        {
          withCredentials: true,
        }
      );
      const userInfos = response.data.user;
      return userInfos._id; // Kullanıcı bilgilerini döndür
    } catch (error) {
      console.error("Kullanıcı bilgileri çekilirken hata oluştu:", error);
      return null; // Hata durumunda null döndür
    }
  };

  const fetchChangeName = async (name: string) => {
    try {
      const response = axios.put(
        "http://localhost:3000/users/changeName",
        {
          name: name,
        },
        {
          withCredentials: true,
        }
      );
      console.log("İsim Değiştirildi", response);
    } catch (error) {
      console.log("Bilgiler Değiştirilirken Hata Oluştu", error);
    }
  };

  const fetchGetAdresses = async (): Promise<Address | null> => {
    try {
      const id = await fetchUserId();
      if (id) {
        const response = await axios.get(
          `http://localhost:3000/users/adresgetir/${id}`,
          {
            withCredentials: true,
          }
        );
        return response.data.addresses;
      }
      return null;
    } catch (error) {
      console.error("Kullanıcı Adresleri Çekilirken Hata Oluştu", error);
      return null;
    }
  };

  const fetchAddAddress = async (newAddress: string) => {
    try {
      const response = axios.post(
        "http://localhost:3000/users/addAddress",
        {
          address: newAddress,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Adres Eklendi", response);
    } catch (error) {
      console.log("Adres Eklerken Hata Oluştu", error);
    }
  };

  const fetchDeleteAddress = async (id: string) => {
    try {
      const response = axios.delete(
        `http://localhost:3000/users/adresSil/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log("Adres Silindi", response);
    } catch (error) {
      console.log("Adres Silinirken Hata Oluuştu", error);
    }
  };

  const fetchUpdateAddress = async (id: string, address: string) => {
    try {
      const response = axios.put(
        `http://localhost:3000/users/adresGuncelle/${id}`,
        {
          address: address,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Adres Güncellendi", response);
    } catch (error) {
      console.log("Adres Silerken Hata Oluştu", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchUserId,
        AuthCheck,
        fetchChangeName,
        fetchGetAdresses,
        fetchUpdateAddress,
        fetchDeleteAddress,
        fetchAddAddress,
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

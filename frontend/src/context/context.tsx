import React, { createContext, ReactNode } from "react";
import { Product, User, Address, Order } from "../types/Types";
import axios from "axios";

interface ProductContextType {
  // products: Product[];
  searchProducts: (query: string) => Promise<Product[] | null>;
  fetchProducts: (category: string) => Promise<Product[] | null>;
  getProductById: (id: string) => Promise<Product | null>;
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
  fetchGetAllOrders: () => Promise<Order[] | null>;
  fetchGetOrderById: (id: string) => Promise<Order | null>;
  fetchUserLogOut: () => Promise<boolean>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const fetchProducts = async (category: string): Promise<Product[] | null> => {
    try {
      const response = await axios.get("http://localhost:3000/product/");
      const products: Product[] = response.data;

      if (Array.isArray(products)) {
        return category
          ? products.filter((product) => product.category[0] === category) // Filtered products
          : products; // All products
      } else {
        console.error("Unexpected response structure:", products);
        return null; // Not an array
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return null;
    }
  };

  const searchProducts = async (query: string): Promise<Product[]> => {
    if (!query) return []; // Return empty array if query is empty
    const products = await fetchProducts(""); // Fetch all products

    // Use optional chaining and provide a default empty array
    return (
      products?.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      ) || [] // Always return an array
    );
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/find/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Hata", error);
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
      const response = await axios.put(
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
      const response = await axios.post(
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
      const response = await axios.delete(
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
      const response = await axios.put(
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

  const fetchGetAllOrders = async (): Promise<Order[] | null> => {
    try {
      const id = await fetchUserId();
      const response = await axios.get(
        `http://localhost:3000/orders/find/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Siparişleri Görüntülerken Bir Hata Oluştu", error);
      return null;
    }
  };

  const fetchGetOrderById = async (id: string): Promise<Order | null> => {
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:3000/orders/find/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Hata", error);
      return null;
    }
  };
  return (
    <ProductContext.Provider
      value={{
        fetchUserId,
        AuthCheck,
        fetchChangeName,
        fetchGetAdresses,
        getProductById,
        fetchUpdateAddress,
        fetchDeleteAddress,
        fetchGetAllOrders,
        fetchGetOrderById,
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

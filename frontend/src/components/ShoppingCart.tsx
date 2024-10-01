import "../index.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Product } from "../types/Types"; // Arayüz dosyasının yolunu ayarlayın

function ShoppingCart() {
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]); // Product arayüzünü kullanıyoruz
  const shoppingCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shoppingCartRef.current &&
        !shoppingCartRef.current.contains(event.target as Node)
      ) {
        setIsShoppingCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const getProductsCount = () => {
      const storedProducts = localStorage.getItem("shoppingCart");
      if (storedProducts) {
        const productList: Product[] = JSON.parse(storedProducts); // Product türünde parse ediliyor
        setCartItems(productList); // Sepet ürünlerini state'e kaydet
        return productList.length;
      }
      return 0;
    };

    setItemsCount(getProductsCount());

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartDropdownOptionClick = () => {
    setIsShoppingCartOpen(false);
  };

  const handleRemoveItem = (index: number) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCartItems)); // Güncellenmiş ürün listesini kaydet
    setItemsCount(updatedCartItems.length); // Ürün sayısını güncelle
  };

  return (
    <div className="relative inline-block" ref={shoppingCartRef}>
      <div className="relative">
        <i
          className="fa-solid fa-cart-shopping cursor-pointer"
          onClick={() => setIsShoppingCartOpen((prev) => !prev)}
          aria-label="Sepet"
        >
          {itemsCount > 0 && (
            <span className="absolute text-xs rounded-full -mt-2 -mr-2 px-1 font-bold top-0 right-0 bg-[#ff0000] text-white">
              {itemsCount}
            </span>
          )}
        </i>
      </div>

      {isShoppingCartOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
          <div>
            <ul className="list-none p-0 m-0">
              {cartItems.map((item, index) => (
                <li
                  key={item._id} // Ürün kimliğini kullanarak anahtar oluştur
                  className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                >
                  <Link
                    to={`/product/${item._id}`} // Ürün sayfasına yönlendirme
                    state={{ product: item }} // Ürün bilgilerini state ile gönder
                    className="flex-auto flex items-center" // Flex ile içeriği ortala
                    onClick={handleCartDropdownOptionClick} // Dropdown'u kapat
                  >
                    <div className="p-2 w-12">
                      <img
                        src={item.imageUri} // Ürün resmi
                        alt={item.title} // Ürün adı ile alt metin
                        className="object-cover w-full h-12" // Resmi boyutlandırmak için stil ekleyebilirsiniz
                      />
                    </div>
                    <div className="text-sm w-32">
                      <div className="font-bold">{item.title}</div>
                      <div className="text-gray-400">Qt: {item.quantity}</div>
                      <div className="text-gray-400">Fiyat: {item.price}₺</div>
                      {/* Ürün fiyatını göster */}
                    </div>
                  </Link>
                  <div className="ml-2">
                    <i
                      className="fa-solid fa-trash cursor-pointer text-[#ff0000]"
                      onClick={() => handleRemoveItem(index)} // Silme fonksiyonunu çağır
                    ></i>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-2">
              <Link
                to="/shopping"
                className="block text-center hover:underline"
                onClick={handleCartDropdownOptionClick}
              >
                Sepete Git
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;

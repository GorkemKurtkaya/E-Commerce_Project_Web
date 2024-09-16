import "../index.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shoppingCartRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const itemsCount = 2; // Örnek ürün sayısı
  const user = false;

  // Dropdown'u açma/kapama işlemi
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Dropdown dışına tıklayınca menüyü kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        shoppingCartRef.current &&
        !shoppingCartRef.current.contains(event.target as Node)
      ) {
        setIsShoppingCartOpen(false); // Kullanıcı sepet menüsü dışına tıkladı, sepet menüsünü kapat
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dropdown'da bir seçeneğe tıklayınca kapatma
  const handleDropdownOptionClick = () => {
    setIsDropdownOpen(false); // Dropdown'u kapat
  };
  const handleCartDropdownOptionClick = () => {
    setIsShoppingCartOpen(false);
  };

  return (
    <div className="top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 justify-start flex-shrink-0 items-center gap-4">
            <img
              className="block h-12 w-auto max-w-full object-contain"
              src="src/assets/vector.jpg"
              alt="Logo"
            />
          </div>

          <div className="flex flex-1 items-stretch md:justify-start justify-center">
            <Link className="flex flex-shrink-0 items-center" to="/">
              <span className="no-underline hover:underline text-sm md:text-base lg:text-lg xl:text-xl">
                Ana Sayfa
              </span>
            </Link>
          </div>

          {location.pathname === "/" && (
            <div className="flex flex-1 items-center justify-start mx-auto text-gray-600">
              <input
                className="border border-gray-300 placeholder-current h-10 px-3 rounded-md text-md focus:outline-none dark:bg-gray-300 dark:border-gray-50 dark:text-gray-500 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2"
                type="search"
                name="search"
                placeholder="Ara"
              />
            </div>
          )}

          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-2 sm:space-x-3 md:space-x-4">
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
                  <ul className="list-none p-0 m-0">
                    <li className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                      <div className="p-2 w-12">
                        <img
                          src="https://dummyimage.com/50x50/bababa/0011ff&amp;text=50x50"
                          alt="Product"
                        />
                      </div>
                      <div className="flex-auto text-sm w-32">
                        <div className="font-bold">Product 1</div>
                        <div className="text-gray-400">Qt: 2</div>
                      </div>
                      <div>
                        <i className="fa-solid fa-trash cursor-pointer text-[#ff0000]"></i>
                      </div>
                    </li>
                    <li className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                      <div className="p-2 w-12">
                        <img
                          src="https://dummyimage.com/50x50/bababa/0011ff&amp;text=50x50"
                          alt="Product"
                        />
                      </div>
                      <div className="flex-auto text-sm w-32">
                        <div className="font-bold">Product 1</div>
                        <div className="text-gray-400">Qt: 2</div>
                      </div>
                      <div>
                        <i className="fa-solid fa-trash cursor-pointer text-[#ff0000]"></i>
                      </div>
                    </li>
                    {/* Diğer ürünler buraya eklenecek */}
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
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="focus:outline-none"
                aria-label="Kullanıcı Menüsü"
              >
                <i className="fa-solid fa-user"></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    {user ? (
                      <>
                        <li className="block px-4 py-2 text-gray-700">
                          Merhaba, {user}
                        </li>
                        <li>
                          <Link
                            to="/account"
                            onClick={handleDropdownOptionClick}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                          >
                            Hesabım
                          </Link>
                        </li>
                        <li>
                          <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200">
                            Çıkış Yap
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                            onClick={handleDropdownOptionClick}
                          >
                            Giriş Yap
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/signup"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                            onClick={handleDropdownOptionClick}
                          >
                            Kayıt Ol
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

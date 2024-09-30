import "../index.css";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Product } from "../types/Types";
import { ProductContext } from "../context/context";
import SearchItem from "./SearchItem";
import ShoppingCart from "./ShoppingCart";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [role, setRole] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const userData = context?.fetchUserInfos;

  const { searchProducts } = context;

  const fetchUserLogOut = context?.fetchUserLogOut;

  const AuthCheck = context?.AuthCheck;

  useEffect(() => {
    const checkAuth = async () => {
      if (AuthCheck) {
        const check = await AuthCheck(); // AuthCheck'in sonucunu bekle
        setIsLoggedIn(check); // Sonucu setState ile ayarla
      }
    };

    const fetchUserData = async () => {
      const user = await userData();
      if (user) {
        setRole(user.role);
      }
    };

    fetchUserData();
    checkAuth(); // Fonksiyonu çağır
  }, [AuthCheck]);

  useEffect(() => {
    const results = searchProducts(searchQuery);
    setSearchResults(results);
  }, [searchQuery, searchProducts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Sayfa değiştiğinde arama query ve dropdown'ları temizle
    setSearchQuery("");
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDropdownOptionClick = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = async () => {
    const isLoggedOut = await fetchUserLogOut(); // Çıkış fonksiyonunu çağır
    console.log(isLoggedOut);

    if (!isLoggedOut) {
      // Eğer çıkış başarılıysa
      navigate("/login"); // Login sayfasına yönlendir
      window.location.reload(); // Sayfayı yenile
    } else {
      console.error("Çıkış işlemi başarısız oldu.");
    }
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

          {(location.pathname === "/" ||
            matchPath("/product/:id", location.pathname)) && (
            <div className="relative flex flex-1 items-center justify-start mx-auto text-gray-600">
              <input
                className="border border-gray-300 placeholder-current h-10 px-3 rounded-md text-md focus:outline-none dark:bg-gray-300 dark:border-gray-50 dark:text-gray-500 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2"
                type="search"
                name="search"
                placeholder="Ara"
                value={searchQuery}
                onChange={handleSearchChange}
                autoComplete="off"
              />
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute z-50 top-full mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <ul className="list-none p-0 m-0">
                    {searchResults.slice(0, 5).map((product, index) => (
                      <SearchItem key={index} product={product} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-2 sm:space-x-3 md:space-x-4">
            <ShoppingCart />

            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="focus:outline-none">
                <i className="fa-solid fa-user"></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    {isLoggedIn ? (
                      <>
                        <li>
                          {role === "user" ? (
                            <>
                              <Link
                                to="/account"
                                onClick={handleDropdownOptionClick}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                              >
                                Hesabım
                              </Link>
                            </>
                          ) : role === "admin" ? (
                            <>
                              <Link
                                to="/admin"
                                onClick={handleDropdownOptionClick}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                              >
                                Hesabım
                              </Link>
                            </>
                          ) : null}
                        </li>
                        <li>
                          <button
                            onClick={handleLogOut}
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                          >
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

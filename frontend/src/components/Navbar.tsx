import "../index.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

interface NavbarProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Dropdown'u açma/kapama işlemi
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Dropdown dışına tıklayınca menüyü kapatma
  useEffect(() => {
    // const savedUser = localStorage.getItem("user");

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

  // Dropdown'da bir seçeneğe tıklayınca kapatma
  const handleDropdownOptionClick = () => {
    setIsDropdownOpen(false); // Dropdown'u kapat
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
            <Link to="/shopping">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="focus:outline-none">
                <i className="fa-solid fa-user"></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    {user ? (
                      <>
                        <li className="block px-4 py-2 text-gray-700">
                          Merhaba, {user.name}
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
                          <button
                            onClick={onLogout}
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

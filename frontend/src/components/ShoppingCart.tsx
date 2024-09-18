import "../index.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function ShoppingCart() {
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartDropdownOptionClick = () => {
    setIsShoppingCartOpen(false);
  };

  const itemsCount = 2;
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

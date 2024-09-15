import "../index.css";
import "../styles/productPages.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function ProductPages() {
  const location = useLocation();
  const product = location.state?.product; // Ürünü state'den al

  const [counter, setCounter] = useState(1);

  const shoppingClick = () => {
    console.log("ürün eklendi");
  };

  return (
    <div className=" py-8 bg-[#F5F7F8] flex-1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg border-2 border-gray-300  relative">
              <img
                className="absolute inset-0 w-full bg-white h-full object-scale-down rounded-lg p-4"
                src={product?.imageUrl}
                alt={product.name}
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4 flex flex-col justify-between ">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold text-black mb-2">
                {product.name}
              </h2>
              <p className="text-black text-md text-justify mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt.
              </p>
              <div className="flex mb-4 justify-between items-center">
                <div className="flex flex-grow justify-center">
                  <div className="text-center">
                    <span className="font-bold text-black">Price:</span>
                    <span className="text-black block">{product.price}</span>
                  </div>
                </div>
                <div className="flex flex-grow justify-center">
                  <div className="text-center">
                    <span className="font-bold text-black">Availability:</span>
                    <span className="text-black block">In Stock</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-bold text-xl text-black ">
                  Product Description:
                </span>
                <p className="text-black text-md text-justify mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                  Duis dapibus augue vel ipsum pretium, et venenatis sem
                  blandit. Quisque ut erat vitae nisi ultrices placerat non eget
                  velit. Integer ornare mi sed ipsum lacinia, non sagittis
                  mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                  tincidunt mi consectetur.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center h-full">
              <div className="flex items-center">
                <button
                  className="border border-gray-600 rounded-md py-2 px-4"
                  onClick={() => {
                    if (counter > 1) setCounter(counter - 1); // Sıfırdan küçük olmasını engelle
                  }}
                >
                  -
                </button>

                <input
                  value={counter}
                  type="number"
                  className="text-center w-12 border border-gray-500 rounded-md mx-2 py-2 appearance-none"
                  onChange={(e) => setCounter(Number(e.target.value))} // Elle giriş yapılırsa sayı güncellenir
                />

                <button
                  className="border border-gray-600 rounded-md py-2 px-4"
                  onClick={() => setCounter(counter + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-auto mb-4 md:mb-0">
              <div className="w-full max-w-xs px-2">
                <button
                  onClick={shoppingClick}
                  className="w-full bg-gray-900 dark:bg-gray-400 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPages;

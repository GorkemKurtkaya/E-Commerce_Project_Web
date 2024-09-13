import "../index.css";
import { useState } from "react";

function Shopping() {
  const [counter, setCounter] = useState(1);
  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Alışveriş Sepeti</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text- font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-4">
                      <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between">
                        <div className="mb-4 md:mb-0 md:flex-shrink-0">
                          <img
                            className="h-16 w-16"
                            src="https://via.placeholder.com/150"
                            alt="Product image"
                          />
                        </div>

                        <div className="text-center md:text-center md:flex-1">
                          <span className="font-semibold">Product name</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
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
                    </td>
                    <td className="py-4 text-right md:text-left">
                      ${counter * 20}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${counter * 20 - (counter * 20) / 5}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>${(counter * 20) / 5}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${counter * 20}</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopping;

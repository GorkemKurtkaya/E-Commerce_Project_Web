import { useState } from "react";
import Infos from "../components/accountComponents/Infos";
import ChangePassword from "../components/accountComponents/ChangePassword";
import Adresses from "../components/accountComponents/Adresses";
import PurchasedProducts from "../components/accountComponents/PurchasedProducts";

const Account = () => {
  const [selectedSection, setSelectedSection] = useState(1);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sol Taraf */}
      <div className="w-full md:w-1/5 bg-gray-100 p-4">
        <div className="flex flex-col items-center md:justify-center h-full space-y-4">
          {" "}
          {/* Flex-col ve aralarına boşluk ekledim */}
          <button
            onClick={() => setSelectedSection(1)}
            className={`w-full py-2 text-left px-4 ${
              selectedSection === 1
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } rounded-md`}
          >
            Bilgilerim
          </button>
          <button
            onClick={() => setSelectedSection(2)}
            className={`w-full py-2 text-left px-4 ${
              selectedSection === 2
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } rounded-md`}
          >
            Şifre Değiştirme
          </button>
          <button
            onClick={() => setSelectedSection(3)}
            className={`w-full py-2 text-left px-4 ${
              selectedSection === 3
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } rounded-md`}
          >
            Adreslerim
          </button>
          <button
            onClick={() => setSelectedSection(4)}
            className={`w-full py-2 text-left px-4 ${
              selectedSection === 4
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } rounded-md`}
          >
            Geçmiş Siparişlerim
          </button>
        </div>
      </div>

      {/* Sağ Taraf */}
      <div className="w-full md:w-4/5 bg-white p-4">
        {/* Seçilen bölümün içeriği */}
        {selectedSection === 1 && (
          <div>
            <Infos />
          </div>
        )}
        {selectedSection === 2 && (
          <div>
            <ChangePassword />
          </div>
        )}
        {selectedSection === 3 && (
          <div>
            <Adresses />
          </div>
        )}
        {selectedSection === 4 && (
          <div>
            <PurchasedProducts />
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;

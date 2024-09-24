import "../../index.css";
import { useState, useContext } from "react";
import { ProductContext } from "../../context/context";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const fetchChangePassword = context?.fetchChangePassword;

  const handleClick = async () => {
    if (oldPassword !== "") {
      if (newPassword1 !== "" && newPassword2 !== "") {
        if (newPassword1 === newPassword2) {
          console.log("geldi");
          const changePassword = await fetchChangePassword(
            oldPassword,
            newPassword1
          );

          if (changePassword) {
            console.log("Şifre Güncellendi");
            setOldPassword("");
            setNewPassword1("");
            setNewPassword2("");
          } else {
            console.log("Şifre Değiştirirken Hata Oluştu");
          }
        } else {
          console.log("Şifreler uyuşmuyor");
        }
      } else {
        console.log("Yeni Şifre Giriniz");
      }
    } else {
      console.log("Eski Şifrenizi Giriniz");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">
        Yeni Şifrenizi Oluşturunuz
      </h1>
      <div className="flex flex-col md:flex-row  p-4">
        <div className="w-full md:w-1/3 p-2">
          <span>Mevcut Şifreniz</span>
          <input
            type="text"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="block text-lg border border-gray-400 rounded-lg p-2 mt-2"
          />
        </div>
        <div className="w-full md:w-1/3 p-2">
          <span>Yeni Şifreniz</span>
          <input
            type="text"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            className="block text-lg border border-gray-400 rounded-lg p-2 mt-2"
          />
        </div>
        <div className="w-full md:w-1/3 p-2">
          <span>Şifreyi Onayla</span>
          <input
            type="text"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            className="block text-lg border border-gray-400 rounded-lg p-2 mt-2"
          />
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleClick}
        >
          Şifreyi Değiştir
        </button>
      </div>
    </div>
  );
}
export default ChangePassword;

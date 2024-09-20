import { useState, useEffect } from "react";
import axios from "axios";

const Infos = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Kullanıcı bilgilerini API'den çek
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/checkUser", {
          withCredentials: true, // Gerekirse cookie'leri göndermek için
        });
        const user = response.data.user;
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone || ""); // Telefon numarası yoksa boş bırak
      } catch (error) {
        console.error("Kullanıcı bilgileri çekilirken hata oluştu:", error);
      }
    };

    fetchUserData();
  }, []); // Boş bağımlılık dizisi, yalnızca bileşen ilk yüklendiğinde çalışır

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
    // Burada bilgileri güncelleyebilirsiniz (gerekirse bir API isteği atabilirsin)
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">Bilgilerim</h1>
      <div className="flex flex-col md:flex-row p-4">
        <div className="w-full md:w-1/3 p-2">
          <span className="block text-md font-medium">Ad Soyad</span>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block text-lg border border-gray-400 rounded-lg p-2 mt-2"
            />
          ) : (
            <span className="block text-lg">{name}</span>
          )}
        </div>
        <div className="w-full md:w-1/3 p-2">
          <span className="block text-md font-medium">E-mail</span>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block text-lg border border-gray-400 rounded-lg p-2 mt-2"
            />
          ) : (
            <span className="block text-lg">{email}</span>
          )}
        </div>
        <div className="w-full md:w-1/3 p-2">
          <span className="block text-md font-medium">Telefon Numarası</span>
          {isEditing ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block text-lg border border-gray-400 rounded-lg p-2 mt-2"
            />
          ) : (
            <span className="block text-lg">{phone}</span>
          )}
        </div>
      </div>
      <div className="text-center mt-6">
        {isEditing ? (
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Güncelle
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Düzenle
          </button>
        )}
      </div>
    </div>
  );
};

export default Infos;

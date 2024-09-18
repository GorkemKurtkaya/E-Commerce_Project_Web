import { useState } from "react";

const Infos = () => {
  // Başlangıçta bilgileri span olarak göster
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Ömer Fikri Gülcemal");
  const [email, setEmail] = useState("omer.fikri23@gmail.com");
  const [phone, setPhone] = useState("0500000000");

  // Edit butonuna tıklandığında edit moduna geç
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Güncelle butonuna tıklandığında bilgileri güncelle ve çıkış yap
  const handleUpdateClick = () => {
    setIsEditing(false);
    // Burada bilgileri güncelleyebilirsiniz
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">Bilgilerim</h1>
      <div className="flex flex-col md:flex-row  p-4">
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
              type="number"
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

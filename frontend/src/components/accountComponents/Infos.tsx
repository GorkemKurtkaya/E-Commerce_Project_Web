import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../context/context";

const Infos = () => {
  // Başlangıçta bilgileri span olarak göster
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const userData = context.fetchUserInfos;
  const changeName = context.fetchChangeName;

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await userData();
      if (user) {
        setName(user.name);
        setPhone(user.phone);
        setEmail(user.email);
      }
    };

    fetchUserData();
  }, []); // Boş bağımlılık dizisi, yalnızca bileşen ilk yüklendiğinde çalışır

  // Edit butonuna tıklandığında edit moduna geç
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Güncelle butonuna tıklandığında bilgileri güncelle ve çıkış yap
  const handleUpdateClick = () => {
    setIsEditing(false);
    changeName(name);
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

          <span className="block text-lg">{email}</span>
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

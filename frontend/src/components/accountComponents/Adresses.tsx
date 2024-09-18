import "../../index.css";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface Address {
  id: number;
  address: string;
}

function Adresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, address: "1234 Elm Street" },
    { id: 2, address: "5678 Oak Avenue" },
  ]);
  const [newAddress, setNewAddress] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAddress, setEditAddress] = useState<string>("");

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSaveAddress = () => {
    if (newAddress.trim()) {
      setAddresses([...addresses, { id: Date.now(), address: newAddress }]);
      setNewAddress("");
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleEdit = (id: number, address: string) => {
    setEditingId(id);
    setEditAddress(address);
  };

  const handleSaveEdit = () => {
    if (editAddress.trim() && editingId !== null) {
      setAddresses(
        addresses.map((address) =>
          address.id === editingId
            ? { ...address, address: editAddress }
            : address
        )
      );
      setEditingId(null);
      setEditAddress("");
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewAddress("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center">Adreslerim</h1>
      <table className="min-w-full border-collapse mt-4 border-spacing-y-4">
        <tbody>
          {addresses.map((address) => (
            <tr key={address.id} className="flex">
              <td className="flex-1 p-4" style={{ flex: "0 0 80%" }}>
                {editingId === address.id ? (
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="border border-gray-400 rounded p-2 w-full"
                  />
                ) : (
                  address.address
                )}
              </td>
              <td className="flex-none p-4" style={{ flex: "0 0 20%" }}>
                <div className="flex justify-end gap-4 items-center">
                  {editingId === address.id ? (
                    <button
                      onClick={handleSaveEdit}
                      title="Kaydet"
                      className="mr-2 text-green-500"
                    >
                      <i className="fas fa-save"></i>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(address.id, address.address)}
                        title="Düzenle"
                        className="mr-2 text-blue-500"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(address.id)}
                        title="Sil"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {isAdding && (
            <tr className="flex">
              <td className="flex-1 p-4" style={{ flex: "0 0 80%" }}>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="border border-gray-400 rounded p-2 w-full"
                />
              </td>
              <td className="flex-none p-4" style={{ flex: "0 0 20%" }}>
                <div className="flex justify-end gap-4 items-center">
                  <button
                    onClick={handleSaveAddress}
                    title="Ekle"
                    className="text-green-500 mr-2"
                  >
                    Ekle
                  </button>
                  <button
                    onClick={handleCancelAdd}
                    title="İptal"
                    className="text-red-500"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isAdding && (
        <div className="text-center mt-4">
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Yeni Adres Ekle
          </button>
        </div>
      )}
    </div>
  );
}

export default Adresses;

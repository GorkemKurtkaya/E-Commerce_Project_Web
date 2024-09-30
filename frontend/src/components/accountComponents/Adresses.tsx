import "../../index.css";
import { useState, useEffect, useContext } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ProductContext } from "../../context/context";
import { Address } from "../../types/Types";

function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAddress, setEditAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const {
    fetchGetAdresses,
    fetchAddAddress,
    fetchDeleteAddress,
    fetchUpdateAddress,
  } = context;

  useEffect(() => {
    const userAddresses = async () => {
      try {
        const fetchedAddresses = await fetchGetAdresses();
        if (Array.isArray(fetchedAddresses)) {
          // fetchedAddresses'in bir dizi olduğundan emin olun
          setAddresses(fetchedAddresses);
        } else {
          setAddresses([]); // Eğer null veya geçersiz bir değer dönerse boş bir dizi ayarla
        }
      } catch (error) {
        console.error("Adresler alınırken hata oluştu:", error);
      }
    };
    userAddresses();
  }, [fetchGetAdresses, isAdding]);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSaveAddress = async () => {
    if (newAddress.trim()) {
      setLoading(true);
      try {
        await fetchAddAddress(newAddress);
        setNewAddress("");
        setIsAdding(false);
        setLoading(false);
        fetchGetAdresses(); // Refetch addresses after adding
      } catch (error) {
        console.error("Adres eklenirken hata oluştu:", error);
        setError("Adres eklenirken hata oluştu.");
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await fetchDeleteAddress(id);
      setAddresses(addresses.filter((address) => address._id !== id));
      setLoading(false);
    } catch (error) {
      console.error("Adres silinirken hata oluştu:", error);
      setError("Adres silinirken hata oluştu.");
      setLoading(false);
    }
  };

  const handleEdit = (id: string, address: string) => {
    setEditingId(id);
    setEditAddress(address);
  };

  const handleSaveEdit = async () => {
    if (editAddress.trim() && editingId !== null) {
      setLoading(true);
      try {
        fetchUpdateAddress(editingId, editAddress);
        setAddresses(
          addresses.map((address) =>
            address._id === editingId
              ? { ...address, address: editAddress }
              : address
          )
        );
        setEditingId(null);
        setEditAddress("");
        setLoading(false);
      } catch (error) {
        console.error("Adres güncellenirken hata oluştu:", error);
        setError("Adres güncellenirken hata oluştu.");
        setLoading(false);
      }
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewAddress("");
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditAddress("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center">Adreslerim</h1>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <table className="min-w-full border-collapse mt-4 border-spacing-y-4">
        <tbody>
          {addresses.map((address) => (
            <tr key={address._id} className="flex">
              <td className="flex-1 p-4" style={{ flex: "0 0 80%" }}>
                {editingId === address._id ? (
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
                  {editingId === address._id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        title="Kaydet"
                        className="mr-2 text-green-500"
                        disabled={loading}
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        title="İptal"
                        className="text-red-500"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(address._id, address.address)}
                        title="Düzenle"
                        className="mr-2 text-blue-500"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(address._id)}
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
                    disabled={loading}
                  >
                    {loading ? "Ekle..." : "Ekle"}
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

export default Addresses;

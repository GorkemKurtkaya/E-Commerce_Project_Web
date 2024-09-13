import "../index.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Categories({
  onSendData,
}: {
  onSendData: (visible: boolean, category: string) => void;
}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleCategory, setVisibleCategory] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handles category change and sends data to parent
  const handleCategoryChange = (newCategory: string) => {
    const currentCategory =
      visibleCategory === newCategory ? null : newCategory;

    if (currentCategory) {
      // Yeni bir kategori seçiliyorsa, URL'yi güncelle
      navigate(`/?category=${currentCategory}`, { replace: true });
    } else {
      // Kategori seçili değilse, URL'yi temizle
      navigate("/", { replace: true });
    }

    setVisibleCategory(currentCategory);
    onSendData(visible, currentCategory || "");
  };

  // Kategori görünümünü URL'den almak için useEffect kullanımı
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    setVisibleCategory(category);
  }, [location.search]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        visible ? "md:w-1/6 bg-white sm:w-full " : "w-16"
      } flex flex-col min-w-[4rem] relative `}
    >
      <button
        onClick={() => {
          const newVisible = !visible;
          setVisible(newVisible);
          onSendData(newVisible, visibleCategory || "");
        }}
        className="flex justify-end p-4"
      >
        <i
          className={`fa-solid ${
            visible ? "fa-x fa-lg" : "fa-bars fa-2x"
          } text-[#4D869C]`}
        ></i>
      </button>
      {visible && (
        <div className="relative flex flex-col text-gray-700">
          <h1 className="flex items-center w-full text-2xl p-3 leading-tight transition-all rounded-lg outline-none  text-center justify-center">
            Kategoriler
          </h1>

          <nav className="grid grid-cols-2 gap-2 p-2 font-sans text-base font-normal text-blue-gray-700 md:flex md:flex-col">
            {["Inbox", "Indoor", "Trash", "Settings"].map((key) => (
              <Link
                key={key}
                to="/"
                onClick={(e) => {
                  e.preventDefault(); // Link'in varsayılan davranışını engelle
                  handleCategoryChange(key);
                }}
                className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                  visibleCategory === key ? "bg-gray-500 text-white" : ""
                }  hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}
              >
                {key}
                <button className="ml-auto">
                  <i
                    className={`fa-solid ${
                      visibleCategory === key ? "fa-x" : "hidden"
                    } text-[#d87e7e]`}
                  ></i>
                </button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export default Categories;

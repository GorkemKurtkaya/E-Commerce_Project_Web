import "../index.css";
import { useState, useEffect } from "react";
import Products from "../components/Products";
import Categories from "../components/Categories";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [visible, setVisible] = useState<boolean>(false);
  const [chooseCategory, setChooseCategory] = useState<string>(
    query.get("category") || ""
  );

  const handleDataFromChild = (childData: boolean, category: string) => {
    setVisible(childData);
    setChooseCategory(category);
  };
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setChooseCategory(query.get("category") || "");
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row flex-1 bg-gray-100">
      <Categories onSendData={handleDataFromChild} />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out mb-4 ${
          visible ? "ml-1/4" : "ml-1/12"
        }`}
      >
        <Products category={chooseCategory} />
      </div>
    </div>
  );
}

export default Home;

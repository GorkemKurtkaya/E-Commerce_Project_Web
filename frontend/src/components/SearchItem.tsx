import "../index.css";
import { Product } from "../types/Types";
import { useNavigate } from "react-router-dom";

interface SearchItemProps {
  product: Product;
}

const SearchItem: React.FC<SearchItemProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`, {
      state: { product }, // Ürünü state ile gönder
    });
  };

  return (
    <div onClick={handleClick}>
      <li key={product._id} className="p-2 hover:bg-gray-100 cursor-pointer">
        <div className="flex items-center">
          <img
            className="w-12 h-12 object-cover"
            src={product.imageUri}
            alt={product.title}
          />
          <span className="ml-2">{product.title}</span>
        </div>
      </li>
    </div>
  );
};

export default SearchItem;

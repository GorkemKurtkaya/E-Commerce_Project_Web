import "../index.css";
import { Product } from "../types/Types";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`, {
      state: { product }, // Ürünü state ile gönder
    });
  };
  return (
    <div
      onClick={handleClick}
      className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 relative cursor-pointer overflow-hidden rounded-lg bg-white  max-w-xs shadow-lg"
    >
      <div className="relative pt-10 px-10 flex items-center justify-center">
        <img
          className="relative w-40 object-cover"
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
        />
      </div>
      <div className="relative text-[#373A40] px-6 pb-6 mt-6">
        <div className="flex justify-between">
          <span className="block font-semibold text-xl">{product.name}</span>
          <span className="bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

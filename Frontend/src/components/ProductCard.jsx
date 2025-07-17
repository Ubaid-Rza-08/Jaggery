import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="border rounded-lg shadow-sm p-6 hover:shadow-lg transition ">
<Link to={`/product/detail`}
state={{product}} 
className="no-underline">
      <img src={product.image} alt={product.name} className="h-auto w-full object-cover rounded" />
</Link>
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-yellow-700 font-bold">₹{product.price}</p>
      <button
        className="mt-2 w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
        onClick={() => addToCart( product.id)}
      >
        Add to Cart
      </button>
    </div>
  );
}


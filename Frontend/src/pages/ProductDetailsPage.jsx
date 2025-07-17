import { useLocation} from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetailsPage() {
const location = useLocation();
const {product}=location.state || {};
  const {addToCart}=useContext(CartContext);
 
  const [loading,setLoading]=useState(!product);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
 const backendApi=import.meta.env.VITE_BACKEND_URL;


if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
if (!product) {
  return <div className="text-center mt-10 text-red-500">Product not found</div>;
}
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2">
            <img src={product.image} alt={product.name} className="w-full rounded-lg shadow" />
          </div>

          {/* Info */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-yellow-800">{product.name}</h2>
            <p className="text-xl text-gray-700 font-semibold">₹{product.price}</p>
            <p className="text-green-600">{product.stock > 0 ? "In stock" : "Out of stock"}</p>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <label className="text-gray-600">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>

            {/* Add to Cart */}
            <button
              onClick={()=>addToCart(product.id)}
              className="mt-4 bg-yellow-700 text-white px-6 py-2 rounded hover:bg-yellow-800"
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>

            {/* Ingredients */}
            <p className="mt-4 text-sm text-gray-600"><strong>Ingredients:</strong> {product.ingredients}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-2 text-yellow-700">Product Description</h3>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    
    </>
  );
}

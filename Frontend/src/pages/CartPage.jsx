import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-yellow-800">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">
            Your cart is empty.{" "}
            <Link to="/" className="text-yellow-700 underline">
              Shop Now
            </Link>
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      max={item.stock}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="w-16 px-2 py-1 border rounded"
                    />
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 border rounded-lg shadow-md max-w-md ml-auto">
              <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
              <p className="text-gray-700 mb-4">
                Total: <strong>₹{total}</strong>
              </p>
              <button
                className="bg-yellow-700 text-white px-6 py-2 rounded w-full hover:bg-yellow-800"
                disabled={cartItems.length === 0}
              >
                <Link to="/checkout" className="text-white">  
                    Proceed to Checkout
                </Link>
            
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

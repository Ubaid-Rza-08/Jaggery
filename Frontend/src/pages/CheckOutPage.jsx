import { CartContext } from "../context/CartContext";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import RazorpayButton from "./RazorPayButton";
export default function CheckoutPage() {
    const navigate=useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
const [order,setOrder]=useState();
  const [address, setAddress] = useState ({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
console.log(cartItems);
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-yellow-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Shipping Address</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={address.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              value={address.street}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={address.zip}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div className="border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>

            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <p className="text-lg font-bold">Total: ₹{totalAmount}</p>
            <div >
             <RazorpayButton totalAmount={totalAmount} shippingAddress={address} ></RazorpayButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

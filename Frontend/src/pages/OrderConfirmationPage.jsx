import { Link, useLocation } from "react-router-dom";
export default function OrderConfirmationPage() {
  const location = useLocation();
  const orderData = location.state?.order || {};
  const {
    id = "ORD" + Math.floor(Math.random() * 100000),
    address = {},
    cartItems = [],
    total = 0,
  } = orderData;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4); // 4 days delivery
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-green-100 p-6 rounded-md text-center mb-6 shadow">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            🎉 Order Placed Successfully!
          </h2>
          <p className="text-gray-700">
            Your order <span className="font-semibold">{id}</span> has been placed. <br />
            You'll receive your jaggery soon!
          </p>
        </div>

        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4">
            Order Details
          </h3>

          <div className="mb-4">
            <p><strong>Order ID:</strong> {id}</p>
            <p><strong>Expected Delivery:</strong> {deliveryDate.toDateString()}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-1">Delivery Address</h4>
            <p>{address.name}</p>
            <p>{address.phone}</p>
            <p>{address.street}, {address.city}</p>
            <p>{address.state} - {address.zip}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Items Ordered</h4>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="my-4" />

          <p className="text-lg font-bold text-right">Total: ₹{total}</p>
        </div>

        <div className="text-center mt-6">
          <Link to="/products">
            <button className="bg-yellow-700 text-white px-6 py-2 rounded hover:bg-yellow-800">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>

    </>
  );
}

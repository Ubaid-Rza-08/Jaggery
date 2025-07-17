import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fakeOrders = {
  "ORD123456": {
    orderId: "ORD123456",
    status: "Shipped", // can be Placed → Packed → Shipped → Out for Delivery → Delivered
    eta: "2025-06-10",
    address: {
      name: "Naresh Kushwaha",
      street: "123 Jaggery Lane",
      city: "Kanpur",
      state: "UP",
      zip: "208001",
    },
    items: [
      { name: "Palm Jaggery 1kg", quantity: 2, price: 180 },
      { name: "Sugarcane Jaggery 500g", quantity: 1, price: 70 },
    ],
  },
};

const statusSteps = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);

  const handleTrack = () => {
    // Simulate fetch order from backend
    const data = fakeOrders[orderId];
    setOrderData(data || null);
  };

  const total = orderData?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0;

  return (
    <>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-yellow-800 mb-6">📦 Track Your Order</h1>

        <div className="flex items-center gap-4 mb-8">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. ORD123456)"
            className="border px-4 py-2 rounded w-full"
          />
          <button
            onClick={handleTrack}
            className="bg-yellow-700 text-white px-6 py-2 rounded hover:bg-yellow-800"
          >
            Track
          </button>
        </div>

        {orderData ? (
          <>
            <div className="bg-white shadow rounded p-6 mb-8">
              <p><strong>Order ID:</strong> {orderData.orderId}</p>
              <p><strong>Estimated Delivery:</strong> {orderData.eta}</p>
              <p className="mt-4 font-semibold">Shipping Address</p>
              <p>{orderData.address.name}</p>
              <p>{orderData.address.street}, {orderData.address.city}</p>
              <p>{orderData.address.state} - {orderData.address.zip}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Status</h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {statusSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-5 h-5 rounded-full ${statusSteps.indexOf(orderData.status) >= index ? "bg-green-600" : "bg-gray-300"}`}></div>
                    <span className={`ml-2 mr-4 ${statusSteps.indexOf(orderData.status) >= index ? "text-green-700" : "text-gray-400"}`}>
                      {step}
                    </span>
                    {index < statusSteps.length - 1 && (
                      <div className="w-10 h-1 bg-gray-300 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded shadow">
              <h2 className="text-lg font-bold mb-2">Items Ordered</h2>
              {orderData.items.map((item, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <p className="text-right font-semibold mt-4">Total: ₹{total}</p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Enter your Order ID to view status.</p>
        )}
      </div>
      
    </>
  );
}

import React, { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [orderId, setOrderId] = useState("ORD123");
  const [amount, setAmount] = useState(150);

  const handlePayment = async () => {
    try {
      const res = await axios.post("http://localhost:8087/api/payments/stripe/create-session", {
        orderId,
        amount,
      });
      window.location.href = res.data.url; // Redirect to Stripe
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Test Food Order</h2>
      <label>Order ID: </label>
      <input value={orderId} onChange={e => setOrderId(e.target.value)} className="border p-1" /><br />
      <label>Amount (LKR): </label>
      <input value={amount} onChange={e => setAmount(e.target.value)} className="border p-1 mb-2" /><br />
      <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 mt-2">Pay Now</button>
    </div>
  );
};

export default PaymentPage;

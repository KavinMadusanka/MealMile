// src/pages/payment/PaymentPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

const PaymentPage = () => {
  const { search } = useLocation();
  const orderId = new URLSearchParams(search).get("orderId");

  const [order, setOrder] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8089/api/orders/order/${orderId}`);
        setOrder(data);
      } catch (error) {
        console.error("Failed to load order", error);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8087/api/payments/stripe/create-session",
        {
          orderId,
          amount: order.totalAmount,
          email: auth?.user?.email, // use customer email from login
        }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Something went wrong.");
    }
  };

  if (!order) return <p>Loading order details...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pay for Your Order</h2>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Payment Status:</strong> {'pending'}</p>
      <p><strong>Total Amount:</strong> LKR {order.totalAmount}</p>
      <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;

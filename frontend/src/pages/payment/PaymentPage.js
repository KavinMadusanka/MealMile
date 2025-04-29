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
        const { data } = await axios.get(
          `http://localhost:8089/api/orders/order/${orderId}`
        );
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
          email: auth?.user?.email,
        }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Something went wrong.");
    }
  };

  if (!order) {
    return (
      <div style={styles.page}>
        <p style={{ fontSize: '16px', fontWeight: '500' }}>Loading order details...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Icon */}
        <div style={styles.iconWrapper}>
          <div style={styles.iconCircle}>
            <span style={styles.exclamationMark}>💳</span>
          </div>
        </div>

        <h2 style={styles.heading}>You're almost there!</h2>
        <p style={styles.subtext}>Please complete the payment to proceed</p>

        <div style={styles.detailsBox}>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Total Amount:</strong> LKR {order.totalAmount}</p>
          <p><strong>Status:</strong> <span style={{ color: '#facc15' }}>Pending</span></p>
        </div>

        <hr style={styles.divider} />

        <button style={styles.button} onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  iconWrapper: {
    marginBottom: '20px',
  },
  iconCircle: {
    backgroundColor: '#34d399', // green-400
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  exclamationMark: {
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold',
    lineHeight: '1',
  },
  heading: {
    fontSize: '24px',
    color: '#111827',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtext: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '20px',
  },
  detailsBox: {
    fontSize: '14px',
    color: '#374151',
    textAlign: 'left',
    marginBottom: '20px',
  },
  divider: {
    margin: '20px 0',
    border: 'none',
    height: '1px',
    backgroundColor: '#e5e7eb',
  },
  button: {
    backgroundColor: '#7D0A0A', // blue-500
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
};

export default PaymentPage;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const { search } = useLocation();
  const sessionId = new URLSearchParams(search).get('session_id');
  const orderId = new URLSearchParams(search).get('orderId');

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8089/api/orders/order/${orderId}`);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div style={styles.page}>
        <p>Loading Receipt...</p>
      </div>
    );
  }

  const paymentTime = new Date(order.updatedAt || Date.now()).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short'
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Green Tick */}
        <div style={styles.iconWrapper}>
          <div style={styles.iconCircle}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="green" strokeWidth="3" viewBox="0 0 24 24" width="40" height="40">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 style={styles.heading}>Payment Successful</h2>
        <p style={styles.subtext}>Thank you for your payment. Your order is being processed.</p>
        <p style={styles.subtext}>A payment receipt has been sent to your email.</p>

        <hr style={styles.divider} />

        {/* Details */}
        <div style={styles.details}>
          <p><strong>Amount Paid:</strong> LKR {order.totalAmount}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus || "Paid"}</p>
          <p><strong>Date & Time:</strong> {paymentTime}</p>
        </div>

        {/* Optional Button */}
        <button style={styles.button} onClick={() => window.location.href = "/"}>
          Go to Homepage
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
    backgroundColor: '#d1fae5',
    borderRadius: '50%',
    display: 'inline-block',
    padding: '10px',
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
  divider: {
    margin: '20px 0',
    border: 'none',
    height: '1px',
    backgroundColor: '#e5e7eb',
  },
  details: {
    fontSize: '14px',
    color: '#374151',
    textAlign: 'left',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  }
};

export default PaymentSuccess;

import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();

  return (
    <div className="text-center p-4">
      <h2 className="text-green-600 text-2xl font-bold">Payment Successful!</h2>
      <p>Your payment has been processed successfully.</p>
      <p>Session ID: {new URLSearchParams(location.search).get("session_id")}</p>
    </div>
  );
};

export default PaymentSuccess;

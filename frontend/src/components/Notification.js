import React from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "15px 25px",
      backgroundColor: type === "success" ? "#28a745" : (type === "error" ? "#dc3545" : "#17a2b8"),
      color: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      zIndex: 9999,
      fontSize: "16px"
    }}>
      {message}
      <button onClick={onClose} style={{
        marginLeft: "15px",
        background: "none",
        color: "#fff",
        border: "none",
        fontSize: "18px",
        cursor: "pointer"
      }}>×</button>
    </div>
  );
};

export default Notification;

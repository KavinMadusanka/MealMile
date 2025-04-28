import React from "react";

const PaymentCancel = () => {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Red Circle with White Exclamation */}
        <div style={styles.iconWrapper}>
          <div style={styles.iconCircle}>
            <span style={styles.exclamationMark}>!</span>
          </div>
        </div>

        {/* Heading */}
        <h2 style={styles.heading}>Your payment failed</h2>
        <p style={styles.subtext}>Please try again</p>

        <hr style={styles.divider} />

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
    backgroundColor: '#f87171', // red-400
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
    fontSize: '48px',
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
  divider: {
    margin: '20px 0',
    border: 'none',
    height: '1px',
    backgroundColor: '#e5e7eb',
  },
  button: {
    backgroundColor: '#ef4444', // red-500
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

export default PaymentCancel;

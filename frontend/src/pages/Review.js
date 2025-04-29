import React, { useState } from 'react';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import Notification from '../components/Notification';
import Layout from '../components/Layout/Layout';

function Review() {
  const [restaurantId, setRestaurantId] = useState(mockRestaurants[0].id);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleReviewSubmitted = () => {
    setShowModal(false);
    setRestaurantId((prev) => prev + ' ');
    setTimeout(() => setRestaurantId((prev) => prev.trim()), 0);
  };

  return (
    <Layout>
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Notification Box */}
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })}
      />

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>🍽️ Restaurant Reviews</h2>

      {/* Flex container */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>
        <div>
          <label><strong>Select Restaurant:</strong></label>
          <select
            value={restaurantId.trim()}
            onChange={(e) => setRestaurantId(e.target.value)}
            style={{ marginLeft: "10px", padding: "8px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            {mockRestaurants.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => setShowModal(true)}
            style={{ padding: "10px 20px", background: "#7D0A0A", color: "#fff", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}
          >
            ✍️ Write a Review
          </button>
        </div>
      </div>

      <ReviewList restaurantId={restaurantId.trim()} showNotification={showNotification} />

      {/* Popup Modal */}
      {showModal && (
        <div style={{
          position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            background: "#fff", padding: "30px", borderRadius: "8px", width: "90%", maxWidth: "500px", position: "relative"
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute", top: "10px", right: "10px",
                border: "none", background: "none", fontSize: "24px", cursor: "pointer"
              }}
            >
              ×
            </button>
            <ReviewForm restaurantId={restaurantId.trim()} onReviewSubmitted={handleReviewSubmitted} showNotification={showNotification} />
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default Review;

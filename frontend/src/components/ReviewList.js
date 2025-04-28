import React, { useEffect, useState } from 'react';

const ReviewList = ({ restaurantId, showNotification }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!restaurantId) return;
    fetch(`http://localhost:8095/api/restaurants/${restaurantId}/reviews`)
      .then(res => res.json())
      .then(setData);
  }, [restaurantId]);

  if (!data) return null;

  const ratingCounts = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[star] = data.reviews.filter(r => r.rating === star).length;
    return acc;
  }, {});
  const total = data.totalReviews;

  const handleHelpfulClick = async (reviewId, isHelpful) => {
    try {
      if (isHelpful) {
        await fetch(`http://localhost:8095/api/reviews/${reviewId}/helpful`, { method: 'PATCH' });
        setData(prev => ({
          ...prev,
          reviews: prev.reviews.map(r => r._id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r)
        }));
        showNotification('Thanks for your feedback! 👍', 'success');
      } else {
        showNotification('Thanks for your feedback! 🤝', 'info');
      }
    } catch (error) {
      showNotification('Something went wrong! ❌', 'error');
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h4>⭐ Ratings Summary</h4>
      <p><strong>Average Rating:</strong> {data.averageRating || "N/A"} / 5 ({total} reviews)</p>

      <div style={{ marginBottom: "20px" }}>
        {[5, 4, 3, 2, 1].map(star => (
          <div key={star} style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
            <div style={{ width: "60px" }}>{star} ★</div>
            <div style={{
              height: "10px",
              background: "#ffc107",
              width: `${(ratingCounts[star] / total) * 100 || 0}%`,
              borderRadius: "5px",
              transition: "width 0.3s"
            }}></div>
            <div style={{ marginLeft: "10px", fontSize: "14px" }}>{ratingCounts[star]}</div>
          </div>
        ))}
      </div>
      <br/>
      <h4>📝 User Reviews</h4>

      {data.reviews.map((rev) => {
        const date = new Date(rev.createdAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        });

        return (
          <div
            key={rev._id}
            style={{
              background: "#fefefe",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
              <strong>{rev.customerName}</strong>
              <span style={{ color: "#888", fontSize: "14px" }}>{date}</span>
            </div>

            <div style={{ marginBottom: "5px" }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < rev.rating ? "#ffc107" : "#ccc", fontSize: "18px" }}>★</span>
              ))}
            </div>

            <div style={{ fontSize: "15px", lineHeight: "1.6", color: "#333" }}>
              <em>"{rev.comment}"</em>
            </div>

            {/* Helpful Section */}
            <div style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
              Was this review helpful?{" "}
              <button
                onClick={() => handleHelpfulClick(rev._id, true)}
                style={{ margin: "0 5px", padding: "5px 10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Yes
              </button>
              <button
                onClick={() => handleHelpfulClick(rev._id, false)}
                style={{ margin: "0 5px", padding: "5px 10px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                No
              </button>
              {" "}({rev.helpfulCount || 0} found helpful)
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;

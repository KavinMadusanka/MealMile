import React, { useEffect, useState } from 'react';

const ReviewList = ({ restaurantId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!restaurantId) return;
    fetch(`http://localhost:8086/api/restaurants/${restaurantId}/reviews`)
      .then(res => res.json())
      .then(setData);
  }, [restaurantId]);

  if (!data) return null;

  const ratingCounts = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[star] = data.reviews.filter(r => r.rating === star).length;
    return acc;
  }, {});
  const total = data.totalReviews;

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Ratings Summary</h3>
      <p><strong>Average Rating:</strong> {data.averageRating || "N/A"} / 5</p>

      {/* Breakdown */}
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

      <h3>User Reviews</h3>
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
      <div style={{ marginBottom: "8px" }}>
        <strong>{rev.customerName}</strong>
        <span style={{ float: "right", color: "#888", fontSize: "14px" }}>{date}</span>
      </div>

      <div style={{ marginBottom: "5px" }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rev.rating ? "#ffc107" : "#ccc", fontSize: "18px" }}>★</span>
        ))}
      </div>

      <div style={{ fontSize: "15px", lineHeight: "1.5", color: "#333" }}>
        <em>"{rev.comment}"</em>
      </div>
    </div>
  );
})}
</div>
  );
};

export default ReviewList;
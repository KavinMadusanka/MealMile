import React, { useState } from 'react';

const ReviewForm = ({ restaurantId, onReviewSubmitted, showNotification }) => {
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      showNotification("Please select a rating.", "error");
      return;
    }
    if (!customerName.trim() || !comment.trim()) {
      showNotification("Name and comment are required.", "error");
      return;
    }

    try {
      await fetch(`http://localhost:8095/api/restaurants/${restaurantId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: `cust_${Date.now()}`, // mock ID
          customerName,
          rating,
          comment
        })
      });

      showNotification('Review submitted successfully! ✅', 'success');
      setCustomerName('');
      setRating(0);
      setHover(0);
      setComment('');
      onReviewSubmitted();
    } catch (error) {
      showNotification('Failed to submit review ❌', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
      <h3>Submit Your Review</h3>

      <label>Name:</label><br />
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        style={{ width: "90%", padding: "8px", margin: "5px 0 10px", borderRadius: "5px", border: "1px solid #ccc" }}
      /><br />

      <label>Rating:</label><br />
      <div style={{ fontSize: "28px", margin: "5px 0" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ cursor: "pointer", color: (hover || rating) >= star ? "#ffc107" : "#ccc" }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
        <span style={{ marginLeft: "10px", fontSize: "16px" }}>{rating > 0 && `${rating} star${rating > 1 ? "s" : ""}`}</span>
      </div>

      <label>Comment:</label><br />
      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: "90%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      /><br />

      <button type="submit" style={{ marginTop: "10px", padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}>
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;

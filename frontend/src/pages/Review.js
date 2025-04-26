import React, { useState } from 'react';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const mockRestaurants = [
  { id: 'resto123', name: 'Pizza Place' },
  { id: 'resto456', name: 'Burger Queen' },
  { id: 'resto789', name: 'Noodle Nest' }
];

function Review() {
  const [restaurantId, setRestaurantId] = useState(mockRestaurants[0].id);

  const handleReviewSubmitted = () => {
    // Simply trigger rerender for ReviewList
    setRestaurantId((prev) => prev + ' ');
    setTimeout(() => setRestaurantId((prev) => prev.trim()), 0);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>🍽️ Restaurant Food Reviews</h2>

      <label><strong>Select Restaurant:</strong></label>
      <select
        value={restaurantId.trim()}
        onChange={(e) => setRestaurantId(e.target.value)}
        style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }}
      >
        {mockRestaurants.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      <ReviewForm restaurantId={restaurantId.trim()} onReviewSubmitted={handleReviewSubmitted} />
      <ReviewList restaurantId={restaurantId.trim()} />
    </div>
  );
}

export default Review;

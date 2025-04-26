import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { rating, comment, customerId, customerName } = req.body;
    const { id: restaurantId } = req.params;

    const review = new Review({ restaurantId, customerId, customerName, rating, comment });
    await review.save();

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRestaurantReviews = async (req, res) => {
  try {
    const { id: restaurantId } = req.params;
    const reviews = await Review.find({ restaurantId }).sort({ createdAt: -1 });

    const averageRating = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

    res.status(200).json({
      restaurantId,
      averageRating: averageRating || 'No ratings yet',
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

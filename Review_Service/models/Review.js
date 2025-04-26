import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true },
  customerId: { type: String, required: true },
  customerName: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);

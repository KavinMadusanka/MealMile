import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerId: { type: String, required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'Picked Up', 'On the Way', 'Delivered'],
    default: 'Pending'
  },
  currentLocation: {
    lat: Number,
    lng: Number
  },
  destination: {
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Delivery', DeliverySchema);

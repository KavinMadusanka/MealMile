import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  isAvailable: { type: Boolean, default: true },
  currentLocation: {
    lat: Number,
    lng: Number
  }
});

export default mongoose.model('Driver', DriverSchema);

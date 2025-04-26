import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  currentLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
});

export default mongoose.model('Driver', DriverSchema);

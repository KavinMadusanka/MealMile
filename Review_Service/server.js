import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config(); // ⬅️ Make sure this is at the top!

const app = express();
const PORT = process.env.PORT || 8095;
const MONGO_URI = process.env.MONGO_URL; // ⬅️ Use correct env variable

app.use(cors());
app.use(express.json());
app.use('/api', reviewRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Review Service running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
  });

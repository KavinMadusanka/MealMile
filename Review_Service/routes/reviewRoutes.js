import express from 'express';
import { createReview, getRestaurantReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/restaurants/:id/reviews', createReview);
router.get('/restaurants/:id/reviews', getRestaurantReviews);

export default router;

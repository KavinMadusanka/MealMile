import express from 'express';
import {
  createDriverController,
  getAllDriversController,
  updateAvailabilityController,
  updateDriverLocationController
} from '../Controllers/DriverController.js';

const router = express.Router();

// Create new driver
router.post('/create', createDriverController);

// Get all drivers
router.get('/', getAllDriversController);

// Update driver availability
router.put('/availability/:id', updateAvailabilityController);

// Update driver current location
router.put('/location/:id', updateDriverLocationController);

export default router;

import express from 'express';
import {
  createDriverController,
  getAllDriversController,
  updateAvailabilityController,
  updateDriverLocationController,
  respondToDeliveryRequestController,
  getAllDeliveryRequestsController
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

// Driver responds to a delivery request (accept or reject)
router.put('/respond-delivery/:id', respondToDeliveryRequestController);

// Get delivery requests assigned to a specific driver
router.get('/delivery-requests/:driverId', getAllDeliveryRequestsController);

export default router;

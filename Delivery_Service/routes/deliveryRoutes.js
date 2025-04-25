import express from 'express';
import {
  assignDriverController,
  getDeliveryStatusController,
  updateLocationController,
  updateStatusController
} from '../Controllers/deliveryController.js';

const router = express.Router();

router.post('/assign', assignDriverController);
router.get('/:id', getDeliveryStatusController);
router.put('/update-location/:id', updateLocationController);
router.put('/update-status/:id', updateStatusController);

export default router;

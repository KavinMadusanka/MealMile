import Delivery from "../models/Delivery.js";
import Driver from "../models/Driver.js";

// Helper to calculate distance between two coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius of Earth (km)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Assign driver to order
export const assignDriverController = async (req, res) => {
  try {
    const { orderId, customerId, destination, pickupLocation } = req.body;

    if (!orderId || !customerId || !destination || !pickupLocation) {
      return res.status(400).json({ success: false, message: "All fields are required (orderId, customerId, destination, pickupLocation)" });
    }

    const availableDrivers = await Driver.find({ isAvailable: true });

    console.log("Available drivers:", availableDrivers);

    if (!availableDrivers.length) {
      return res.status(404).json({ success: false, message: "No available drivers" });
    }

    let nearestDriver = null;
    let minDistance = Infinity;

    for (const driver of availableDrivers) {
      if (!driver.currentLocation || driver.currentLocation.lat === undefined || driver.currentLocation.lng === undefined) {
        continue;
      }

      const distance = calculateDistance(
        pickupLocation.lat,
        pickupLocation.lng,
        driver.currentLocation.lat,
        driver.currentLocation.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestDriver = driver;
      }
    }

    if (!nearestDriver) {
      return res.status(500).json({ success: false, message: "Could not find a driver with valid location data" });
    }

    const delivery = new Delivery({
      orderId,
      customerId,
      driverId: nearestDriver._id,
      status: 'Assigned',
      currentLocation: nearestDriver.currentLocation,
      destination
    });

    await delivery.save();

    nearestDriver.isAvailable = false;
    await nearestDriver.save();

    res.status(200).json({
      success: true,
      message: "Nearest driver assigned successfully",
      delivery,
      driver: {
        id: nearestDriver._id,
        name: nearestDriver.name,
        location: nearestDriver.currentLocation,
        distance: `${minDistance.toFixed(2)} km`
      }
    });

  } catch (error) {
    console.error("Assignment Error:", error);
    res.status(500).json({ success: false, message: "Error assigning driver", error: error.message });
  }
};

// Get delivery status
export const getDeliveryStatusController = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id).populate('driverId', 'name currentLocation');

    if (!delivery) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }

    res.status(200).json({
      success: true,
      message: "Delivery status retrieved",
      delivery
    });

  } catch (error) {
    console.error("Status Error:", error);
    res.status(500).json({ success: false, message: "Error fetching delivery status", error: error.message });
  }
};

// Update driver location
export const updateLocationController = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentLocation } = req.body;

    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }

    delivery.currentLocation = currentLocation;
    await delivery.save();

    res.status(200).json({
      success: true,
      message: "Location updated",
      delivery
    });

  } catch (error) {
    console.error("Location Update Error:", error);
    res.status(500).json({ success: false, message: "Error updating location", error: error.message });
  }
};

// Update delivery status
export const updateStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }

    delivery.status = status;

    if (status === "Delivered") {
      const driver = await Driver.findById(delivery.driverId);
      if (driver) {
        driver.isAvailable = true;
        await driver.save();
      }
    }

    await delivery.save();

    res.status(200).json({
      success: true,
      message: "Delivery status updated",
      delivery
    });

  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ success: false, message: "Error updating delivery status", error: error.message });
  }
};

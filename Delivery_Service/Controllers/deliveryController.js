import Delivery from "../models/Delivery.js";
import Driver from "../models/Driver.js";
import nodemailer from "nodemailer";

// Helper: Calculate distance between two coordinates
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

// Helper: Send email to driver
const sendAssignmentEmail = async (driverEmail, driverName, deliveryDetails) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "xenosysemail@gmail.com",
      pass: "doni gywl eitg bqmb",
    },
  });

  const mailOptions = {
    from: "xenosysemail@gmail.com",
    to: driverEmail,
    subject: "New Delivery Request - Awaiting Your Response",
    html: `
      <p>Dear ${driverName},</p>
      <p>You have a new delivery request.</p>
      <p><strong>Order ID:</strong> ${deliveryDetails.orderId}</p>
      <p><strong>Pickup:</strong> ${deliveryDetails.pickupLocation.lat}, ${deliveryDetails.pickupLocation.lng}</p>
      <p><strong>Destination:</strong> ${deliveryDetails.destination.lat}, ${deliveryDetails.destination.lng}</p>
      <p>Please respond via your dashboard to accept or reject this delivery.</p>
      <p>Thank you!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to driver:", driverEmail);
  } catch (err) {
    console.error("Error sending email to driver:", err);
  }
};

// Controller: Assign driver to delivery
export const assignDriverController = async (req, res) => {
  try {
    const { orderId, customerId, destination, pickupLocation } = req.body;

    if (!orderId || !customerId || !destination || !pickupLocation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (orderId, customerId, destination, pickupLocation)"
      });
    }

    const availableDrivers = await Driver.find({ isAvailable: true });

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
      return res.status(500).json({ success: false, message: "No drivers with valid location data" });
    }

    const delivery = new Delivery({
      orderId,
      customerId,
      driverId: nearestDriver._id,
      status: 'Pending',
      currentLocation: nearestDriver.currentLocation,
      destination
    });

    await delivery.save();

    // ✅ Send email to driver
    await sendAssignmentEmail(nearestDriver.email, nearestDriver.name, {
      orderId,
      pickupLocation,
      destination
    });

    res.status(200).json({
      success: true,
      message: "Delivery request sent to nearest driver. Awaiting acceptance.",
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

// Controller: Driver accepts/rejects delivery
export const driverResponseController = async (req, res) => {
  try {
    const { id } = req.params; // Delivery ID
    const { response } = req.body; // 'accept' or 'reject'

    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }

    if (response === 'accept') {
      delivery.status = 'Assigned';
      await delivery.save();

      const driver = await Driver.findById(delivery.driverId);
      if (driver) {
        driver.isAvailable = false;
        await driver.save();
      }

      return res.status(200).json({
        success: true,
        message: "Delivery accepted and assigned successfully",
        delivery
      });

    } else if (response === 'reject') {
      // Set previous driver back to available (optional)
      const previousDriver = await Driver.findById(delivery.driverId);
      if (previousDriver) {
        previousDriver.isAvailable = true;
        await previousDriver.save();
      }

      // ✅ Find next nearest driver
      const availableDrivers = await Driver.find({ isAvailable: true, _id: { $ne: delivery.driverId } });

      if (!availableDrivers.length) {
        delivery.driverId = null;
        delivery.status = 'Unassigned';
        await delivery.save();

        return res.status(200).json({
          success: true,
          message: "No other drivers available. Delivery is unassigned.",
          delivery
        });
      }

      let nearestDriver = null;
      let minDistance = Infinity;

      for (const driver of availableDrivers) {
        if (!driver.currentLocation || driver.currentLocation.lat === undefined || driver.currentLocation.lng === undefined) {
          continue;
        }

        const distance = calculateDistance(
          delivery.currentLocation.lat,
          delivery.currentLocation.lng,
          driver.currentLocation.lat,
          driver.currentLocation.lng
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestDriver = driver;
        }
      }

      if (!nearestDriver) {
        delivery.driverId = null;
        delivery.status = 'Unassigned';
        await delivery.save();

        return res.status(500).json({
          success: false,
          message: "No drivers with valid location to reassign.",
          delivery
        });
      }

      // Assign to next nearest driver
      delivery.driverId = nearestDriver._id;
      delivery.status = 'Pending';
      await delivery.save();

      await sendAssignmentEmail(nearestDriver.email, nearestDriver.name, {
        orderId: delivery.orderId,
        pickupLocation: delivery.currentLocation,
        destination: delivery.destination
      });

      return res.status(200).json({
        success: true,
        message: "Previous driver rejected. Delivery sent to next nearest driver.",
        delivery,
        driver: {
          id: nearestDriver._id,
          name: nearestDriver.name,
          location: nearestDriver.currentLocation,
          distance: `${minDistance.toFixed(2)} km`
        }
      });
    }

    return res.status(400).json({ success: false, message: "Invalid response" });

  } catch (error) {
    console.error("Driver Response Error:", error);
    res.status(500).json({ success: false, message: "Error processing driver response", error: error.message });
  }
};

// Controller: Get delivery status
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

// Controller: Update driver location
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

// Controller: Update delivery status
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

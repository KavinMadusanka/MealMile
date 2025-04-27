import Driver from "../models/Driver.js";
import Delivery from "../models/Delivery.js";

// Create a new driver
export const createDriverController = async (req, res) => {
  try {
    const { name, phone, email, currentLocation } = req.body;

    if (!name || !phone || !email || !currentLocation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDriver = new Driver({ name, phone, email, currentLocation });
    await newDriver.save();

    res.status(201).json({
      success: true,
      message: "Driver created successfully",
      driver: newDriver,
    });
  } catch (error) {
    console.error("Create Driver Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating driver",
      error: error.message,
    });
  }
};

// Get all drivers
export const getAllDriversController = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json({
      success: true,
      message: "All drivers retrieved successfully",
      drivers,
    });
  } catch (error) {
    console.error("Get All Drivers Error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving drivers",
      error: error.message,
    });
  }
};

// Update driver availability
export const updateAvailabilityController = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    driver.isAvailable = isAvailable;
    await driver.save();

    res.status(200).json({
      success: true,
      message: "Driver availability updated",
      driver,
    });
  } catch (error) {
    console.error("Update Availability Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating driver availability",
      error: error.message,
    });
  }
};

// Update driver location
export const updateDriverLocationController = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentLocation } = req.body;

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    driver.currentLocation = currentLocation;
    await driver.save();

    res.status(200).json({
      success: true,
      message: "Driver location updated",
      driver,
    });
  } catch (error) {
    console.error("Update Location Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating driver location",
      error: error.message,
    });
  }
};

// Driver responds to delivery request
export const respondToDeliveryRequestController = async (req, res) => {
  try {
    const { id } = req.params; // Delivery ID
    const { response } = req.body; // 'accepted' or 'rejected'

    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery request not found" });
    }

    delivery.status = response;
    await delivery.save();

    res.status(200).json({
      success: true,
      message: `Delivery request ${response}`,
      delivery,
    });
  } catch (error) {
    console.error("Respond to Delivery Request Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating delivery response",
      error: error.message,
    });
  }
};

// Get delivery requests for a specific driver
export const getAllDeliveryRequestsController = async (req, res) => {
  try {
    const { driverId } = req.params;

    const deliveries = await Delivery.find({ driverId })
      .select("orderId customerId currentLocation destination status createdAt");

    res.status(200).json({
      success: true,
      message: "Driver's delivery requests fetched successfully",
      deliveries,
    });
  } catch (error) {
    console.error("Get Driver Delivery Requests Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching delivery requests",
      error: error.message,
    });
  }
};

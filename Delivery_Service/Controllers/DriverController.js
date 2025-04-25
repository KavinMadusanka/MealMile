import Driver from "../models/Driver.js";

// Create a new driver
export const createDriverController = async (req, res) => {
  try {
    const { name, phone, currentLocation } = req.body;

    if (!name || !phone || !currentLocation) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newDriver = new Driver({
      name,
      phone,
      currentLocation
    });

    await newDriver.save();

    res.status(201).send({
      success: true,
      message: "Driver created successfully",
      driver: newDriver
    });
  } catch (error) {
    console.error("Create Driver Error:", error);
    res.status(500).send({
      success: false,
      message: "Error creating driver",
      error
    });
  }
};

// Get all drivers
export const getAllDriversController = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).send({
      success: true,
      message: "All drivers retrieved",
      drivers
    });
  } catch (error) {
    console.error("Get All Drivers Error:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving drivers",
      error
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
      return res.status(404).send({ message: "Driver not found" });
    }

    driver.isAvailable = isAvailable;
    await driver.save();

    res.status(200).send({
      success: true,
      message: "Driver availability updated",
      driver
    });
  } catch (error) {
    console.error("Update Availability Error:", error);
    res.status(500).send({
      success: false,
      message: "Error updating driver availability",
      error
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
      return res.status(404).send({ message: "Driver not found" });
    }

    driver.currentLocation = currentLocation;
    await driver.save();

    res.status(200).send({
      success: true,
      message: "Driver location updated",
      driver
    });
  } catch (error) {
    console.error("Update Location Error:", error);
    res.status(500).send({
      success: false,
      message: "Error updating driver location",
      error
    });
  }
};

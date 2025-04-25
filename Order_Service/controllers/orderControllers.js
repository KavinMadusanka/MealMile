const asyncHandler = require("express-async-handler");

// @desc View all orders
// @route GET /api/orders
const getOrders = asyncHandler(async(req,res) => {
    res.status(200).json({message: "Get all orders"});
});

// @desc Place a new order
// @route POST /api/orders
const createOrder = asyncHandler(async(req,res) => {
    res.status(201).json({message: "Create order"});
});

// @desc View an order
// @route GET /api/orders/:id
const getOrder = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Get order for ${req.params.id}`});
});

// @desc Update an order
// @route PUT /api/orders/:id
const updateOrder = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Update order for ${req.params.id}`});
});

// @desc Cancel an order
// @route DELETE /api/orders/:id
const cancelOrder = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Cancel order for ${req.params.id}`});
});

// @desc Track status update
// @route GET /api/orders/:id/status
const trackStatus = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Track status for ${req.params.id}`});
});

// @desc Update order status
// @route PATCH /api/order/:id/status
const updateStatus = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Update status for ${req.params.id}`});
});

module.exports = {
    getOrders,
    createOrder,
    getOrder,
    updateOrder,
    cancelOrder,
    trackStatus,
    updateStatus
}
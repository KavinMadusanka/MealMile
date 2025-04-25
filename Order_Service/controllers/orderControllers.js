// @desc View all orders
// @route GET /api/orders
const getOrders = (req,res) => {
    res.status(200).json({message: "Get all orders"});
};

// @desc Place a new order
// @route POST /api/orders
const createOrder = (req,res) => {
    res.status(201).json({message: "Create order"});
};

// @desc View an order
// @route GET /api/orders/:id
const getOrder = (req,res) => {
    res.status(200).json({message: `Get order for ${req.params.id}`});
};

// @desc Update an order
// @route PUT /api/orders/:id
const updateOrder = (req,res) => {
    res.status(200).json({message: `Update order for ${req.params.id}`});
};

// @desc Cancel an order
// @route DELETE /api/orders/:id
const cancelOrder = (req,res) => {
    res.status(200).json({message: `Cancel order for ${req.params.id}`});
};

// @desc Track status update
// @route GET /api/orders/:id/status
const trackStatus = (req,res) => {
    res.status(200).json({message: `Track status for ${req.params.id}`});
};

// @desc Update order status
// @route PATCH /api/order/:id/status
const updateStatus = (req,res) => {
    res.status(200).json({message: `Update status for ${req.params.id}`});
};

module.exports = {
    getOrders,
    createOrder,
    getOrder,
    updateOrder,
    cancelOrder,
    trackStatus,
    updateStatus
}
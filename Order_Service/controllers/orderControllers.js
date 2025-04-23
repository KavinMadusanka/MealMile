//@desc Get all orders
//@route GET /api/orders
const getOrders = (req,res) => {
    res.status(200).json({message: "Get all orders"});
};

//@desc Create new order
//@route POST /api/orders
const createOrder = (req,res) => {
    res.status(201).json({message: "Create order"});
};

//@desc Get order
//@route GET /api/orders/:id
const getOrder = (req,res) => {
    res.status(200).json({message: `Get order for ${req.params.id}`});
};

//@desc Update order
//@route PUT /api/orders/:id
const updateOrder = (req,res) => {
    res.status(200).json({message: `Update order for ${req.params.id}`});
};

//@desc Delete order
//@route DELETE /api/orders/:id
const deleteOrder = (req,res) => {
    res.status(200).json({message: `Delete order for ${req.params.id}`});
};

module.exports = {
    getOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
};
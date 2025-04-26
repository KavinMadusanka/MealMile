const asyncHandler = require("express-async-handler");

// @desc Add item to cart
// @route POST /api/cart
const addItem = asyncHandler(async(req,res) => {
    res.status(200).json({message: "Add item"});
});

// @desc View all carts
// @route GET /api/cart/:cid
const getCarts = asyncHandler(async(req,res) => {
    res.status(200).json({message: "Get all carts"});
});

// @desc View cart by restaurant
// @route GET /api/cart/:cid/:rid
const getCart = asyncHandler(async(req,res) => {
    res.status(200).json({message: "Add item"});
});

// @desc Remove item from cart
// @route DELETE /api/cart/:cid/:rid/items/:iid

// @desc Clear a restaurant's cart
// @route DELETE /api/cart/:cid/:rid
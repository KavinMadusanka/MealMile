const express = require("express");
const {getOrders, createOrder, getOrder, updateOrder, cancelOrder, trackStatus, updateStatus} = require("../controllers/orderControllers");
const router = express.Router();

router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrder).put(updateOrder).delete(cancelOrder);
router.route("/:id/status").get(trackStatus).patch(updateStatus);

module.exports = router;
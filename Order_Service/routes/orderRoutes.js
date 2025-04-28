const express = require("express");
const {getOrders, createOrder, getOrder, updateOrder, deleteOrder, trackStatus, updateStatus} = require("../controllers/orderControllers");
const router = express.Router();

router.route("/:cid").get(getOrders)
router.route("/:cartId").post(createOrder);
router.route("/order/:oid").get(getOrder).put(updateOrder).delete(deleteOrder);
router.route("/order/:oid/status").get(trackStatus).patch(updateStatus);

module.exports = router;
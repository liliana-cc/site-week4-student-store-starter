const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-itemController')

router.get("/", controller.getAllOrderItems);
router.get("/:id", controller.getOrderItemById);
router.post("/:orderId", controller.createOrderItem);

module.exports = router;
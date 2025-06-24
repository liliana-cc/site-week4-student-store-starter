const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController')

router.get("/", controller.getAllOrders);
router.get("/:id", controller.getOrderById);
router.get("/:order_id/total", controller.getTotal);  // calc & return total price of an order
router.post("/", controller.createOrder);
router.post("/:order_id/items", controller.addOrderItems);  // add items to an existing order
router.put("/:id", controller.updateOrder);
router.delete("/:id", controller.removeOrder);

module.exports = router;
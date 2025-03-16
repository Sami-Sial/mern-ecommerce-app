const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order.controllers");
const authMiddlewares = require("../middlewares/auth");


router.post("/order/new", authMiddlewares.isAuthenticatedUser, orderControllers.newOrder);

router.get("/order/:id", authMiddlewares.isAuthenticatedUser, orderControllers.getSingleOrder);

router.get("/orders/me", authMiddlewares.isAuthenticatedUser, orderControllers.myOrders);

router.get("/admin/orders", authMiddlewares.isAuthenticatedUser, authMiddlewares.isAdmin, orderControllers.getAllOrders);

router.put("/admin/order/:id", authMiddlewares.isAuthenticatedUser, authMiddlewares.isAdmin, orderControllers.updateOrder);

router.delete("/admin/order/:id", authMiddlewares.isAuthenticatedUser, authMiddlewares.isAdmin, orderControllers.deleteOrder);


module.exports = router;
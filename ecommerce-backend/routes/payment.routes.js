const express = require("express");
const paymentControllers = require("../controllers/payment.controllers");
const router = express.Router();
const authMiddlewares = require("../middlewares/auth");


router.post("/process/payment", authMiddlewares.isAuthenticatedUser, paymentControllers.processPayment);


module.exports = router;

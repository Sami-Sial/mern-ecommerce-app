const Product = require("../models/product.model");
const Order = require("../models/order.model");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrorHandler = require("../utils/AsyncErrorHandler");

// Create new Order
module.exports.newOrder = AsyncErrorHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  let order = new Order({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  order = await order.save();

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
module.exports.getSingleOrder = AsyncErrorHandler(async (req, res, next) => {
  console.log(req.params);
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler(404, "Order not found with this Id"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
module.exports.myOrders = AsyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
module.exports.getAllOrders = AsyncErrorHandler(async (req, res, next) => {
  const { currentPage } = req.query;

  if (currentPage == "undefined") {
    let orders = await Order.find();
    res.status(200).json({ success: true, orders });
    return;
  }

  const resultPerPage = 7;
  const skip = resultPerPage * (currentPage - 1);

  const totalOrders = await Order.countDocuments();
  const totalOrdersPages = Math.ceil(totalOrders / resultPerPage);
  console.log(currentPage);
  console.log(skip);

  let orders = await Order.find().skip(skip).limit(resultPerPage);

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
    totalOrdersPages,
  });
});

// Get all Orders => Admin
module.exports.getAllOrders = AsyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status => Admin
module.exports.updateOrder = AsyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (!order) {
    return next(new ErrorHandler(404, "Order not found with this Id"));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(400, "You have already delivered this order"));
  }

  order.orderItems.forEach(async (o) => {
    const product = await Product.findById(o.product);

    let remainingStcok = (product.stock -= o.quantity);

    if (remainingStcok <= 0) {
      product.stock = 0;
    }
    await product.save({ validateBeforeSave: false });
  });

  order.deliveredAt = Date.now();

  order.orderStatus = "Delivered";

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Delete Order -- Admin
module.exports.deleteOrder = AsyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found with this Id"));
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
  });
});

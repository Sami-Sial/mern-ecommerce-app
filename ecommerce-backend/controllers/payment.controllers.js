const Order = require("../models/order.model");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

module.exports.processPayment = async (req, res) => {
  try {
    const { cartItems, userId, shippingInfo, prices } = req.body;

    // 1️⃣ Save order as PENDING
    const order = await Order.create({
      user: userId,
      shippingInfo,
      orderItems: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images[0]?.url,
        product: item._id,
      })),
      itemsPrice: prices.itemsPrice,
      taxPrice: prices.taxPrice,
      shippingPrice: prices.shippingPrice,
      totalPrice: prices.totalPrice,
      paymentInfo: { status: "pending" },
    });

    // 2️⃣ Stripe line items
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // 3️⃣ Create Stripe session (ONLY IDs in metadata)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/user/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/user/payment/failure`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Stripe session failed" });
  }
};

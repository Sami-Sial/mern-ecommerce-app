// controllers/payment.controller.js
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

module.exports.processPayment = async (req, res) => {
  const { cartItems, userId, shippingInfo, prices } = req.body;

  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",

    success_url: `${process.env.FRONTEND_URL}/user/payment/success`,
    cancel_url: `${process.env.FRONTEND_URL}/user/payment/failure`,

    metadata: {
      userId,
      shippingInfo: JSON.stringify(shippingInfo),
      prices: JSON.stringify(prices),
      cartItems: JSON.stringify(cartItems),
    },
  });

  res.status(200).json({ id: session.id });
};



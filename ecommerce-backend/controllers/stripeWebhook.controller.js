const Order = require("../models/order.model");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

module.exports = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Payment confirmed by Stripe
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderId = session.metadata.orderId;

    await Order.findByIdAndUpdate(orderId, {
      paymentInfo: {
        id: session.payment_intent,
        status: "paid",
      },
      paidAt: Date.now(),
    });
  }

  res.json({ received: true });
};

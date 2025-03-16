const AsyncErrorHandler = require("../utils/AsyncErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

module.exports.processPayment = AsyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const lineItems = req.body.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/user/payment/success",
    cancel_url: "http://localhost:5173/user/payment/failure",
  });

  res.json({ id: session.id });
});

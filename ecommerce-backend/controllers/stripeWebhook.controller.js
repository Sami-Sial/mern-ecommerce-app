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

    // ✅ PAYMENT CONFIRMED
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const cartItems = JSON.parse(session.metadata.cartItems);
        const shippingInfo = JSON.parse(session.metadata.shippingInfo);
        const prices = JSON.parse(session.metadata.prices);

        const orderItems = cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.images[0],
            product: item._id,
        }));

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo: {
                id: session.payment_intent,
                status: "paid",
            },
            itemsPrice: prices.itemsPrice,
            taxPrice: prices.taxPrice,
            shippingPrice: prices.shippingPrice,
            totalPrice: prices.totalPrice,
            paidAt: Date.now(),
            user: session.metadata.userId,
        });
    }

    res.json({ received: true });
};
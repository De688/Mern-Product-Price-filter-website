// Import the Stripe package
const router = require("express").Router();

const stripe = require("stripe")(
  "sk_test_51MUwWZJsGp6qggbT4HLIVulFrugnvmVtNHX1CghooqIBtlkK6FGlV1GJmJyPynoPFK0YJANTiJTKyCrFRnDcmw5e008CNRbIub"
);

// Create a new route for the checkout process
router.post("/checkout", async (req, res) => {
  const { price } = req.body;
  try {
    // Create a new Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Example Product",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    // Send the session ID to the frontend
    res.json({ sessionId: session.id });
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;

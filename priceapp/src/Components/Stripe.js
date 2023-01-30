import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Stripe({ price }) {
  const [stripe, setStripe] = useState(null);

  const handleClick = async () => {
    // Load Stripe.js and create a new instance
    const stripe = await loadStripe(
      "pk_test_51MUwWZJsGp6qggbTczSwsCYTYA0S1uAuhlCWP6g7YDSaECVGC4AOIu7Rpmj795IqF1Ow0Gjb83yWrAmhCHRJF6Ol005Dt3oreI"
    );
    setStripe(stripe);

    // Fetch the session ID from the server
    const response = await axios.post("http://localhost:5000/api/checkout", {
      price: price,
    });
    const data = await response.data;
    console.log(data);
    // Open the Checkout form with the session ID
    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    // Handle any errors from Checkout
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <button
      className="w-[200px] h-10 text-white shadow-xl hover:bg-purple-700 bg-purple-900"
      onClick={handleClick}
    >
      Buy Now
    </button>
  );
}

export default Stripe;

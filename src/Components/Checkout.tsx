import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = ({ cartId }: { cartId: string }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">💳 Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm cartId={cartId} />
      </Elements>
    </div>
  );
};

export default Checkout;

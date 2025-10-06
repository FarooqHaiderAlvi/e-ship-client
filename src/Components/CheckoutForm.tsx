import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cartId }: { cartId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axiosInstance.post(
          "http://localhost:8000/api/v1/payments/make-payment",
          { cartId }
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };
    createPaymentIntent();
  }, [cartId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setPaymentStatus("Processing...");

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      setPaymentStatus(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentStatus("✅ Payment Successful!");
      setTimeout(() => navigate("/payment-success"), 2000);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement
        options={{
          style: {
            base: {
              color: "#fff",
              fontSize: "16px",
              "::placeholder": { color: "#888" },
            },
            invalid: { color: "#ff4d4f" },
          },
        }}
        className="p-3 bg-gray-800 rounded-lg"
      />

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {paymentStatus && (
        <div className="text-center mt-4 text-gray-300">{paymentStatus}</div>
      )}
    </form>
  );
};

export default CheckoutForm;

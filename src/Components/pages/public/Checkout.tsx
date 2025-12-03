import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import axiosInstance from "../../../api/axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutProps {
  cartId?: string;
}

const Checkout: React.FC<CheckoutProps> = ({ cartId: propCartId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartId, setCartId] = useState<string | null>(
    propCartId || (location.state as { cartId?: string })?.cartId || null
  );
  const [loading, setLoading] = useState(!cartId);

  // If no cartId provided, try to fetch user's cart
  useEffect(() => {
    if (!cartId) {
      const fetchCart = async () => {
        try {
          const response = await axiosInstance.get(
            "http://localhost:8000/api/v1/cart/get-user-cart"
          );
          if (response.data.data && response.data.data[0]) {
            setCartId(response.data.data[0]._id);
          } else {
            navigate("/cart");
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          navigate("/cart");
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [cartId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading checkout...</div>
      </div>
    );
  }

  if (!cartId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>
          <h2 className="text-2xl mb-4">No items in cart</h2>
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">💳 Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm cartId={cartId} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;

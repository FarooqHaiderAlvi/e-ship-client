import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import Checkout from "./Checkout";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Cart {
  _id: string;
  userId: string;
  status: string;
  cartItems: CartItem[];
}

const CartDetails: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8000/api/v1/cart/get-user-cart"
        );
        console.log("Cart data:", response.data.data);
        setCart(response.data.data[0]);
      } catch (error: any) {
        console.error(
          "Error fetching cart:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="text-white text-center mt-10">Loading your cart...</div>
    );

  if (!cart || cart.cartItems.length === 0)
    return (
      <div className="text-white text-center mt-10">Your cart is empty.</div>
    );

  const totalAmount = cart.cartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">🛒 Your Cart</h2>

      <div className="space-y-6 max-w-2xl mx-auto">
        {cart.cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-gray-900 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium">
                Product ID: {item.productId}
              </p>
              <p className="text-gray-400">Quantity: {item.quantity}</p>
              <p className="text-gray-400">Unit Price: ${item.unitPrice}</p>
              <p className="text-gray-200 font-semibold">
                Total: ${item.totalPrice}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xl font-bold mb-4">Grand Total: ${totalAmount}</p>

        {!showCheckout ? (
          <button
            onClick={() => setShowCheckout(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium"
          >
            Proceed to Checkout 💳
          </button>
        ) : (
          <Checkout cartId={cart._id} />
        )}
      </div>
    </div>
  );
};

export default CartDetails;

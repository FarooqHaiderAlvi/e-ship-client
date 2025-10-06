import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state as { product: Product };

  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = async () => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8000/api/v1/cart/add-to-cart",
        {
          productId: product._id, // send product ID
          quantity: 1, // default 1 for now
        }
      );

      console.log("Add to cart response:", response.data);
      setCart((prev) => [...prev, product]);
      alert("Added to cart!");
    } catch (error: any) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      alert("Failed to add to cart!");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="max-w-md w-full border rounded-2xl shadow-lg overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="mt-3 font-bold text-lg">${product.price}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>

          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
          >
            Add to Cart
          </button>

          <Link
            to="/cart"
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

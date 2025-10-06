import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await axiosInstance.get(
      "http://localhost:8000/api/v1/products/get-products"
    );
    setProducts(response.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center p-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-2xl shadow-md w-64 overflow-hidden"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
            <button
              onClick={() =>
                navigate("/product-details", { state: { product } })
              }
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

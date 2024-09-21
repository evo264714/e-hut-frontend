import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/my-products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchMyProducts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-4">{product.name}</h3>
              <p className="text-gray-700 mt-2">{product.description}</p>
              <p className="text-green-500 font-bold mt-2">${product.price}</p>
              <p className="text-sm mt-1 text-gray-600">{product.category}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products added yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;

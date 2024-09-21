import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Vegetables',
    image: '', // Set image as an empty string to store the image URL
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire('Error', 'You must be logged in to add a product', 'error');
        navigate('/login');
        return;
      }
  
      await axios.post(
        'http://localhost:5000/api/products/add',
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire('Success', 'Product added successfully', 'success');
      navigate('/my-products');
    } catch (error) {
      Swal.fire('Error', 'Failed to add product', 'error');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Price (in USD)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          >
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Product Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="Enter image URL"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

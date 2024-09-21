import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FiLogOut, FiLogIn, FiPlus, FiShoppingCart } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire('Logged Out', 'You have successfully logged out', 'success');
      navigate('/');
    } catch (err) {
      Swal.fire('Error', 'Failed to log out', 'error');
    }
  };

  const handleAddProductClick = () => {
    if (!currentUser) {
      Swal.fire('Login Required', 'You must log in to add a product', 'warning');
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
      <Link to="/" className="text-4xl font-bold text-gray-800">
        E-Hut
      </Link>

      <div className="flex space-x-4">
        {currentUser && (
          <Link
            to="/my-products"
            className="bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 shadow-md flex items-center"
          >
            <FiShoppingCart className="mr-2" /> My Products
          </Link>
        )}

        <Link
          to={currentUser ? '/add-product' : '#'}
          className="bg-green-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 shadow-md flex items-center"
          onClick={handleAddProductClick}
        >
          <FiPlus className="mr-2" /> Add Product
        </Link>

        {currentUser ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 shadow-md flex items-center"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 shadow-md flex items-center"
            >
              <FiLogIn className="mr-2" /> Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 shadow-md"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

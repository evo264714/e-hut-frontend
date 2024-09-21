import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import MyProducts from "./components/MyProducts";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/add-product"
            element={
              <PrivateRoute>
                <AddProduct addProduct={addProduct} />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-products"
            element={
              <PrivateRoute>
                <MyProducts products={products} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

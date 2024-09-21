import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios'; // For sending requests to your backend

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Firebase authentication
      const user = userCredential.user;
      setCurrentUser(user);
  
      // Send user data to the backend for authentication and role management
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: user.email,
        password: password,
      });
  
      // Store the JWT token from the backend in localStorage (or sessionStorage)
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token for future authenticated requests
  
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setCurrentUser(user);
  
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: name,
        email: user.email,
        password: password,
      });
  
      const { token } = response.data;
      localStorage.setItem('token', token);
  
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  const logout = () => {
    return signOut(auth).then(() => setCurrentUser(null));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup, 
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

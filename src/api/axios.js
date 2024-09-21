import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for all requests (adjust for production)
  headers: {
    'Content-Type': 'application/json', // Default headers
  },
});

// Optional: Add a request interceptor to include an authorization token (if you want to send the token in headers)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to headers if it exists
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;

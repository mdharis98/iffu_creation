import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://iffu-creation-server.onrender.com';
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Products API
export const getProducts = () => api.get('/api/products');
export const getProduct = (id) => api.get(`/api/products/${id}`);
export const likeProduct = (id, userId) => api.post(`/api/products/${id}/like`, { userId });
export const createProduct = (formData, config) => api.post('/api/products', formData, config);
export const updateProduct = (id, formData, config) => api.put(`/api/products/${id}`, formData, config);
export const deleteProduct = (id, config) => api.delete(`/api/products/${id}`, config);

// Orders API
export const createOrder = (orderData) => api.post('/api/orders', orderData);
export const getOrders = (config) => api.get('/api/orders', config);
export const updateOrderStatus = (id, status, config) => api.patch(`/api/orders/${id}/status`, { status }, config);

// Feedback API
export const getFeedbackForProduct = (productId) => api.get(`/api/feedback/product/${productId}`);
export const createFeedback = (feedbackData) => api.post('/api/feedback', feedbackData);
export const getAllFeedback = (config) => api.get('/api/feedback/all', config);

export default api;


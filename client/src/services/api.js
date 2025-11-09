import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://iffu-creation-server.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Products API
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const likeProduct = (id, userId) => api.post(`/products/${id}/like`, { userId });
export const createProduct = (formData, config) => api.post('/products', formData, config);
export const updateProduct = (id, formData, config) => api.put(`/products/${id}`, formData, config);
export const deleteProduct = (id, config) => api.delete(`/products/${id}`, config);

// Orders API
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrders = (config) => api.get('/orders', config);
export const updateOrderStatus = (id, status, config) => api.patch(`/orders/${id}/status`, { status }, config);

// Feedback API
export const getFeedbackForProduct = (productId) => api.get(`/feedback/product/${productId}`);
export const createFeedback = (feedbackData) => api.post('/feedback', feedbackData);
export const getAllFeedback = (config) => api.get('/feedback/all', config);

export default api;


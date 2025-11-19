import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProducts, deleteProduct, getOrders, getAllFeedback, updateOrderStatus } from '../services/api';
import ProductForm from '../components/ProductForm';
import { FaPlus, FaSignOutAlt, FaShoppingBag, FaEdit, FaTrash, FaBox, FaComments } from 'react-icons/fa';

const AdminDashboard = () => {
  const { isAuthenticated, logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = getAuthHeaders();
      const [productsRes, ordersRes, feedbacksRes] = await Promise.all([
        getProducts(),
        getOrders(headers),
        getAllFeedback(headers)
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setFeedbacks(feedbacksRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(id, getAuthHeaders());
      fetchData();
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const markOrderDelivered = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'delivered', getAuthHeaders());
      fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order');
    }
  };

  const handleProductFormClose = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800"><img src="/logo.png" alt="iffu_creation" className="h-10 w-auto" /></span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-6 py-4 text-center font-semibold ${
                activeTab === 'products'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaBox className="inline mr-2" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 text-center font-semibold ${
                activeTab === 'orders'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaShoppingBag className="inline mr-2" />
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('feedbacks')}
              className={`flex-1 px-6 py-4 text-center font-semibold ${
                activeTab === 'feedbacks'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaComments className="inline mr-2" />
              Feedbacks ({feedbacks.length})
            </button>
          </div>
        </div>

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Products Management</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="flex items-center space-x-2 px-6 py-2 bg-[#60A5FA] text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-blue-600 font-bold text-lg mb-2">Rs.{product.price}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition flex items-center justify-center space-x-1"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center justify-center space-x-1"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 text-sm">{order._id.slice(-8)}</td>
                      <td className="px-6 py-4 text-sm font-medium">{order.customerName}</td>
                      <td className="px-6 py-4 text-sm">{order.productId?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">{order.phoneNumber}</td>
                      <td className="px-6 py-4 text-sm">{order.address}, {order.location}</td>
                      <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {order.status !== 'delivered' ? (
                          <button
                            onClick={() => markOrderDelivered(order._id)}
                            className="px-3 py-1 bg-[#60A5FA] text-white rounded-lg hover:bg-blue-600"
                          >
                            Mark as Done
                          </button>
                        ) : (
                          <span className="text-green-600 font-medium">Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="text-center py-8 text-gray-500">No orders yet</div>
              )}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-600">#{order._id.slice(-8)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-1 font-bold text-gray-800">{order.customerName}</p>
                  <p className="text-gray-600 text-sm">{order.productId?.name || 'N/A'}</p>

                  <div className="mt-2 text-sm">
                    <p><strong>Phone:</strong> {order.phoneNumber}</p>
                    <p><strong>Address:</strong> {order.address}, {order.location}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  {order.status !== 'delivered' ? (
                    <button
                      onClick={() => markOrderDelivered(order._id)}
                      className="w-full mt-3 py-2 bg-[#60A5FA] text-white rounded-lg hover:bg-blue-700"
                    >
                      Mark as Done
                    </button>
                  ) : (
                    <p className="text-green-600 font-medium mt-3 text-center">Completed</p>
                  )}
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-8 text-gray-500">No orders yet</div>
              )}
            </div>
          </div>
        )}


        {activeTab === 'feedbacks' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Feedbacks</h2>
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback._id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{feedback.customerName}</h4>
                      <p className="text-sm text-gray-600">{feedback.productId?.name || 'Unknown Product'}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{feedback.text}</p>
                </div>
              ))}
              {feedbacks.length === 0 && (
                <div className="text-center py-8 text-gray-500">No feedbacks yet</div>
              )}
            </div>
          </div>
        )}
      </div>

      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleProductFormClose}
          onSuccess={handleProductFormClose}
          getAuthHeaders={getAuthHeaders}
        />
      )}
    </div>
  );
};

export default AdminDashboard;


import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const OrderForm = ({ product, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    address: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <button
        onClick={onCancel}
        className="flex items-center space-x-2 text-textSecondary hover:text-textPrimary mb-4"
      >
        <FaArrowLeft />
        <span>Back to Product</span>
      </button>

      <div className="mb-6 p-4 bg-card text-textPrimary rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-2">Ordering: {product.name}</h3>
        <p className="text-2xl font-bold text-primary">Rs.{product.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your complete address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your city/location"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-2 border border-gray-300 text-textSecondary rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 text-white rounded-xl shadow-md hover:shadow-lg bg-button hover:bg-buttonHover transition disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;


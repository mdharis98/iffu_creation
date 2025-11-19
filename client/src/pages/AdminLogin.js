import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLock } from 'react-icons/fa';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(username, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Watermark inside card */}
        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0">
          <span className="text-black/5 text-6xl font-bold tracking-widest uppercase ml-20">Admin Login</span>
        </div>

        <div className="relative z-10 text-center mb-8">
          {/* <div className="flex justify-center mb-4">
            <FaShoppingBag className="text-blue-600 text-5xl" />
          </div> */}
          {/* <h1 className="text-3xl font-bold text-gray-800 mb-2">QuickMart</h1> */}
          {/* <img src="/logo.png" alt="iffu_creation" className="h-10 w-auto text-3xl font-bold text-gray-800 mb-2" /> */}
          <img src="/logo.png" alt="iffu_creation" className="h-15 w-auto text-3xl font-bold text-gray-800 mb-2 mx-auto"/>

          <p className="text-gray-800">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#60A5FA] text-white py-3 rounded-lg hover:bg-[#3B82F6]/90 transition flex items-center justify-center space-x-2"
          >
            <FaLock />
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


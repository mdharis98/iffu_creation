import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { FaPen, FaShoppingBag, FaUser } from 'react-icons/fa';


const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-background text-textPrimary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            {/* <FaPen className="text-red-600 text-2xl" /> */}
            <img src="/logo.png" alt="iffu_creation" className="h-10 w-auto" />
          </Link>
          
          {/* <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-xl shadow-md hover:shadow-lg bg-button hover:bg-buttonHover transition"
              >
                <FaUser />
                <span>Admin Dashboard</span>
              </Link>
            ) : null}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


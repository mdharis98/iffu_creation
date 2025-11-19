// import React, { createContext, useState, useContext } from 'react';
// // import axios from 'axios';
// import api from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('adminToken'));
//   const [loading, setLoading] = useState(false);

//   const login = async (username, password) => {
//     try {
//       setLoading(true);
//       const response = await axios.post('/api/auth/login', { username, password });
//       const { token } = response.data;
//       setToken(token);
//       localStorage.setItem('adminToken', token);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Login failed'
//       };
//     } finally {
//       setLoading(false);
//     }
//   };


//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem('adminToken');
//   };

//   const isAuthenticated = () => {
//     return !!token;
//   };

//   const getAuthHeaders = () => {
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     };
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         login,
//         logout,
//         isAuthenticated,
//         getAuthHeaders,
//         loading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';  // <-- USE THIS instead of axios

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setLoading(true);

      // IMPORTANT FIX: use api.post(), not axios.post()
      const response = await api.post('/auth/login', { username, password });

      const { token } = response.data;
      setToken(token);
      localStorage.setItem('adminToken', token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  const isAuthenticated = () => {
    return !!token;
  };

  // const getAuthHeaders = () => {
  //   return {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   };
  // };

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${token}`
  });


  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
        getAuthHeaders,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

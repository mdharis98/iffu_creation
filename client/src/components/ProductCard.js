import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { likeProduct } from '../services/api';
import { getUserId } from '../utils/userId';

const ProductCard = ({ product, onClick, onUpdate }) => {
  const [likes, setLikes] = useState(product.likes || 0);
  const [liking, setLiking] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  useEffect(() => {
    const userId = getUserId();
    const likedBy = product.likedBy || [];
    setAlreadyLiked(likedBy.includes(userId));
    setLikes(product.likes || 0);
  }, [product]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liking || alreadyLiked) return;

    try {
      setLiking(true);
      const userId = getUserId();
      const response = await likeProduct(product._id, userId);
      
      if (response.data.alreadyLiked === false) {
        setLikes(response.data.likes);
        setAlreadyLiked(true);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.alreadyLiked) {
        setAlreadyLiked(true);
        setLikes(error.response.data.likes);
      } else {
        console.error('Error liking product:', error);
      }
    } finally {
      setLiking(false);
    }
  };

  const handleOrderClick = (e) => {
    e.stopPropagation();
    onClick();
  };


  return (
    <div
      onClick={onClick}
      className="bg-card text-textPrimary rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300x200'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleLike}
          disabled={liking || alreadyLiked}
          className={`absolute top-2 right-2 rounded-full p-2 shadow-lg transition ${
            alreadyLiked 
              ? 'bg-red-100 cursor-not-allowed' 
              : 'bg-white hover:bg-red-50'
          } ${liking ? 'opacity-50' : ''}`}
          title={alreadyLiked ? 'You already liked this product' : 'Like this product'}
        >
          <FaHeart className={`text-lg ${
            alreadyLiked || liking 
              ? 'text-red-500' 
              : 'text-gray-600 hover:text-red-500'
          }`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-textPrimary mb-2">{product.name}</h3>
        <p className="text-textSecondary text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">Rs.{product.price}</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-textSecondary flex items-center space-x-1">
              <FaHeart className="text-red-500" />
              <span>{likes}</span>
            </span>
          </div>
        </div>

        <button
          onClick={handleOrderClick}
          className="w-full text-white py-2 rounded-xl transition flex items-center justify-center space-x-2 shadow-md hover:shadow-lg bg-button hover:bg-buttonHover"
        >
          <FaShoppingCart />
          <span>Order Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import {
  likeProduct,
  getFeedbackForProduct,
  createFeedback,
  createOrder,
} from "../services/api";
import { getUserId } from "../utils/userId";
import OrderForm from "./OrderForm";

const ProductModal = ({ product, isOpen, onClose, onProductUpdate }) => {
  const [likes, setLikes] = useState(product.likes || 0);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackName, setFeedbackName] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (isOpen && product) {
      setLikes(product.likes || 0);
      const userId = getUserId();
      const likedBy = product.likedBy || [];
      setAlreadyLiked(likedBy.includes(userId));
      setCurrentImageIndex(0);
      fetchFeedbacks();
    }
  }, [isOpen, product]);

  const fetchFeedbacks = async () => {
    try {
      const response = await getFeedbackForProduct(product._id);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleLike = async () => {
    if (alreadyLiked) return;

    try {
      const userId = getUserId();
      const response = await likeProduct(product._id, userId);

      if (response.data.alreadyLiked === false) {
        setLikes(response.data.likes);
        setAlreadyLiked(true);
        onProductUpdate();
      }
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.alreadyLiked
      ) {
        setAlreadyLiked(true);
        setLikes(error.response.data.likes);
      } else {
        console.error("Error liking product:", error);
      }
    }
  };

  const handlePreviousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleOrderNow = (e) => {
    e.stopPropagation();
    setShowOrderForm(true);
  };

  const handleOrderSubmit = async (orderData) => {
    try {
      setLoading(true);
      await createOrder({
        ...orderData,
        productId: product._id,
      });
      setShowOrderForm(false);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim() || !feedbackName.trim() || rating === 0) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setSubmittingFeedback(true);
      const response = await createFeedback({
        productId: product._id,
        customerName: feedbackName,
        text: feedbackText,
        rating,
      });

      //  Add new feedback instantly in the list
      setFeedbacks((prev) => [
        ...prev,
        {
          _id: response.data._id,
          customerName: feedbackName,
          text: feedbackText,
          rating,
          createdAt: new Date().toISOString(),
        },
      ]);

      // Clear input fields
      setFeedbackText("");
      setFeedbackName("");
      setRating(0);

      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background text-textPrimary rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-slide-up shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg hover:bg-gray-100 transition"
        >
          <FaTimes className="text-textSecondary" />
        </button>

        {showOrderForm ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
            <OrderForm
              product={product}
              onSubmit={handleOrderSubmit}
              onCancel={() => setShowOrderForm(false)}
              loading={loading}
            />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Images and Video Section */}
              <div className="space-y-4">
                <div className="relative">
                  {product.images && product.images.length > 0 && (
                    <>
                      <img
                        src={product.images[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-64 md:h-80 object-cover rounded-xl"
                      />
                      {product.images.length > 1 && (
                        <>
                          <button
                            onClick={handlePreviousImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                          >
                            <FaChevronLeft />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                          >
                            <FaChevronRight />
                          </button>
                        </>
                      )}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {product.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {product.video && (
                  <div className="rounded-lg overflow-hidden">
                    <video
                      controls
                      className="w-full h-64 md:h-80 object-cover"
                      src={product.video}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>

              {/* Product Details Section */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-textPrimary mb-2">
                    {product.name}
                  </h2>
                  <p className="text-3xl font-bold text-primary mb-4">
                    Rs.{product.price}
                  </p>
                  <p className="text-textSecondary leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    disabled={alreadyLiked}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                      alreadyLiked
                        ? "bg-red-100 text-red-600 cursor-not-allowed"
                        : "bg-red-50 text-red-600 hover:bg-red-100"
                    }`}
                    title={
                      alreadyLiked
                        ? "You already liked this product"
                        : "Like this product"
                    }
                  >
                    <FaHeart className={alreadyLiked ? "text-red-500" : ""} />
                    <span>{likes} Likes</span>
                  </button>
                  <button
                    onClick={handleOrderNow}
                    className="flex items-center space-x-2 px-6 py-2 text-white rounded-xl shadow-md hover:shadow-lg bg-button hover:bg-buttonHover transition"
                  >
                    <FaShoppingCart />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="border-t border-slate-700 p-6 mt-6">
              <h3 className="text-2xl font-bold mb-4">Customer Feedback</h3>

              {/* Feedback Form */}
              <form onSubmit={handleFeedbackSubmit} className="mb-6 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 bg-white text-textPrimary placeholder-textSecondary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-textSecondary">
                    Your Rating:
                  </span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                      aria-label={`Rate ${star} star`}
                    >
                      <FaStar
                        className={
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
                <div>
                  <textarea
                    placeholder="Write your feedback..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 bg-white text-textPrimary placeholder-textSecondary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingFeedback}
                  className="px-6 py-2 text-white rounded-xl shadow-md hover:shadow-lg bg-button hover:bg-buttonHover transition disabled:opacity-50"
                >
                  {submittingFeedback ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>

              {/* Feedbacks List */}
              <div className="space-y-4">
                {feedbacks.length === 0 ? (
                  <p className="text-slate-300">
                    No feedback yet. Be the first to review!
                  </p>
                ) : (
                  feedbacks.map((feedback) => (
                    <div
                      key={feedback._id}
                      className="bg-card p-4 rounded-xl shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-textPrimary">
                          {feedback.customerName}
                        </h4>
                        <span className="text-sm text-textSecondary">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FaStar
                            key={s}
                            className={
                              s <= (feedback.rating || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-textSecondary">{feedback.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductModal;

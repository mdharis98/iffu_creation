// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getFeedbackForProduct } from '../services/api';
// import { FaStar } from 'react-icons/fa';

// const FeedbackPage = () => {
//   const { productId } = useParams();
//   const [feedback, setFeedback] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         setLoading(true);
//         const response = await getFeedbackForProduct(productId);
//         setFeedback(response.data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch feedback. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedback();
//   }, [productId]);

//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[...Array(5)].map((_, index) => (
//           <FaStar
//             key={index}
//             className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
//           />
//         ))}
//       </div>
//     );
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading feedback...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-textPrimary mb-6">Product Feedback</h1>
//       {feedback.length > 0 ? (
//         <div className="space-y-4">
//           {feedback.map((item) => (
//             <div key={item._id} className="bg-card p-4 rounded-lg shadow">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-lg font-semibold text-textPrimary">{item.customerName}</h3>
//                 {renderStars(item.rating)}
//               </div>
//               <p className="text-textSecondary">{item.text}</p>
//               <p className="text-xs text-gray-400 mt-2">
//                 {new Date(item.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-textSecondary">No feedback yet for this product.</p>
//       )}
//     </div>
//   );
// };

// export default FeedbackPage;

import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/api';
import { FaTimes, FaImage, FaVideo } from 'react-icons/fa';

const ProductForm = ({ product, onClose, onSuccess, getAuthHeaders }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: ''
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [existingVideo, setExistingVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        price: product.price || ''
      });
      setExistingImages(product.images || []);
      setExistingVideo(product.video || null);
    } else {
      setExistingImages([]);
      setExistingVideo(null);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleVideoChange = (e) => {
    if (e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.name || !formData.description || !formData.shortDescription || !formData.price) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (!product && images.length === 0) {
//       setError('Please upload at least one image');
//       return;
//     }

//     if (product && images.length === 0 && existingImages.length === 0) {
//       setError('Product must have at least one image');
//       return;
//     }

//     try {
//       setLoading(true);
//       const headers = getAuthHeaders();
//       const formDataToSend = new FormData();
      
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('shortDescription', formData.shortDescription);
//       formDataToSend.append('price', formData.price);

//       images.forEach((image) => {
//         formDataToSend.append('images', image);
//       });

//       if (video) {
//         formDataToSend.append('video', video);
//       }

//       // Note: Don't set Content-Type for FormData - axios sets it automatically with boundary

//       if (product) {
//         await updateProduct(product._id, formDataToSend, {headers});
//         alert('Product updated successfully!');
//       } else {
//         await createProduct(formDataToSend, {headers});
//         alert('Product created successfully!');
//       }

//       onSuccess();
//     } catch (error) {
//       console.error('Error saving product:', error);
//       setError(error.response?.data?.message || 'Failed to save product');
//     } finally {
//       setLoading(false);
//     }
//   };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');

//   if (!formData.name || !formData.description || !formData.shortDescription || !formData.price) {
//     setError('Please fill in all fields');
//     return;
//   }

//   if (!product && images.length === 0) {
//     setError('Please upload at least one image');
//     return;
//   }

//   if (product && images.length === 0 && existingImages.length === 0) {
//     setError('Product must have at least one image');
//     return;
//   }

//   try {
//     setLoading(true);
//     const headers = getAuthHeaders();
//     const formDataToSend = new FormData();
    
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('description', formData.description);
//     formDataToSend.append('shortDescription', formData.shortDescription);
//     formDataToSend.append('price', formData.price);

//     images.forEach((image) => {
//       formDataToSend.append('images', image);
//     });

//     if (video) {
//       formDataToSend.append('video', video);
//     }


const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!formData.name || !formData.description || !formData.shortDescription || !formData.price) {
    setError('Please fill in all fields');
    return;
  }

  if (!product && images.length === 0) {
    setError('Please upload at least one image');
    return;
  }

  if (product && images.length === 0 && existingImages.length === 0) {
    setError('Product must have at least one image');
    return;
  }

  try {
    setLoading(true);

    const formDataToSend = new FormData();
    
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('shortDescription', formData.shortDescription);
    formDataToSend.append('price', formData.price);

    images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    if (video) {
      formDataToSend.append('video', video);
    }

    // 🔐 FIXED HERE
    if (product) {
      await updateProduct(product._id, formDataToSend, { headers: getAuthHeaders() });
      alert('Product updated successfully!');
    } else {
      await createProduct(formDataToSend, { headers: getAuthHeaders() });
      alert('Product created successfully!');
    }

    onSuccess();
  } catch (error) {
    console.error('Error saving product:', error);
    setError(error.response?.data?.message || 'Failed to save product');
  } finally {
    setLoading(false);
  }
};


    // ⬇️ FIXED HERE (Wrapped headers correctly)
    // if (product) {
    //   await updateProduct(product._id, formDataToSend, { headers });
    //   alert('Product updated successfully!');
    // } else {
    //   await createProduct(formDataToSend, { headers });
    //   alert('Product created successfully!');
    // }

//     if (product) {
//       await updateProduct(product._id, formDataToSend, { headers: getAuthHeaders() });
//       alert('Product updated successfully!');
//     } else {
//       await createProduct(formDataToSend, { headers: getAuthHeaders() });
//       alert('Product created successfully!');
//     }


//     onSuccess();
//   } catch (error) {
//     console.error('Error saving product:', error);
//     setError(error.response?.data?.message || 'Failed to save product');
//   } finally {
//     setLoading(false);
//   }
// };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background text-textPrimary rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-textSecondary hover:text-textPrimary"
        >
          <FaTimes className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>

        {error && (
          <div className="bg-error/10 border border-error/40 text-error px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-white text-textPrimary placeholder-textSecondary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Short Description *
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 bg-white text-textPrimary placeholder-textSecondary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Brief description for product card"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Full Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 bg-white text-textPrimary placeholder-textSecondary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Detailed product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Price * (Rs)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 bg-white text-textPrimary placeholder-textSecondary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Product Images * {product && '(Add new images to keep existing ones)'}
            </label>
            {existingImages.length > 0 && (
              <div className="mb-2">
                <p className="text-sm text-textSecondary mb-1">Existing Images:</p>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {existingImages.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt={`Existing ${index}`}
                        className="w-full h-20 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2 mb-2">
              <label className="flex items-center space-x-2 px-4 py-2 text-white rounded-xl cursor-pointer shadow-md hover:shadow-lg bg-button hover:bg-buttonHover transition">
                <FaImage />
                <span>Add New Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            {images.length > 0 && (
              <div>
                <p className="text-sm text-textSecondary mb-1">New Images to Upload:</p>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Product Video (Optional) {product && '(Upload new to replace existing)'}
            </label>
            {existingVideo && (
              <div className="mb-2">
                <p className="text-sm text-textSecondary mb-1">Existing Video:</p>
                <video src={existingVideo} controls className="w-full max-w-md rounded mb-2" />
              </div>
            )}
            <label className="flex items-center space-x-2 px-4 py-2 text-white rounded-xl cursor-pointer shadow-md hover:shadow-lg bg-button hover:bg-buttonHover transition inline-block">
              <FaVideo />
              <span>{existingVideo ? 'Replace Video' : 'Choose Video'}</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
            </label>
            {video && (
              <div className="mt-2">
                <p className="text-sm text-textSecondary">New video selected: {video.name}</p>
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-gray-300 text-textSecondary rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2 text-white rounded-xl shadow-md hover:shadow-lg bg-button hover:bg-buttonHover transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;


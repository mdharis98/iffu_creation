// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');
// const authMiddleware = require('../middleware/auth');
// const upload = require('../middleware/multer');
// const { uploadBufferToCloudinary } = require('../config/cloudinary');
// const multer = require('multer');
// const cloudinary = require('../config/cloudinary');


const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

const upload = require('../middleware/multer');
const { uploadBufferToCloudinary } = require('../config/cloudinary');



// Configure multer for memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// Get all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});



// Get single product
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error: error.message });
//   }
// });


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});




// Like a product
// router.post('/:id/like', async (req, res) => {
//   try {
//     const { userId } = req.body;
    
//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }

//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Check if user already liked this product
//     if (product.likedBy && product.likedBy.includes(userId)) {
//       return res.status(400).json({ 
//         message: 'You have already liked this product',
//         likes: product.likes,
//         alreadyLiked: true
//       });
//     }

//     // Add like and user ID
//     product.likes = (product.likes || 0) + 1;
//     if (!product.likedBy) {
//       product.likedBy = [];
//     }
//     product.likedBy.push(userId);
//     await product.save();

//     res.json({ 
//       likes: product.likes,
//       alreadyLiked: false
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error liking product', error: error.message });
//   }
// });



// router.post(
//   '/',
//   authMiddleware,
//   upload.fields([
//     { name: 'images', maxCount: 10 },
//     { name: 'video', maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const images = [];
//       if (req.files?.images) {
//         for (const file of req.files.images) {
//           const url = await uploadBufferToCloudinary(file.buffer, "iffu_products");
//           images.push(url);
//         }
//       }

//       let videoUrl = null;
//       if (req.files?.video) {
//         videoUrl = await uploadBufferToCloudinary(req.files.video[0].buffer, "iffu_videos");
//       }

//       const product = new Product({
//         name: req.body.name,
//         description: req.body.description,
//         shortDescription: req.body.shortDescription,
//         price: req.body.price,
//         images,
//         video: videoUrl,
//       });

//       await product.save();
//       res.json({ message: 'Product created successfully', product });

//     } catch (error) {
//       console.error('UPLOAD ERROR:', error);
//       res.status(500).json({ message: 'Error creating product', error: error.message });
//     }
//   }
// );




// Helper function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(file.buffer);
  });
};

// Add new product (Admin only)
// router.post
// '/', 
// authMiddleware, 
// upload.fields([
//   { name: 'images', maxCount: 10 },
//   { name: 'video', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const { name, description, shortDescription, price } = req.body;

//     if (!name || !description || !shortDescription || !price) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Upload images
//     const imageFiles = req.files?.images || [];
//     const images = [];
//     for (const file of imageFiles) {
//       const url = await uploadToCloudinary(file);
//       images.push(url);
//     }

//     // if (images.length === 0) {
//     //   return res.status(400).json({ message: 'At least one image is required' });
//     // }

//     if (req.files?.images) {
//       for (const file of req.files.images) {
//         const url = await uploadToCloudinary(file);
//         images.push(url);
//       }
//     }


//     // Upload video if provided
//     let videoUrl = null;
//     if (req.files?.video && req.files.video.length > 0) {
//       videoUrl = await uploadToCloudinary(req.files.video[0]);
//     }

//     const product = new Product({
//       name,
//       description,
//       shortDescription,
//       price: parseFloat(price),
//       images,
//       video: videoUrl
//     });

//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating product', error: error.message });
//   }
// });


// 📌 CREATE PRODUCT (Admin Only)
router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, description, shortDescription, price } = req.body;

      if (!name || !description || !shortDescription || !price) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Upload images
      const images = [];
      if (req.files?.images) {
        for (const file of req.files.images) {
          const url = await uploadBufferToCloudinary(file.buffer, "iffu_products");
          images.push(url);
        }
      }

      // Upload video
      let videoUrl = null;
      if (req.files?.video) {
        videoUrl = await uploadBufferToCloudinary(req.files.video[0].buffer, "iffu_videos");
      }

      const product = new Product({
        name,
        description,
        shortDescription,
        price,
        images,
        video: videoUrl,
      });

      await product.save();
      res.json({ message: 'Product created successfully', product });

    } catch (error) {
      console.error('UPLOAD ERROR:', error);
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  }
);

// Update product (Admin only)
// router.put('/:id', authMiddleware, upload.fields([
//   { name: 'images', maxCount: 10 },
//   { name: 'video', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const { name, description, shortDescription, price } = req.body;

//     if (name) product.name = name;
//     if (description) product.description = description;
//     if (shortDescription) product.shortDescription = shortDescription;
//     if (price) product.price = parseFloat(price);

//     // Handle image uploads
//     if (req.files?.images && req.files.images.length > 0) {
//       const imageFiles = req.files.images;
//       const newImages = [];
//       for (const file of imageFiles) {
//         const url = await uploadToCloudinary(file);
//         newImages.push(url);
//       }
//       product.images = [...product.images, ...newImages];
//     }

//     // Handle video upload
//     if (req.files?.video && req.files.video.length > 0) {
//       product.video = await uploadToCloudinary(req.files.video[0]);
//     }

//     product.updatedAt = Date.now();
//     await product.save();
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating product', error: error.message });
//   }
// });



router.put('/:id', authMiddleware, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, shortDescription, price } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (shortDescription) product.shortDescription = shortDescription;
    if (price) product.price = parseFloat(price);

    // Handle new image uploads
    if (req.files?.images) {
      for (const file of req.files.images) {
        const url = await uploadBufferToCloudinary(file.buffer, "iffu_products");
        product.images.push(url);
      }
    }

    // Handle new video upload
    if (req.files?.video) {
      product.video = await uploadBufferToCloudinary(req.files.video[0].buffer, "iffu_videos");
    }

    await product.save();
    res.json({ message: 'Product updated successfully', product });

  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});



// Delete product (Admin only)
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting product', error: error.message });
//   }
// });


// 📌 DELETE PRODUCT
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});




module.exports = router;


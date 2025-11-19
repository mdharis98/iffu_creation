const express = require('express');
const Feedback = require('../models/Feedback');
const Product = require('../models/Product');
const router = express.Router();

// Get all feedback for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ productId: req.params.productId })
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
});

// Create new feedback
router.post('/', async (req, res) => {
  try {
    const { productId, customerName, text, rating } = req.body;

    if (!productId || !customerName || !text || typeof rating === 'undefined') {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const numericRating = Number(rating);
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const feedback = new Feedback({
      productId,
      customerName,
      text,
      rating: numericRating
    });

    await feedback.save();
  } 
  catch (error) {
    res.status(500).json({ message: 'Error creating feedback', error: error.message });
  }
});

// Get all feedbacks (Admin only)
router.get('/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('productId', 'name')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
  }
});

module.exports = router;


const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendWhatsAppNotification } = require('../utils/whatsapp');
const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { productId, customerName, phoneNumber, address, location } = req.body;

    if (!productId || !customerName || !phoneNumber || !address || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const order = new Order({
      productId,
      customerName,
      phoneNumber,
      address,
      location
    });

    await order.save();

    // Send WhatsApp notification
    const adminPhone = process.env.ADMIN_PHONE_NUMBER;
    if (adminPhone) {
      const message = `New Order Received from ${customerName}, Phone: ${phoneNumber}, Address: ${address}, Location: ${location}, Product: ${product.name}`;
      await sendWhatsAppNotification(message, adminPhone);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Get all orders (Admin only)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('productId', 'name price images')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('productId', 'name price images');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
});

module.exports = router;


const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Read all orders
router.get("/", async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Read a single order by ID
  router.get("/:id", async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Create a new order
  router.post("/", async (req, res) => {
    try {
      const { items, clientName, clientTelegram, clientWhatsapp, clientLocation } = req.body;
  
      // Validate required fields
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "Order items are required" });
      }
      if (!clientName || !clientWhatsapp || !clientLocation) {
        return res.status(400).json({ message: "Client details are required (name, WhatsApp, location)" });
      }
  
      // Create a new order with all required fields
      const newOrder = new Order({
        items,
        clientName,
        clientTelegram, // Optional, can be null or undefined
        clientWhatsapp,
        clientLocation,
      });
  
      // Save the order to the database
      await newOrder.save();
  
      // Respond with success
      res.status(201).json({ message: "Order successfully created", order: newOrder });
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ error: err.message });
    }
  });
  
  
  // Update an order by ID
  router.put('/:id', async (req, res) => {
    try {
      const { status } = req.body;
      if (!['in progress', 'done', 'cancel'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
  
      if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
  
      res.status(200).json({ message: 'Order status updated', order: updatedOrder });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  // Delete an order by ID
  router.delete("/:id", async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Order successfully deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get orders by createdAt date
router.get("/by-date/:date", async (req, res) => {
  try {
    const { date } = req.params; // Extract the date from the route parameter

    // Validate the date format (YYYY-MM-DD)
    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({ message: "Invalid or missing date parameter. Use format YYYY-MM-DD." });
    }

    // Convert the date string into a range covering the entire day
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    // Query orders with createdAt within the date range
    const orders = await Order.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    // Check if any orders were found
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the specified date." });
    }

    // Respond with the orders
    res.status(200).json({
      message: `Orders retrieved for the date: ${date}`,
      orders,
    });
  } catch (err) {
    // Log and handle errors
    console.error("Error fetching orders by date:", err);
    res.status(500).json({ error: err.message });
  }
});


  
  module.exports = router; // Correctly export the router

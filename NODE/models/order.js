const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      title: { type: String, required: true },
      price: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["in progress", "done", "cancel"], // Restrict to these values
    default: "in progress", // Default value
  },
  clientName: {type: String , required: true },
  clientTelegram: {type: Number, required: false} ,
  clientWhatsapp: {type: Number, required: true } , 
  clientLocation: {type: String, required: true } , 
});

module.exports = mongoose.model("Order", orderSchema);

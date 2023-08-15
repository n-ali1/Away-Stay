const mongoose = require("mongoose");

// Define the Place schema
const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: [String],
  desc: String,
  perks: String,
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Place model based on the schema
module.exports = mongoose.model("Place", placeSchema);

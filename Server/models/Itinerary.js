const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    travelData: {
      type: String,
      required: true,
    },
    itinerary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Itinerary",
  itinerarySchema
);
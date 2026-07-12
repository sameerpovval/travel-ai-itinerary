const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      default: "Travel Itinerary",
    },

    travelData: {
      type: String,
      required: true,
    },

    itinerary: {
      type: String,
      required: true,
    },

    places: {
      type: [String],
      default: [],
    },

    budget: {
      type: String,
      default: "",
    },

    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
        },
        text: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Itinerary",
  itinerarySchema
);
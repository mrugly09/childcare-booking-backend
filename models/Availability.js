const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    caregiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caregiver",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    startTime: {
      type: String,
      required: true,
      trim: true
    },

    endTime: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["available", "booked", "unavailable"],
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Availability", availabilitySchema);
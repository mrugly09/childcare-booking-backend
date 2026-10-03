const mongoose = require("mongoose");

const caregiverSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    bio: {
      type: String,
      trim: true
    },

    experience: {
      type: String,
      trim: true
    },

    location: {
      type: String,
      trim: true
    },

    hourlyRate: {
      type: Number,
      required: true,
      min: 0
    },

    services: [
      {
        type: String,
        trim: true
      }
    ],

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Caregiver", caregiverSchema);
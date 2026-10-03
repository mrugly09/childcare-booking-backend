const express = require('express');
const Booking = require('../models/Booking');
const verifyToken = require('../middleware/auth');
const checkRole = require('../middleware/role');

const router = express.Router();

// POST /api/bookings - Protected: Parents only
router.post('/', verifyToken, checkRole('PARENT'), async (req, res, next) => {
  try {
    const { caregiverId, childName, date, notes } = req.body;

    // Validation Check
    if (!childName || !date) {
      return res.status(400).json({
        success: false,
        message: "Child name and booking date are required fields."
      });
    }

    const newBooking = await Booking.create({
      parent: req.user.id,
      caregiver: caregiverId,
      childName,
      date,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: newBooking
    });
  } catch (error) {
    next(error); // Forwards database/server errors to central errorHandler
  }
});

// GET /api/bookings - Protected: Any logged-in user
// GET /api/bookings - Protected: Fetch relevant bookings for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    let filter = {};

    // Role-based filtering
    if (req.user.role === 'PARENT') {
      // Parents only see bookings they created
      filter.parent = req.user.id;
    } else if (req.user.role === 'CAREGIVER') {
      // Caregivers see bookings where they are assigned or pending requests
      filter = {
        $or: [
          { caregiver: req.user.id },
          { status: 'PENDING' }
        ]
      };
    }

    // Fetch filtered bookings from MongoDB
    const bookings = await Booking.find(filter)
      .populate('parent', 'name email role')
      .populate('caregiver', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      error: error.message
    });
  }
});

// PATCH /api/bookings/:id/status - Protected: Caregivers only
router.patch('/:id/status', verifyToken, checkRole('CAREGIVER'), async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
      error: error.message
    });
  }
});

module.exports = router;
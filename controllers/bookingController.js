const Booking = require('../models/Booking');

// Create a new booking
const createBooking = async (req, res, next) => {
  try {
    const { caregiverId, childName, date, notes } = req.body;

    // Validation
    if (!childName || !date) {
      return res.status(400).json({
        success: false,
        message: 'Child name and booking date are required fields.'
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
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    next(error);
  }
};


// Get bookings for the logged-in user
const getBookings = async (req, res, next) => {
  try {
    let filter = {};

    // Parents only see their own bookings
    if (req.user.role === 'PARENT') {
      filter.parent = req.user.id;
    }

    // Caregivers see assigned bookings and pending bookings
    else if (req.user.role === 'CAREGIVER') {
      filter = {
        $or: [
          { caregiver: req.user.id },
          { status: 'PENDING' }
        ]
      };
    }

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
    next(error);
  }
};


// Update booking status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus
};
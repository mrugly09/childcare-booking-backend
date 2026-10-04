const Booking = require("../models/Booking");
const Caregiver = require("../models/Caregiver");

// Create booking
const createBooking = async (req, res, next) => {
    try {
        const {
            caregiverId,
            childName,
            date,
            notes
        } = req.body;

        if (!caregiverId || !childName || !date) {
            return res.status(400).json({
                success: false,
                message: "Caregiver, child name and booking date are required fields."
            });
        }

        // Make sure the selected caregiver exists
        const caregiver = await Caregiver.findById(caregiverId);

        if (!caregiver) {
            return res.status(404).json({
                success: false,
                message: "Caregiver not found"
            });
        }

        const booking = await Booking.create({
            parent: req.user.id,
            caregiver: caregiver._id,
            childName,
            date,
            notes
        });

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });

    } catch (error) {
        next(error);
    }
};


// Get bookings
const getBookings = async (req, res, next) => {
    try {
        let filter = {};

        // Parent sees only their own bookings
        if (req.user.role === "PARENT") {
            filter.parent = req.user.id;
        }

        // Caregiver sees only bookings assigned to them
        else if (req.user.role === "CAREGIVER") {
            const caregiver = await Caregiver.findOne({
                user: req.user.id
            });

            if (!caregiver) {
                return res.status(404).json({
                    success: false,
                    message: "Caregiver profile not found"
                });
            }

            filter.caregiver = caregiver._id;
        }

        const bookings = await Booking.find(filter)
            .populate("parent", "name email role")
            .populate({
                path: "caregiver",
                populate: {
                    path: "user",
                    select: "name email role"
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
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

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Booking status is required"
            });
        }

        const caregiver = await Caregiver.findOne({
            user: req.user.id
        });

        if (!caregiver) {
            return res.status(404).json({
                success: false,
                message: "Caregiver profile not found"
            });
        }

        const updatedBooking = await Booking.findOneAndUpdate(
            {
                _id: id,
                caregiver: caregiver._id
            },
            {
                status
            },
          
                {
    returnDocument: "after",
    runValidators: true
}

        );

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found or you are not authorized to update it"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
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
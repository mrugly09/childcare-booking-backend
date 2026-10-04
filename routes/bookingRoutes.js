const express = require("express");

const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/role");

const {
    createBooking,
    getBookings,
    updateBookingStatus
} = require("../controllers/bookingController");

const router = express.Router();

router.post(
    "/create",
    verifyToken,
    checkRole("PARENT"),
    createBooking
);

router.get(
    "/all",
    verifyToken,
    getBookings
);

router.patch(
    "/update/:id/status",
    verifyToken,
    checkRole("CAREGIVER"),
    updateBookingStatus
);

module.exports = router;
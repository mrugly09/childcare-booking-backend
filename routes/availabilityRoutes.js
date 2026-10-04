const express = require("express");

const {
    createAvailability,
    getAvailability,
    getCaregiverAvailability,
    updateAvailability,
    deleteAvailability
} = require("../controllers/availabilityController");

const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/role");

const router = express.Router();

router.post(
    "/create",
    verifyToken,
    checkRole("CAREGIVER"),
    createAvailability
);

router.get("/all", getAvailability);

router.get(
    "/caregiver/:caregiverId",
    getCaregiverAvailability
);

router.put(
    "/update/:id",
    verifyToken,
    checkRole("CAREGIVER"),
    updateAvailability
);

router.delete(
    "/delete/:id",
    verifyToken,
    checkRole("CAREGIVER"),
    deleteAvailability
);

module.exports = router;
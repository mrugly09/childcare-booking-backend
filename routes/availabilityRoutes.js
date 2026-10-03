const express = require("express");

const {
    createAvailability,
    getAvailability,
    getCaregiverAvailability,
    updateAvailability,
    deleteAvailability
} = require("../controllers/availabilityController");

const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, createAvailability);

router.get("/", getAvailability);

router.get(
    "/caregiver/:caregiverId",
    getCaregiverAvailability
);

router.put("/:id", verifyToken, updateAvailability);

router.delete("/:id", verifyToken, deleteAvailability);

module.exports = router;
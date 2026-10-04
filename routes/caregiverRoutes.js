const express = require("express");

const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/role");

const {
    createCaregiver,
    getCaregivers,
    getCaregiverById,
    updateCaregiver,
    deleteCaregiver
} = require("../controllers/caregiverController");

const router = express.Router();

// Create caregiver profile - CAREGIVER only
router.post(
  "/create",
  verifyToken,
  checkRole("CAREGIVER"),
  createCaregiver
);

// Get all caregivers - logged-in users
router.get(
  "/all",
  verifyToken,
  getCaregivers
);

// Get one caregiver - logged-in users
router.get(
  "/:id",
  verifyToken,
  getCaregiverById
);

// Update own caregiver profile - CAREGIVER only
router.put(
  "/update/:id",
  verifyToken,
  checkRole("CAREGIVER"),
  updateCaregiver
);

// Delete own caregiver profile - CAREGIVER only
router.delete(
  "/delete/:id",
  verifyToken,
  checkRole("CAREGIVER"),
  deleteCaregiver
);

module.exports = router;
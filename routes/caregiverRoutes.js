const express = require("express");

const {
    createCaregiver,
    getCaregivers,
    getCaregiverById,
    updateCaregiver,
    deleteCaregiver
} = require("../controllers/caregiverController");

const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post("/createcaregiver", verifyToken, createCaregiver);

router.get("/getcaregivers", getCaregivers);

router.get("/getcaregiver/:id", getCaregiverById);

router.put("/updatecaregiver", verifyToken, updateCaregiver);

router.delete("/deletecaregiver", verifyToken, deleteCaregiver);

module.exports = router;
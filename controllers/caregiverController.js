const Caregiver = require("../models/Caregiver");

// Create caregiver profile
const createCaregiver = async (req, res) => {
    try {
        const { bio, location, hourlyRate, services } = req.body;

        if (!location || hourlyRate === undefined) {
            return res.status(400).json({
                success: false,
                message: "Location and hourly rate are required"
            });
        }

        // Check if the user already has a caregiver profile
        const existingCaregiver = await Caregiver.findOne({
            user: req.user._id
        });

        if (existingCaregiver) {
            return res.status(409).json({
                success: false,
                message: "Caregiver profile already exists"
            });
        }

        const caregiver = await Caregiver.create({
            user: req.user._id,
            bio,
            location,
            hourlyRate,
            services: services || []
        });

        return res.status(201).json({
            success: true,
            message: "Caregiver profile created successfully",
            data: caregiver
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to create caregiver profile"
        });
    }
};


// Get all caregivers
const getCaregivers = async (req, res) => {
    try {
        const caregivers = await Caregiver.find()
            .populate("user", "name email role");

        return res.status(200).json({
            success: true,
            data: caregivers
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch caregivers"
        });
    }
};


// Get one caregiver
const getCaregiverById = async (req, res) => {
    try {
        const { id } = req.params;

        const caregiver = await Caregiver.findById(id)
            .populate("user", "name email role");

        if (!caregiver) {
            return res.status(404).json({
                success: false,
                message: "Caregiver not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: caregiver
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch caregiver"
        });
    }
};


// Update caregiver profile
const updateCaregiver = async (req, res) => {
    try {
        const { bio, location, hourlyRate, services } = req.body;

        const caregiver = await Caregiver.findOneAndUpdate(
            { user: req.user._id },
            {
                bio,
                location,
                hourlyRate,
                services
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!caregiver) {
            return res.status(404).json({
                success: false,
                message: "Caregiver profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Caregiver profile updated successfully",
            data: caregiver
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to update caregiver profile"
        });
    }
};


// Delete caregiver profile
const deleteCaregiver = async (req, res) => {
    try {
        const caregiver = await Caregiver.findOneAndDelete({
            user: req.user._id
        });

        if (!caregiver) {
            return res.status(404).json({
                success: false,
                message: "Caregiver profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Caregiver profile deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to delete caregiver profile"
        });
    }
};


module.exports = {
    createCaregiver,
    getCaregivers,
    getCaregiverById,
    updateCaregiver,
    deleteCaregiver
};
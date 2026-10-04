const Caregiver = require("../models/Caregiver");

// Create caregiver profile
const createCaregiver = async (req, res, next) => {
    try {
        const {
            bio,
            experience,
            location,
            hourlyRate,
            services
        } = req.body;

        if (!location || hourlyRate === undefined) {
            return res.status(400).json({
                success: false,
                message: "Location and hourly rate are required"
            });
        }

        // Check if the user already has a caregiver profile
        const existingCaregiver = await Caregiver.findOne({
            user: req.user.id
        });

        if (existingCaregiver) {
            return res.status(409).json({
                success: false,
                message: "Caregiver profile already exists"
            });
        }

        const caregiver = await Caregiver.create({
            user: req.user.id,
            bio,
            experience,
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
        next(error);
    }
};


// Get all caregivers
const getCaregivers = async (req, res, next) => {
    try {
        const caregivers = await Caregiver.find()
            .populate("user", "name email role");

        return res.status(200).json({
            success: true,
            count: caregivers.length,
            data: caregivers
        });

    } catch (error) {
        next(error);
    }
};


// Get one caregiver
const getCaregiverById = async (req, res, next) => {
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
        next(error);
    }
};


// Update caregiver profile
const updateCaregiver = async (req, res, next) => {
    try {
        const {
            bio,
            experience,
            location,
            hourlyRate,
            services
        } = req.body;

        const caregiver = await Caregiver.findOneAndUpdate(
            {
                user: req.user.id
            },
            {
                bio,
                experience,
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
        next(error);
    }
};


// Delete caregiver profile
const deleteCaregiver = async (req, res, next) => {
    try {
        const caregiver = await Caregiver.findOneAndDelete({
            user: req.user.id
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
        next(error);
    }
};


module.exports = {
    createCaregiver,
    getCaregivers,
    getCaregiverById,
    updateCaregiver,
    deleteCaregiver
};
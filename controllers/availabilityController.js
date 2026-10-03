const Availability = require("../models/Availability");

// Create availability
const createAvailability = async (req, res) => {
    try {
        const { caregiver, date, startTime, endTime, status } = req.body;

        if (!caregiver || !date || !startTime || !endTime) {
            return res.status(400).json({
                success: false,
                message: "Caregiver, date, start time and end time are required"
            });
        }

        const availability = await Availability.create({
            caregiver,
            date,
            startTime,
            endTime,
            status: status || "available"
        });

        return res.status(201).json({
            success: true,
            message: "Availability created successfully",
            data: availability
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to create availability"
        });
    }
};


// Get all availability
const getAvailability = async (req, res) => {
    try {
        const availability = await Availability.find()
            .populate("caregiver");

        return res.status(200).json({
            success: true,
            data: availability
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch availability"
        });
    }
};


// Get availability for a caregiver
const getCaregiverAvailability = async (req, res) => {
    try {
        const { caregiverId } = req.params;

        const availability = await Availability.find({
            caregiver: caregiverId
        }).populate("caregiver");

        return res.status(200).json({
            success: true,
            data: availability
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch caregiver availability"
        });
    }
};


// Update availability
const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        const availability = await Availability.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            data: availability
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to update availability"
        });
    }
};


// Delete availability
const deleteAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        const availability = await Availability.findByIdAndDelete(id);

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Availability deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to delete availability"
        });
    }
};


module.exports = {
    createAvailability,
    getAvailability,
    getCaregiverAvailability,
    updateAvailability,
    deleteAvailability
};
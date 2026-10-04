const Availability = require("../models/Availability");
const Caregiver = require("../models/Caregiver");

// Create availability
const createAvailability = async (req, res, next) => {
    try {
        const { date, startTime, endTime, status } = req.body;

        if (!date || !startTime || !endTime) {
            return res.status(400).json({
                success: false,
                message: "Date, start time and end time are required"
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

        const availability = await Availability.create({
            caregiver: caregiver._id,
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
        next(error);
    }
};


// Get all availability
const getAvailability = async (req, res, next) => {
    try {
        const availability = await Availability.find()
            .populate({
                path: "caregiver",
                populate: {
                    path: "user",
                    select: "name email"
                }
            })
            .sort({ date: 1, startTime: 1 });

        return res.status(200).json({
            success: true,
            count: availability.length,
            data: availability
        });

    } catch (error) {
        next(error);
    }
};


// Get availability for a specific caregiver
const getCaregiverAvailability = async (req, res, next) => {
    try {
        const { caregiverId } = req.params;

        const availability = await Availability.find({
            caregiver: caregiverId
        }).sort({
            date: 1,
            startTime: 1
        });

        return res.status(200).json({
            success: true,
            count: availability.length,
            data: availability
        });

    } catch (error) {
        next(error);
    }
};


// Update availability
const updateAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;

        const caregiver = await Caregiver.findOne({
            user: req.user.id
        });

        if (!caregiver) {
            return res.status(404).json({
                success: false,
                message: "Caregiver profile not found"
            });
        }

        const availability = await Availability.findOneAndUpdate(
            {
                _id: id,
                caregiver: caregiver._id
            },
            req.body,
            {
               
    returnDocument: "after",
    runValidators: true
}
        );

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found or you are not authorized to modify it"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            data: availability
        });

    } catch (error) {
        next(error);
    }
};


// Delete availability
const deleteAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;

        const caregiver = await Caregiver.findOne({
            user: req.user.id
        });

        if (!caregiver) {
            return res.status(404).json({
                success: false,
                message: "Caregiver profile not found"
            });
        }

        const availability = await Availability.findOneAndDelete({
            _id: id,
            caregiver: caregiver._id
        });

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found or you are not authorized to delete it"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Availability deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createAvailability,
    getAvailability,
    getCaregiverAvailability,
    updateAvailability,
    deleteAvailability
};
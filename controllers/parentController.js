const Child = require("../models/Child");

const addChild = async (req, res, next) => {
    try {
        const { firstName, lastName, dateOfBirth } = req.body;

        if (!firstName || !lastName || !dateOfBirth) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                data: null
            });
        }

        const child = await Child.create({
            parent: req.user.id,
            firstName,
            lastName,
            dateOfBirth
        });

        return res.status(201).json({
            success: true,
            message: "Child added successfully",
            data: child
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    addChild
};
const child = require("../models/Child");
const addChild = async (req, res) => {
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
        parent: req.user._id,
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
    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Unable to add child",
        error: error.message

    });

}
};
module.exports = {
    addChild
};

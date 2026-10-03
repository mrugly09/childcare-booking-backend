const mongoose = require('mongoose');
const childSchema = new mongoose.Schema({
    parent: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('Child', childSchema);
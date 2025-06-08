const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"],
        index: true  // Add index if you frequently search by name
    },
    email: {
        type: String,
        required: [true, "Please add the email"],
        unique: true,  // Ensure email uniqueness
        index: true    // Add index for faster email lookups
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number"],
        unique: true   // Ensure phone number uniqueness
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema)
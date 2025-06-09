const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")

// @desc    Get all users
// @route   GET /api/users
// @access  Private (typically you want this to be admin-only)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password'); // Exclude passwords from the response
    res.status(200).json(users);
});

/// @desc    Register a user
// @route   POST /api/users/register 
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    // Validate fields
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({ 
            _id: user.id, 
            email: user.email,
            username: user.username
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Login a user 
// @routePOST /api/users/login 
// @access public 
const loginUser = asyncHandler(async (req, res) =>{
    res.json({message: "Login the user"})
});

// @desc current user info
// @routePOST /api/users/current
// @access private  
const currentUser = asyncHandler(async (req, res) =>{
    res.json({message: "Current user information"})
});

module.exports = {registerUser, loginUser, currentUser, getAllUsers}
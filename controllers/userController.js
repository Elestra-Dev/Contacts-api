const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
        return res.status(400).json({ 
            message: "All fields are mandatory" 
        });
    }

    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(400).json({ 
            message: "User already registered" 
        });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ 
            _id: user.id, 
            email: user.email,
            username: user.username
        });
    } catch (error) {
        return res.status(400).json({ 
            message: "Invalid user data",
            error: error.message 
        });
    }
});

// @desc Login a user 
// @routePOST /api/users/login 
// @access public 
const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body
    if(!email || !password ){
        res.status(400)
        throw new Error ("all fiels are mandatory")
    }
    const user = await User.findOne({ email })
    //compare password with hash 
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
    )
        res.status(200).json({ accessToken })

    }else{
        res.status(401)
        throw new Error("email or password not valid")
    }
});

// @desc current user info
// @routePOST /api/users/current
// @access private  
const currentUser = asyncHandler(async (req, res) =>{
    res.json({message: "Current user information"})
});

module.exports = {registerUser, loginUser, currentUser, getAllUsers}
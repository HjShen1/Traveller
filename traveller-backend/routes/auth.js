const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 注册
router.post("/register", async (req, res) => {
    try {
        const { email, password, interests, location } = req.body;

        // Validate input
        if (!email || !password || !interests || !location) {
            return res.status(400).send("All fields are required");
        }
        if (!Array.isArray(interests)) {
            return res.status(400).send("Interests must be an array");
        }
        if (!location.type || location.type !== "Point" || !Array.isArray(location.coordinates)) {
            return res.status(400).send("Invalid location format");
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send("User already exists");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            email,
            password: hashedPassword,
            interests,
            location,
        });

        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Error registering user");
    }
});

// 登录
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error logging in");
    }
});

module.exports = router;
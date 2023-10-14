const express = require('express')
const router = express.Router();
const User = require("../models/user");
const BlogPost = require("../models/blog");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
dotenv.config();

// Authenticatation routes
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        const alreadyUser = await User.findOne({ username });
        if (alreadyUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }
        const hashPass = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashPass,
        });
        await user.save();
        res.status(200).json({
            success: true,
            message: "User Created",
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});


module.exports = router
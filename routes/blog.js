const express = require('express')
const router = express.Router();

// Model
const Blog = require('../models/blog')

// Authentication Middleware
const { isAuthenticated } = require("../middlewares/authentication")

// Creating a blog by logined user
router.post('/blog', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = await Blog.create({title, content, authorId: req.user._id})
    
        res.status(200).json({
            success: true,
            blog
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router
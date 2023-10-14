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
    
        res.status(201).json({
            success: true,
            data: blog
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// Geting a blog by Single user
router.get('/blogBySingleUser', isAuthenticated, async (req, res) => {
    try {
        const blogs = await Blog.find({ authorId : req.user.id })
        if(!blogs) {
            return res.status(200).json({
                success: true,
                message: "No Blog found"
            })
        }
        return res.status(403).json({
            success: true,
            data : blogs
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router
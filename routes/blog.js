const express = require('express')
const router = express.Router();

// Model
const Blog = require('../models/blog')

// Authentication Middleware
const { isAuthenticated } = require("../middlewares/authentication");
const { findById } = require('../models/user');
const User = require('../models/user');

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

// Get all blog 
router.get('/blog', isAuthenticated, async (req, res) => {
    try {
        const blogs = await Blog.find()
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

// Update Blog
router.put('/blog/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params.id;
        const blogs = await Blog.findById({_id : req.params.id, autherId: req.user._id})

        if(!blogs) {
            return res.status(200).json({
                success: true,
                message: "No Blog found"
            })
        }
        const updatedData = await Blog.findOneAndUpdate(blogs._id, req.body, { new : true})

        return res.status(403).json({
            success: true,
            data : updatedData
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// Delete Blog
router.delete('/blog/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params.id;
        const blogs = await Blog.findById({_id : req.params.id, autherId: req.user._id})

        if(!blogs) {
            return res.status(200).json({
                success: true,
                message: "No Blog found"
            })
        }
        const deleteData = await Blog.findOneAndDelete(blogs._id, req.body, { new : true})

        return res.status(403).json({
            success: true,
            data : deleteData
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// Bonus Get single Blog
router.get('/blog/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params.id;
        const blogs = await Blog.findById({_id : req.params.id})

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
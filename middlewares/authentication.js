const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Checking if user is authenticated or not
exports.isAuthenticated = async (req, res, next) => {
    try {
        const authKey = req.header("x-authKey")
    
        if(!authKey) {
            return res.status(403).json({
                success: false,
                message: "Auth token must be present"
            })
        }
        const decoded = jwt.verify(authKey, process.env.JWT_SECRET)
        if(decoded) {
            req.user = await User.findOne(decoded.id)
            next()
        } else {
            return res.status(403).json({
                success: false,
                message: "Unauthorised user"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
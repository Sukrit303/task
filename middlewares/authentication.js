const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Checking if user is authenticated or not
exports.isAuthenticated = async (req, res, next) => {
    const authKey = req.header("x-authKey")
    console.log(authKey)

    if(!authKey) {
        return res.status(403).json({
            success: false,
            message: "Auth token must be present"
        })
    }
    const decoded = jwt.verify(authKey, process.env.JWT_SECRET)
    req.user = await User.findOne(decoded.id)
    next()
}
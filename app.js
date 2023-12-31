const express = require('express');
const app = express()
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.json())

// Database Conncetion
const connectDatabase = require('./database/connection')
connectDatabase()

// Routes middleware
const user = require('./routes/auth')
const blog = require('./routes/blog')

app.use(user)
app.use(blog)

// Server Configuration
app.listen(process.env, () => {
    console.log(`Server starteed on PORT : ${process.env.port}`)
})
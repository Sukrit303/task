const mongoose = require('mongoose')

const connectDatabase =  () => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(con => {console.log("Mongoose connection successfully")})
}


module.exports = connectDatabase
const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
})
module.exports = mongoose.model('BlogPost', blogPostSchema);
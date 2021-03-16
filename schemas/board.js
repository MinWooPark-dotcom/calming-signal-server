const mongoose = require('mongoose');

const { Schema } = mongoose;
const boardSchema = new Schema({
  writer: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Board', boardSchema);
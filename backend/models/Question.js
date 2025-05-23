const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: {
    type: [String],
    validate: [arr => arr.length === 4, 'Exactly 4 options are required'],
    required: true
  },
  correctAnswer: {
    type: Number, // 1-based index (1, 2, 3, 4)
    required: true,
    min: 1,
    max: 4
  },
  adminName: { type: String, required: true },
  adminEmail: { type: String, required: true }
});

module.exports = mongoose.model('Question', questionSchema);
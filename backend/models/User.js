const mongoose = require('mongoose');

const quizHistorySchema = new mongoose.Schema({
  score: Number,
  date: { type: Date, default: Date.now },
  answers: Object, // Store user's answers for review if needed
  status: String,  // Pass/Fail/Rank 1
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Hashed password
  quizHistory: [quizHistorySchema], // Array of quiz attempts
});

module.exports = mongoose.model('User', userSchema);
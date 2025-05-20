const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://pranitkakan123:Quiz123@quiz-app.aen7vwx.mongodb.net/quizapp?retryWrites=true&w=majority&appName=Quiz-app',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
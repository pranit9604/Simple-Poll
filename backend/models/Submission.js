const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  score: Number,
  status: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
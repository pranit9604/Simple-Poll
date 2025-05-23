const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Add a new question
router.post('/questions', async (req, res) => {
  console.log('Received payload:', req.body); // Debug log

  const { text, options, correctAnswer, adminName, adminEmail } = req.body;

  // Robust validation
  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ message: 'Question text is required.' });
  }
  if (
    !Array.isArray(options) ||
    options.length !== 4 ||
    options.some((opt) => typeof opt !== 'string' || !opt.trim())
  ) {
    return res.status(400).json({ message: 'Exactly 4 non-empty options are required.' });
  }
  if (
    correctAnswer === undefined ||
    typeof correctAnswer !== 'number' ||
    correctAnswer < 1 ||
    correctAnswer > 4
  ) {
    return res.status(400).json({ message: 'Correct answer index must be 1, 2, 3, or 4.' });
  }
  if (!adminName || typeof adminName !== 'string' || !adminName.trim()) {
    return res.status(400).json({ message: 'Admin name is required.' });
  }
  if (!adminEmail || typeof adminEmail !== 'string' || !adminEmail.trim()) {
    return res.status(400).json({ message: 'Admin email is required.' });
  }

  try {
    const question = new Question({ text, options, correctAnswer, adminName, adminEmail });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a question
router.put('/questions/:id', async (req, res) => {
  const { text, options, correctAnswer } = req.body;
  if (!text || !options || options.length !== 3 || correctAnswer === undefined)
    return res.status(400).json({ message: 'Invalid question data' });
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { text, options, correctAnswer },
      { new: true, runValidators: true }
    );
    if (!question) return res.status(404).json({ message: 'Not found' });
    res.json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a question
router.delete('/questions/:id', async (req, res) => {
  const result = await Question.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
});

module.exports = router;
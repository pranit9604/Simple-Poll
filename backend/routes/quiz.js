const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

const correctAnswers = {
  1: "Library",
  2: "Libuv",
  3: "JavaScript XML",
  4: "Virtual DOM",
  5: "Component",
  6: "State",
  7: "Node Package Manager",
  8: "Hooks",
  9: "Single Page Application",
  10: "Props"
};

// POST /submit
router.post('/submit', async (req, res) => {
  const { name, email, answers } = req.body;
  if (!name || !email || !answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: 'Missing or invalid data' });
  }

  let score = 0;
  Object.entries(answers).forEach(([questionId, userAnswer]) => {
    if (correctAnswers[questionId]?.toLowerCase() === userAnswer.toLowerCase()) {
      score++;
    }
  });

  let status = 'Fail';
  if (score > 8) {
    status = 'Rank 1';
  } else if (score >= 4) {
    status = 'Pass';
  }

  try {
    await Submission.findOneAndUpdate(
      { email },
      { name, email, score, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const all = await Submission.find().sort({ score: -1 });
    const rank = all.findIndex(s => s.email === email) + 1;

    res.json({ score, rank, status });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /all-results
router.get('/all-results', async (req, res) => {
  try {
    const all = await Submission.find().sort({ score: -1 });
    const results = all.map((s, index) => ({
      name: s.name,
      email: s.email,
      score: s.score,
      rank: index + 1,
      status: s.status
    }));
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
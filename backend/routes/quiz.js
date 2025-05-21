const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

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
  10: "Props",
};

const TOTAL_QUESTIONS = Object.keys(correctAnswers).length;
const PASS_PERCENTAGE = 50;

// POST
router.post("/submit", async (req, res) => {
  const { name, email, answers } = req.body;

  if (
    !name ||
    !email ||
    !answers ||
    typeof answers !== "object" ||
    Object.keys(answers).length === 0
  ) {
    return res.status(400).json({ error: "Missing or invalid data" });
  }

  // Score calculation
  let score = 0;
  Object.entries(answers).forEach(([questionId, userAnswer]) => {
    if (
      correctAnswers[questionId]?.toLowerCase() === userAnswer.toLowerCase()
    ) {
      score++;
    }
  });

  const percentage = (score / TOTAL_QUESTIONS) * 100;
  const status = percentage >= PASS_PERCENTAGE ? "Pass" : "Fail";

  try {
    await Submission.findOneAndUpdate(
      { email },
      { name, email, score, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const allSubmissions = await Submission.find().sort({ score: -1 });
    const rank = allSubmissions.findIndex((sub) => sub.email === email) + 1;

    res.json({ score, rank, status });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// GET /all-results (with standard competition ranking logic)
router.get("/all-results", async (req, res) => {
  try {
    // Sort by score (descending) and submission time (ascending)
    const all = await Submission.find().sort({ score: -1, submittedAt: 1 });

    let results = [];
    let currentRank = 1;
    let prevScore = null;
    let sameScoreCount = 0;

    for (let i = 0; i < all.length; i++) {
      const s = all[i];

      if (s.score === prevScore) {
        // Keep current rank for same score
        sameScoreCount++;
      } else {
        // Update rank to new position
        currentRank = i + 1;
        sameScoreCount = 1;
      }

      results.push({
        name: s.name,
        email: s.email,
        score: s.score,
        status: s.status,
        rank: currentRank,
        submittedAt: s.submittedAt, //  timestamp
      });

      prevScore = s.score;
    }

    res.json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ error: "Database error" });
  }
});
module.exports = router;

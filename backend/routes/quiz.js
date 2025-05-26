const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const Question = require("../models/Question");

const PASS_PERCENTAGE = 50;

// POST /api/submit
router.post("/submit", async (req, res) => {
  const { name, email, answers } = req.body;

  console.log("Received submit payload:", { name, email, answers });

  if (
    !name ||
    !email ||
    !answers ||
    typeof answers !== "object" ||
    Object.keys(answers).length === 0
  ) {
    return res.status(400).json({ error: "Missing or invalid data" });
  }

  try {
    // Fetch all questions from DB
    const questions = await Question.find();
    const correctAnswersMap = {};
    questions.forEach((q) => {
      // Accept both 1-based and 0-based correctAnswer
      let correctIdx =
        typeof q.correctAnswer === "number"
          ? q.correctAnswer >= 1
            ? q.correctAnswer - 1
            : q.correctAnswer
          : 0;
      correctAnswersMap[q._id.toString()] = q.options[correctIdx];
    });

    console.log("Correct answers map:", correctAnswersMap);

    const TOTAL_QUESTIONS = questions.length;

    // Score calculation
    let score = 0;
    Object.entries(answers).forEach(([questionId, userAnswer]) => {
      if (
        correctAnswersMap[questionId] &&
        correctAnswersMap[questionId].toLowerCase().trim() ===
          userAnswer.toLowerCase().trim()
      ) {
        score++;
      }
    });

    const percentage = (score / TOTAL_QUESTIONS) * 100;
    const status = percentage >= PASS_PERCENTAGE ? "Pass" : "Fail";

    await Submission.findOneAndUpdate(
      { email },
      { name, email, score, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const allSubmissions = await Submission.find().sort({ score: -1 });
    const rank = allSubmissions.findIndex((sub) => sub.email === email) + 1;

    res.json({ score, rank, status });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// GET api -all-result
router.get("/all-results", async (req, res) => {
  try {
    const all = await Submission.find().sort({ score: -1, submittedAt: 1 });

    let results = [];
    let currentRank = 1;
    let prevScore = null;
    let sameScoreCount = 0;

    for (let i = 0; i < all.length; i++) {
      const s = all[i];

      if (s.score === prevScore) {
        sameScoreCount++;
      } else {
        currentRank = i + 1;
        sameScoreCount = 1;
      }

      results.push({
        name: s.name,
        email: s.email,
        score: s.score,
        status: s.status,
        rank: currentRank,
        submittedAt: s.submittedAt,
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

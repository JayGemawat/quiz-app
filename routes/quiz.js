const express = require("express");
const axios = require("axios");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/start", async (req, res) => {
  try {
    const username = req.query.username || "Guest";
    const response = await axios.get("https://opentdb.com/api.php?amount=15&type=multiple");
    const questions = response.data.results;
    res.render("quiz", { title: "Quiz", questions, username });
  } catch (error) {
    res.send("Error fetching quiz questions.");
  }
});

router.post("/submit", async (req, res) => {
  const userAnswers = req.body;

  let questions;
  try {
   questions = JSON.parse(userAnswers.questions);

  } catch (err) {
    console.error("JSON decode/parse error:", err.message);
    return res.status(400).send("Invalid question data.");
  }

  let score = 0;

  questions.forEach((q, index) => {
    const correct = q.correct_answer;
    const userAnswer = userAnswers[`q${index}`];
    if (userAnswer === correct) score++;
  });

  const username = userAnswers.username || "Guest";

  try {
    await db.query("INSERT INTO results (username, score) VALUES ($1, $2)", [username, score]);
  } catch (err) {
    console.error("DB Insert Error:", err);
  }

  res.render("result", {
  title: "Your Score",
  score,
  total: questions.length,
  questions,
  userAnswers
});

});


module.exports = router;

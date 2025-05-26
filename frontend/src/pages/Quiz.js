//

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "../components/QuestionList";
import { submitAnswers } from "../services/quizService";
import "../PagesStyles/Quiz.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/questions`);
        const data = await res.json();
        const formatted = data.map((q) => ({
          id: q._id,
          question: q.text,
          options: q.options,
        }));
        setQuestions(formatted);
      } catch (err) {
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleQuizSubmit = async (answers) => {
    try {
      const data = { name, email, answers };
      const result = await submitAnswers(data);
      navigate("/result", { state: { name, email, ...result } });
    } catch (error) {
      alert("Failed to submit quiz. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="quiz-wrapper">
        <div>Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="quiz-wrapper">
      <div className="quiz-header">
        <h1 className="quiz-welcome">Welcome,</h1>
        <h2 className="quiz-name">{name}</h2>
        <p className="quiz-email">{email}</p>
      </div>
      <div className="quiz-card">
        <h2 className="quiz-heading">Quiz Questions</h2>

        <div
          style={{
            border: "1.5px solid #e0e0e0",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            padding: "24px 18px",
            marginTop: "18px",
            background: "#fff",
          }}
        >
          <QuestionList questions={questions} onSubmit={handleQuizSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Quiz;

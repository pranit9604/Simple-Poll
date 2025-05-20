import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionList from '../components/QuestionList';
import { questions } from '../constants/Questions';
import { submitAnswers } from '../services/quizService';
import '../PagesStyles/Quiz.css';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email } = location.state || {};

  const handleQuizSubmit = async (answers) => {
    try {
      const data = { name, email, answers };
      const result = await submitAnswers(data);
      navigate('/result', { state: { name, email, ...result } });
    } catch (error) {
      alert('Failed to submit quiz. Please try again.');
    }
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-header">
        <h1 className="quiz-welcome">Welcome,</h1>
        <h2 className="quiz-name">{name}</h2>
        <p className="quiz-email">{email}</p>
      </div>
      <div className="quiz-card">
        <h2 className="quiz-heading">Quiz Questions</h2>
        <QuestionList questions={questions} onSubmit={handleQuizSubmit} />
      </div>
    </div>
  );
};

export default Quiz;
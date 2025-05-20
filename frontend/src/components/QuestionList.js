import React, { useState } from 'react';
import '../ComponentsStyles/QuestionList.css';

const QuestionList = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questions.some((q) => !answers[q.id])) {
      setError('All questions are mandatory');
    } else {
      setError('');
      onSubmit(answers);
    }
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      {questions.map((q) => (
        <div key={q.id} className="question-block">
          <p className="question-text">{q.question}</p>
          {q.options.map((opt) => (
            <label key={opt} className="option-label">
              <input
                type="radio"
                name={`q${q.id}`}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleSelect(q.id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button type="submit" className="submit-btn">
        Submit Answers
      </button>
      {error && <p className="question-error">{error}</p>}
    </form>
  );
};

export default QuestionList;
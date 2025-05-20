import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../PagesStyles/Result.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, score, rank, status } = location.state || {};

  const handleViewAllResults = () => {
    navigate('/all-results');
  };

  return (
    <div className="result-wrapper">
      <div className="result-card">
        <h2 className="result-heading">Your Result</h2>
        <p className="result-text"><strong>Name:</strong> {name}</p>
        <p className="result-text"><strong>Email:</strong> {email}</p>
        <p className="result-text"><strong>Score:</strong> {score}</p>
        <p className="result-text"><strong>Rank:</strong> {rank}</p>
        <p className="result-text"><strong>Status:</strong> {status}</p>
        <button
          onClick={handleViewAllResults}
          className="result-btn"
        >
          View All Results
        </button>
      </div>
    </div>
  );
};

export default Result;
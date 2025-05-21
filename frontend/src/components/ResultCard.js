import React from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentsStyles/ResultCard.css";

const ResultCard = ({ name, email, score, rank, status }) => {
  const navigate = useNavigate();

  const handleViewAllResults = () => {
    navigate("/all-results");
  };

  return (
    <div className="result-card">
      <h2 className="result-card-heading">Your Result</h2>
      <p className="result-card-text">
        <strong>Name:</strong> {name}
      </p>
      <p className="result-card-text">
        <strong>Email:</strong> {email}
      </p>
      <p className="result-card-text">
        <strong>Score:</strong> {score}
      </p>
      <p className="result-card-text">
        <strong>Rank:</strong> {rank}
      </p>
      <p className="result-card-text">
        <strong>Status:</strong> {status}
      </p>
      <button onClick={handleViewAllResults} className="result-card-btn">
        View All Results
      </button>
    </div>
  );
};

export default ResultCard;

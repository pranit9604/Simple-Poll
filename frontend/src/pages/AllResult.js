import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllResults } from "../services/quizService";
import "../PagesStyles/AllResult.css";

const AllResult = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResults = async () => {
      try {
        const data = await fetchAllResults();
        console.log("Frontend data received:", data);
        setResults(data);
      } catch (err) {
        setError("Failed to fetch results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getResults();
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (loading) return <div className="loading">Loading results...</div>;

  return (
    <div className="all-results-wrapper">
      <div className="all-results-card">
        <div className="header-section">
          <button className="home-button" onClick={handleHomeClick}>
            🏠 Back to Registration
          </button>
          <h2 className="all-results-heading">All Results</h2>
        </div>
        {error && <p className="all-results-error">{error}</p>}
        {results.length > 0 ? (
          <table className="all-results-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Email</th>
                <th>Score</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => {
                const { date, time } = formatDateTime(result.submittedAt);
                return (
                  <tr key={index}>
                    <td>
                      {result.rank === 1 ? (
                        <span className="rank-badge">⭐ Rank 1</span>
                      ) : (
                        `Rank ${result.rank}`
                      )}
                    </td>
                    <td>{result.name}</td>
                    <td>{result.email}</td>
                    <td>{result.score}</td>
                    <td>
                      <span className={`status-${result.status.toLowerCase()}`}>
                        {result.status}
                      </span>
                    </td>
                    <td>{date}</td>
                    <td>{time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="no-results">No results available.</p>
        )}
      </div>
    </div>
  );
};

export default AllResult;

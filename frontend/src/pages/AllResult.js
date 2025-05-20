import React, { useState, useEffect } from 'react';
import { fetchAllResults } from '../services/quizService';
import '../PagesStyles/AllResult.css';

const AllResult = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const passMarks  = 5
  useEffect(() => {
    const getResults = async () => {
      try {
        const data = await fetchAllResults();
        setResults(data);
      } catch (err) {
        setError('Failed to fetch results. Please try again later.');
      }
    };
    getResults();
  }, []);

  return (
    <div className="all-results-wrapper">
      <div className="all-results-card">
        <h2 className="all-results-heading">All Results</h2>
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
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className={index === 0 ? 'top-rank' : ''}>
                  <td>
                    {index === 0 ? (
                      <span className="rank-badge">⭐ Rank 1</span>
                    ) : (
                      `Rank ${result.rank}`
                    )}
                  </td>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.score}</td>
                  <td>{result.status}</td>
                </tr>
              ))}
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
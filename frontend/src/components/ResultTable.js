import React from "react";
import "../ComponentsStyles/ResultTable.css";

const ResultTable = ({ results }) => {
  if (!results || results.length === 0) {
    return <p className="no-results">No results available.</p>;
  }

  return (
    <table className="result-table">
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
          <tr key={index} className={index === 0 ? "top-rank" : ""}>
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
  );
};

export default ResultTable;

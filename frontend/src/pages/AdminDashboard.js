import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../ComponentsStyles/RegistrationForm.css";

const API_BASE_URL = "http://localhost:5000";

function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const adminName = localStorage.getItem("adminName") || "";
  const adminEmail = localStorage.getItem("adminEmail") || "";
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/questions`);
    setQuestions(res.data);
  };

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!text.trim()) {
      setError("Question text is required.");
      return;
    }
    if (options.length !== 4 || options.some((opt) => !opt.trim())) {
      setError("All 4 options are required.");
      return;
    }
    if (
      correctAnswer === "" ||
      isNaN(Number(correctAnswer)) ||
      Number(correctAnswer) < 1 ||
      Number(correctAnswer) > 4
    ) {
      setError("Correct answer must be 1, 2, 3, or 4.");
      return;
    }
    if (!adminName || !adminEmail) {
      setError("Admin info missing. Please login again.");
      return;
    }
    const payload = {
      text: text.trim(),
      options: options.map((opt) => opt.trim()),
      correctAnswer: Number(correctAnswer), // 1-based index
      adminName: adminName.trim(),
      adminEmail: adminEmail.trim(),
    };
    try {
      if (editId) {
        await axios.put(`${API_BASE_URL}/api/questions/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/questions`, payload);
      }
      setText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      fetchQuestions();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to add question"
      );
    }
  };

  const handleEdit = (q) => {
    setEditId(q._id);
    setText(q.text);
    setOptions(q.options);
    setCorrectAnswer(q.correctAnswer);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/api/questions/${id}`);
    fetchQuestions();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1597f2",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Centered form with buttons at top corners */}
        <div style={{ position: "relative", width: "100%", maxWidth: 450 }}>
          {/* Top left button */}
          <button
            type="button"
            className="start-quiz-btn"
            onClick={() => navigate("/admin-login")}
            style={{
              position: "absolute",
              top: "-48px",
              left: "0",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "bold",
              background: "#28a745",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              padding: "8px 18px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <span role="img" aria-label="home">
              🏠
            </span>
            Back to Admin Login
          </button>
          {/* Top right button */}
          <button
            type="button"
            className="start-quiz-btn"
            onClick={() => navigate("/")}
            style={{
              position: "absolute",
              top: "-48px",
              right: "0",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "bold",
              background: "#28a745",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              padding: "8px 18px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <span role="img" aria-label="home">
              🏠
            </span>
            Back to Registration
          </button>
          <form className="registration-form" onSubmit={handleSubmit}>
            <h2 className="registration-heading">
              {editId ? "Edit Question" : "Add New Question"}
            </h2>
            <input
              type="text"
              placeholder="Question"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="registration-input"
              required
            />
            {options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="registration-input"
                required
              />
            ))}
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="registration-input"
              required
            >
              <option value="">Correct Option (1-4)</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </select>
            <button type="submit" className="start-quiz-btn">
              {editId ? "Update" : "Add"} Question
            </button>
            {error && <div className="registration-error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

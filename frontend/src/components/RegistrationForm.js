import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentsStyles/RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email } = formData;
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
    } else {
      setError("");
      navigate("/quiz", { state: formData });
    }
  };

  const handleViewAllResults = () => {
    navigate("/all-results");
  };

  return (
    <div className="registration-wrapper">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 className="registration-heading">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="registration-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="registration-input"
        />
        <button type="submit" className="start-quiz-btn">
          Start Quiz
        </button>
        <button
          type="button"
          onClick={handleViewAllResults}
          className="view-results-btn"
        >
          View All Results
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin-login")}
          className="admin-login-btn"
        >
          Admin Login
        </button>
        {error && <p className="registration-error">{error}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;

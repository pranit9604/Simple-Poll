import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../ComponentsStyles/RegistrationForm.css";

const API_BASE_URL = "http://localhost:5000";

function AdminLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        name,
        email,
      });
      // Store admin info in localStorage
      localStorage.setItem("adminName", name);
      localStorage.setItem("adminEmail", email);
      navigate("/admin-dashboard");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="registration-wrapper">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 className="registration-heading">Admin Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="registration-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="registration-input"
          required
        />
        <button type="submit" className="start-quiz-btn">
          Login
        </button>
        {error && <div className="registration-error">{error}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;

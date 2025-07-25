// src/pages/RegisterPage.tsx

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/AuthForm.css";
import { useNavigate } from "react-router-dom";

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <p className="title">Sign Up</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder=""
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=""
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        {error && <div style={{ color: "#f87171", marginBottom: 8 }}>{error}</div>}
        <button className="sign" type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
      </form>
      <div className="social-message">
        <div className="line"></div>
        <p className="message">Sign up with social accounts</p>
        <div className="line"></div>
      </div>
      <div className="social-icons">
        <button aria-label="Sign up with Google" className="icon">
          {/* Google SVG */}
        </button>
        <button aria-label="Sign up with Twitter" className="icon">
          {/* Twitter SVG */}
        </button>
        <button aria-label="Sign up with GitHub" className="icon">
          {/* GitHub SVG */}
        </button>
      </div>
      <p className="signup">Already have an account?
        <a rel="noopener noreferrer" href="/login" className="">Login</a>
      </p>
    </div>
  );
};

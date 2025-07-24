// src/pages/LoginPage.tsx

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/AuthForm.css";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      // Redirect or show success here
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <p className="title">Login</p>
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
            autoComplete="current-password"
          />
          <div className="forgot">
            <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
          </div>
        </div>
        {error && <div style={{ color: "#f87171", marginBottom: 8 }}>{error}</div>}
        <button className="sign" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      </form>
      <div className="social-message">
        <div className="line"></div>
        <p className="message">Login with social accounts</p>
        <div className="line"></div>
      </div>
      <div className="social-icons">
        <button aria-label="Log in with Google" className="icon">
          {/* Google SVG */}
        </button>
        <button aria-label="Log in with Twitter" className="icon">
          {/* Twitter SVG */}
        </button>
        <button aria-label="Log in with GitHub" className="icon">
          {/* GitHub SVG */}
        </button>
      </div>
      <p className="signup">Don't have an account?
        <a rel="noopener noreferrer" href="/register" className="">Sign up</a>
      </p>
    </div>
  );
};

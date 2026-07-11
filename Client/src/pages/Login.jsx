import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPlane } from "react-icons/fa";
import api from "../services/api";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful");

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-brand-panel">
        <div className="auth-brand-content">
          <div className="auth-logo">
            <div className="auth-logo-badge"><FaPlane /></div>
            <span>Travel AI</span>
          </div>

          <h1>Plan smarter trips, in seconds.</h1>
          <p>
            Upload a document and let AI build your full itinerary,
            budget, and places to explore — automatically.
          </p>

          <ul className="auth-feature-list">
            <li>✓ AI-generated day-by-day itineraries</li>
            <li>✓ Automatic budget estimates</li>
            <li>✓ Chat with an assistant about your trip</li>
          </ul>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-wrapper">

          <div className="auth-mobile-logo">
            <div className="auth-logo-badge"><FaPlane /></div>
            <span>Travel AI</span>
          </div>

          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Log in to continue planning your trips</p>

          <form onSubmit={handleLogin}>

            <div className="auth-field">
              <label>Email</label>
              <div className="auth-input-group">
                <FaEnvelope className="auth-input-icon" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-group">
                <FaLock className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
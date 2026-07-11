import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaPlane } from "react-icons/fa";
import api from "../services/api";
import "../styles/auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });

      toast.success("Registration Successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration Failed");
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

          <h1>Your next trip, planned in minutes.</h1>
          <p>
            Create an account and start turning tickets and bookings
            into complete, ready-to-follow itineraries.
          </p>

          <ul className="auth-feature-list">
            <li>✓ Free to get started</li>
            <li>✓ No manual planning needed</li>
            <li>✓ Export and share instantly</li>
          </ul>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-wrapper">

          <div className="auth-mobile-logo">
            <div className="auth-logo-badge"><FaPlane /></div>
            <span>Travel AI</span>
          </div>

          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">Start planning your trips with AI</p>

          <form onSubmit={handleRegister}>

            <div className="auth-field">
              <label>Full Name</label>
              <div className="auth-input-group">
                <FaUser className="auth-input-icon" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/">Log in</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;
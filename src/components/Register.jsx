import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Iltimos, email kiriting");
      return;
    }
    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }
    if (password !== confirmPassword) {
      setError("Parollar bir-biriga mos emas");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, displayName.trim() || undefined);
      navigate("/");
    } catch (err) {
      const msg = err.message?.toLowerCase() || "";
      if (msg.includes("already registered") || msg.includes("already exists")) {
        setError("Bu email allaqachon ro'yxatdan o'tgan");
      } else if (msg.includes("invalid email")) {
        setError("Email formati noto'g'ri");
      } else if (msg.includes("weak password") || msg.includes("password")) {
        setError("Parol juda oddiy. Kamida 6 ta belgi");
      } else {
        setError("Ro'yxatdan o'tishda xatolik: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">📚</div>
          <h1>Fe'llar Masteri</h1>
          <p className="auth-subtitle">Yangi hisob yarating</p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="displayName">Ismingiz (ixtiyoriy)</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="John Doe"
              autoComplete="name"
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Parol</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kamida 6 ta belgi"
              autoComplete="new-password"
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword">Parolni takrorlang</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-submit"
            disabled={loading}
          >
            {loading ? "Ro'yxatdan o'tish..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <p className="auth-footer-text">
          Hisobingiz bormi?{" "}
          <Link to="/login" className="auth-link">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}

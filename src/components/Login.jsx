import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Iltimos, email va parolni kiriting");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const msg = err.message?.toLowerCase() || "";
      if (msg.includes("invalid login credentials") || msg.includes("invalid email")) {
        setError("Email yoki parol noto'g'ri");
      } else if (msg.includes("email not confirmed")) {
        setError("Email tasdiqlanmagan. Pochtangizni tekshiring");
      } else if (msg.includes("rate limit")) {
        setError("Ko'p urinishlar. Birozdan so'ng qayta urinib ko'ring");
      } else {
        setError("Kirishda xatolik: " + err.message);
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
          <p className="auth-subtitle">Hisobingizga kiring</p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
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
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-submit"
            disabled={loading}
          >
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </form>

        <p className="auth-footer-text">
          Hisobingiz yo'qmi?{" "}
          <Link to="/register" className="auth-link">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  );
}

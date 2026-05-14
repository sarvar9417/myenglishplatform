import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loadUserStats } from "../services/userService";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (open && user) {
      loadUserStats(user.id).then(setStats);
    }
  }, [open, user]);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/login");
  };

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="profile-container" ref={menuRef}>
      <button
        className="profile-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Profil menyusi"
        title={displayName}
      >
        <span className="profile-avatar">{initial}</span>
        <span className="profile-name">{displayName}</span>
        <svg
          className={`profile-chevron ${open ? "open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="profile-menu">
          <div className="profile-menu-header">
            <span className="profile-menu-email">{user?.email}</span>
          </div>

          {stats && (
            <div className="profile-menu-stats">
              <div className="profile-stat-row">
                <span>🎮 O'yinlar</span>
                <span className="profile-stat-val">{stats.gamesPlayed}</span>
              </div>
              <div className="profile-stat-row">
                <span>🏆 Eng yaxshi</span>
                <span className="profile-stat-val">{stats.bestScore}/10</span>
              </div>
              <div className="profile-stat-row">
                <span>🎯 Aniqlik</span>
                <span className="profile-stat-val">
                  {stats.totalQuestions > 0
                    ? `${Math.round((stats.totalCorrect / stats.totalQuestions) * 100)}%`
                    : "—"}
                </span>
              </div>
            </div>
          )}

          <button className="profile-logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Chiqish
          </button>
        </div>
      )}
    </div>
  );
}

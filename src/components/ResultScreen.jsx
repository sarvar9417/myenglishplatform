import { useEffect, useState } from "react";

function generateComment(score, total) {
  const pct = score / total;
  if (pct === 1) return { text: "Mukammal natija! Siz haqiqiy ustozsiz! 🏆", emoji: "🏆" };
  if (pct >= 0.8) return { text: "Juda yaxshi! Bir oz mashq bilan 100% bo'ladi. 👏", emoji: "👏" };
  if (pct >= 0.5) return { text: "Yomon emas, lekin xatolarni tahlil qiling. 💪", emoji: "💪" };
  return { text: "Taslim bo'lmang! Xatolardan o'rganing. 📚", emoji: "📚" };
}

function createConfetti() {
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"];
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));
}

export default function ResultScreen({
  score,
  questionsCount,
  mistakes,
  stats,
  onRestart,
  onModeSelect,
  onResetStats,
}) {
  const [confetti, setConfetti] = useState([]);
  const comment = generateComment(score, questionsCount);
  const isPerfect = score === questionsCount;
  const pct = Math.round((score / questionsCount) * 100);

  useEffect(() => {
    if (isPerfect) {
      setConfetti(createConfetti());
    }
  }, [isPerfect]);

  const scoreColor =
    pct === 100 ? "var(--success)" : pct >= 80 ? "var(--primary)" : pct >= 50 ? "#f59e0b" : "var(--error)";

  return (
    <div className="result-screen-content">
      {/* Confetti overlay */}
      {confetti.length > 0 && (
        <div className="confetti-container" aria-hidden="true">
          {confetti.map((c) => (
            <div
              key={c.id}
              className="confetti-piece"
              style={{
                left: `${c.left}%`,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.duration}s`,
                backgroundColor: c.color,
                width: `${c.size}px`,
                height: `${c.size}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                transform: `rotate(${c.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="result-header">
        <div className="score-circle" style={{ background: scoreColor, boxShadow: `0 10px 15px -3px ${scoreColor}40` }}>
          {score}/{questionsCount}
        </div>
        <div className="score-percentage">{pct}% to'g'ri</div>
        <h2>{comment.emoji} Natija</h2>
        <p className="result-comment">{comment.text}</p>
      </div>

      {/* Session Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <span className="stat-value">{score}</span>
          <span className="stat-label">To'g'ri</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">❌</span>
          <span className="stat-value">{questionsCount - score}</span>
          <span className="stat-label">Xato</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <span className="stat-value">{pct}%</span>
          <span className="stat-label">Natija</span>
        </div>
      </div>

      {/* Overall Stats */}
      {stats.gamesPlayed > 0 && (
        <div className="overall-stats">
          <div className="review-title">📈 Umumiy Statistika</div>
          <div className="stats-grid stats-grid-small">
            <div className="stat-card stat-card-small">
              <span className="stat-label">O'yinlar</span>
              <span className="stat-value">{stats.gamesPlayed}</span>
            </div>
            <div className="stat-card stat-card-small">
              <span className="stat-label">Eng yaxshi</span>
              <span className="stat-value">
                {stats.bestScore}/{questionsCount}
              </span>
            </div>
            <div className="stat-card stat-card-small">
              <span className="stat-label">Aniqlik</span>
              <span className="stat-value">
                {stats.totalQuestions > 0
                  ? `${Math.round((stats.totalCorrect / stats.totalQuestions) * 100)}%`
                  : "—"}
              </span>
            </div>
          </div>
          <button className="btn btn-text" onClick={onResetStats}>
            Statistikani tozalash
          </button>
        </div>
      )}

      {/* Mistakes Review */}
      {mistakes.length > 0 && (
        <div className="review-section">
          <div className="review-title">❌ Xatolar Tahlili</div>
          <div className="review-list">
            {mistakes.map((item, idx) => (
              <div className="review-item" key={idx}>
                <div className="review-item-header">
                  <span className="review-uz">{item.uz}</span>
                  <span className="review-status status-wrong">XATO</span>
                </div>
                <div className="review-details">
                  <div className="detail-box">
                    <span className="detail-label">V1</span>
                    <span className="detail-val val-correct">{item.v1}</span>
                  </div>
                  <div className="detail-box">
                    <span className="detail-label">V2</span>
                    <span className="detail-val val-correct">{item.v2}</span>
                  </div>
                  <div className="detail-box">
                    <span className="detail-label">V3</span>
                    <span className="detail-val val-correct">{item.v3}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="action-buttons">
        <button className="btn btn-primary btn-lg" onClick={onRestart}>
          Shu Rejimda Qayta Boshlash
        </button>
        <button className="btn btn-secondary btn-lg" onClick={onModeSelect}>
          Boshqa Rejim Tanlash
        </button>
      </div>
    </div>
  );
}

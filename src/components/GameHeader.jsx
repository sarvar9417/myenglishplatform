import { modeNames } from "../utils/validation";

export default function GameHeader({ currentMode, currentIndex, score, questionsCount, onModeSelect }) {
  const progress = ((currentIndex + 1) / questionsCount) * 100;

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="btn-back"
          onClick={onModeSelect}
          aria-label="Bosh sahifaga qaytish"
          title="Bosh sahifaga qaytish"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="btn-back-text">Chiqish</span>
        </button>
        <div className="mode-badge">{modeNames[currentMode]}</div>
      </div>

      <div className="header-center">
        <div className="progress-bar-container" title={`${currentIndex + 1} / ${questionsCount}`}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          <span className="progress-text">
            {currentIndex + 1}/{questionsCount}
          </span>
        </div>
      </div>

      <div className="header-right">
        <div className="score-display">
          <span className="score-label">Ball</span>
          <span className="score-value">{score}</span>
        </div>
      </div>
    </header>
  );
}

import { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Login & Register vaqtincha o'chirilgan
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import GameHeader from "./components/GameHeader";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import VocabularyScreen from "./components/VocabularyScreen";
import GrammarScreen from "./components/GrammarScreen";
import DailyTestScreen from "./components/DailyTestScreen";
import useGame from "./hooks/useGame";
import "./App.css";

// --- Error Boundary ---
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-container">
          <div className="content-area" style={{ textAlign: "center", padding: "60px 30px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>⚠️</div>
            <h2>Xatolik yuz berdi</h2>
            <p style={{ color: "var(--text-muted)", margin: "10px 0 20px" }}>
              {this.state.error?.message || "Noma'lum xatolik"}
            </p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Qayta yuklash
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Home Redirect ---
function HomeRedirect() {
  return <Navigate to="/play" replace />;
}

// --- Verbs Game (existing game) ---
function VerbsGame() {
  const game = useGame();

  return (
    <div className="app-container">
      {game.screen === "game" && (
        <GameHeader
          currentMode={game.currentMode}
          currentIndex={game.currentIndex}
          score={game.score}
          questionsCount={game.questionsCount}
          onModeSelect={game.goToModeSelect}
        />
      )}

      <div className="content-area">
        {game.screen === "mode" && (
          <div className="verbs-mode-select">
            <div className="verbs-mode-header">
              <button className="btn-back" onClick={() => window.history.back()}>
                ← Orqaga
              </button>
              <h2>📝 Fe'llar Masteri</h2>
              <div />
            </div>
            <p className="mode-prompt">Boshlash uchun rejimni tanlang:</p>
            <div className="mode-options">
              {[
                { id: 1, icon: "📝", title: "To'liq Yozish", desc: "O'zbekcha so'z beriladi, 3 ta shaklni yozasiz.", color: "#6366f1", bg: "#eef2ff" },
                { id: 2, icon: "🧩", title: "Topish (Hard)", desc: "Tasodifiy bitta inglizcha shakl beriladi.", color: "#ec4899", bg: "#fdf2f8" },
                { id: 3, icon: "⚡", title: "Tezkor (V1 → V2/V3)", desc: "Faqat Infinitive beriladi.", color: "#f59e0b", bg: "#fffbeb" },
              ].map((m) => (
                <button key={m.id} className="mode-btn" onClick={() => game.startGame(m.id)}
                  style={{ "--mode-color": m.color, "--mode-bg": m.bg }}>
                  <div className="mode-icon" style={{ background: m.bg }}>{m.icon}</div>
                  <div className="mode-info">
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                  <div className="mode-arrow">→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {game.screen === "game" && game.gameQueue.length > 0 && (
          <GameScreen
            key={`q-${game.currentIndex}`}
            item={game.gameQueue[game.currentIndex]}
            currentMode={game.currentMode}
            onCheck={game.handleCheck}
            onNext={game.handleNext}
            checked={game.checked}
            isCorrect={game.isCorrect}
            isTransitioning={game.isTransitioning}
          />
        )}

        {game.screen === "result" && (
          <ResultScreen
            score={game.score}
            questionsCount={game.questionsCount}
            mistakes={game.mistakes}
            stats={game.stats}
            onRestart={game.restartCurrentMode}
            onModeSelect={game.goToModeSelect}
            onResetStats={game.resetStats}
          />
        )}
      </div>
    </div>
  );
}

// --- App ---
export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        {/* Login va Register sahifalari vaqtincha o'chirilgan */}

        <Route
          path="/play"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <div className="content-area">
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/play/verbs"
          element={
            <ProtectedRoute>
              <VerbsGame />
            </ProtectedRoute>
          }
        />

        <Route
          path="/play/vocabulary"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <div className="content-area">
                  <VocabularyScreen />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/play/grammar"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <div className="content-area">
                  <GrammarScreen />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/play/daily"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <div className="content-area">
                  <DailyTestScreen />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

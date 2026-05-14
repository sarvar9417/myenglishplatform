import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import vocabularyDB, { getAllCategories, getWordsByCategory } from "../data/vocabulary";
import { updateVocabularyProgress, loadVocabularyProgress } from "../services/userService";
import { useAuth } from "../context/AuthContext";

export default function VocabularyScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("browse"); // browse | quiz
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [progress, setProgress] = useState({});
  const [quizWords, setQuizWords] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizShown, setQuizShown] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = getAllCategories();

  useEffect(() => {
    if (user) {
      loadVocabularyProgress(user.id).then(setProgress);
    }
  }, [user]);

  const startQuiz = (category) => {
    const words = category ? getWordsByCategory(category) : [...vocabularyDB];
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizWords(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizDone(false);
    setQuizShown(true);
    setQuizResult(null);
    setQuizAnswer("");
    setShowAnswer(false);
  };

  const handleQuizSubmit = () => {
    const word = quizWords[quizIndex];
    const correct = word.en.toLowerCase() === quizAnswer.trim().toLowerCase();
    setQuizResult(correct);
    if (correct) setQuizScore((s) => s + 1);
    if (user) {
      updateVocabularyProgress(user.id, word.en, correct);
    }
  };

  const handleQuizNext = () => {
    if (quizIndex + 1 < quizWords.length) {
      setQuizIndex((i) => i + 1);
      setQuizResult(null);
      setQuizAnswer("");
      setShowAnswer(false);
    } else {
      setQuizDone(true);
    }
  };

  const getWordStatus = (word) => {
    const p = progress[word.en];
    if (!p) return "new";
    if (p.correct >= 3) return "learned";
    if (p.attempts >= 2) return "learning";
    return "new";
  };

  // Browse mode
  if (!quizShown) {
    return (
      <div className="vocab-screen">
        <div className="vocab-header">
          <button className="btn-back" onClick={() => navigate("/play")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Orqaga
          </button>
          <h2>📖 So'z Boyligi</h2>
          <div />
        </div>

        <div className="vocab-tabs">
          <button className={`vocab-tab ${tab === "browse" ? "active" : ""}`} onClick={() => setTab("browse")}>
            📂 Kategoriyalar
          </button>
          <button className={`vocab-tab ${tab === "quiz" ? "active" : ""}`} onClick={() => setTab("quiz")}>
            🎯 Tezkor Test
          </button>
        </div>

        {tab === "browse" ? (
          <div className="vocab-categories">
            {categories.map((cat) => {
              const words = getWordsByCategory(cat);
              const learned = words.filter((w) => getWordStatus(w) === "learned").length;
              return (
                <button
                  key={cat}
                  className="vocab-category-card"
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  style={{
                    borderColor: selectedCategory === cat ? "var(--primary)" : "var(--border-light)",
                  }}
                >
                  <div className="vocab-cat-header">
                    <span className="vocab-cat-name">{cat}</span>
                    <span className="vocab-cat-count">{words.length} ta so'z</span>
                  </div>
                  <div className="vocab-cat-progress">
                    <div className="vocab-cat-bar">
                      <div
                        className="vocab-cat-bar-fill"
                        style={{ width: `${(learned / words.length) * 100}%` }}
                      />
                    </div>
                    <span className="vocab-cat-learned">{learned}/{words.length}</span>
                  </div>
                  {selectedCategory === cat && (
                    <div className="vocab-cat-expanded">
                      <div className="vocab-word-list">
                        {words.map((w, i) => (
                          <div key={i} className={`vocab-word-item ${getWordStatus(w)}`}>
                            <div className="vocab-word-main">
                              <span className="vocab-word-en">{w.en}</span>
                              <span className="vocab-word-uz">{w.uz}</span>
                            </div>
                            <span className="vocab-word-example">{w.example}</span>
                          </div>
                        ))}
                      </div>
                      <button className="btn btn-primary" onClick={() => startQuiz(cat)} style={{ marginTop: 16 }}>
                        Shu kategoriyadan test
                      </button>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="vocab-quick-quiz">
            <p className="vocab-quiz-desc">Barcha so'zlardan 10 ta tasodifiy test</p>
            <button className="btn btn-primary btn-lg" onClick={() => startQuiz(null)}>
              🎯 Testni boshlash
            </button>
          </div>
        )}
      </div>
    );
  }

  // Quiz mode
  if (quizDone) {
    return (
      <div className="vocab-screen">
        <div className="vocab-result">
          <div className="score-circle" style={{ background: quizScore === 10 ? "var(--success)" : "var(--primary)" }}>
            {quizScore}/{quizWords.length}
          </div>
          <h2>📖 So'z boyligi testi</h2>
          <p className="result-comment">
            {quizScore === 10
              ? "Mukammal! Barcha so'zlarni bilasiz!"
              : quizScore >= 7
                ? "Juda yaxshi! Davom eting!"
                : "Ko'proq mashq qiling!"}
          </p>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => setQuizShown(false)}>
              Kategoriyalarga qaytish
            </button>
            <button className="btn btn-secondary" onClick={() => startQuiz(selectedCategory)}>
              Qayta urinish
            </button>
          </div>
        </div>
      </div>
    );
  }

  const word = quizWords[quizIndex];
  return (
    <div className="vocab-screen">
      <div className="vocab-header">
        <button className="btn-back" onClick={() => setQuizShown(false)}>
          ← To'xtatish
        </button>
        <span className="vocab-progress">{quizIndex + 1}/{quizWords.length}</span>
        <span className="vocab-score">Ball: {quizScore}</span>
      </div>

      <div className="vocab-quiz-card">
        <div className="vocab-quiz-question">
          <span className="label-text">O'zbekcha so'z</span>
          <div className="main-word">{word.uz}</div>
          <span className="sub-hint">Inglizcha tarjimasini yozing</span>
        </div>

        {!quizResult ? (
          <div className="vocab-quiz-input-area">
            <input
              ref={inputRef}
              type="text"
              className="vocab-quiz-input"
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && quizAnswer.trim()) handleQuizSubmit();
              }}
              placeholder="Inglizcha so'zni yozing..."
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
            {showAnswer && (
              <div className="vocab-quiz-hint">
                💡 Javob: <strong>{word.en}</strong>
              </div>
            )}
            <div className="vocab-quiz-actions">
              <button className="btn btn-text" onClick={() => setShowAnswer(true)}>
                Javobni ko'rsat
              </button>
              <button
                className="btn btn-primary"
                onClick={handleQuizSubmit}
                disabled={!quizAnswer.trim()}
              >
                Tekshirish
              </button>
            </div>
          </div>
        ) : (
          <div className="vocab-quiz-feedback">
            <div className={`vocab-quiz-result ${quizResult ? "correct" : "incorrect"}`}>
              {quizResult ? "✅ To'g'ri!" : `❌ Xato. To'g'ri javob: ${word.en}`}
            </div>
            <div className="vocab-quiz-uz">
              <strong>{word.en}</strong> — {word.uz}
              <div className="vocab-word-example" style={{ marginTop: 8 }}>{word.example}</div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleQuizNext}>
              {quizIndex + 1 < quizWords.length ? "Keyingisi ➔" : "Natijani ko'rish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

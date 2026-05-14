import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import grammarTopics from "../data/grammarTopics";
import { useAuth } from "../context/AuthContext";
import { updateGrammarProgress, loadGrammarProgress } from "../services/userService";

export default function GrammarScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [progress, setProgress] = useState({});
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [exerciseScore, setExerciseScore] = useState(0);

  useEffect(() => {
    if (user) {
      loadGrammarProgress(user.id).then(setProgress);
    }
  }, [user]);

  const openTopic = (topic) => {
    setSelectedTopic(topic);
    setExerciseIndex(0);
    setExerciseAnswers({});
    setShowResults(false);
  };

  const selectAnswer = (exIdx, answer) => {
    setExerciseAnswers((prev) => ({ ...prev, [exIdx]: answer }));
  };

  const finishExercises = () => {
    let score = 0;
    selectedTopic.exercises.forEach((ex, idx) => {
      const userAns = exerciseAnswers[idx] || "";
      if (userAns.toLowerCase() === ex.answer.toLowerCase()) score++;
    });
    setExerciseScore(score);
    setShowResults(true);

    if (user) {
      updateGrammarProgress(user.id, selectedTopic.id, score, selectedTopic.exercises.length);
    }
  };

  const totalExercises = selectedTopic?.exercises?.length || 0;
  const answeredCount = Object.keys(exerciseAnswers).length;

  if (!selectedTopic) {
    return (
      <div className="grammar-screen">
        <div className="grammar-header">
          <button className="btn-back" onClick={() => navigate("/play")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Orqaga
          </button>
          <h2>📚 Grammar</h2>
          <div />
        </div>

        <p className="grammar-stats">
          {Object.values(progress).filter((p) => p.completed).length}/{grammarTopics.length} mavzu yakunlangan
        </p>

        <div className="grammar-topics">
          {grammarTopics.map((topic) => {
    const p = progress[String(topic.id)];
    const completed = p?.completed;
    const best = p?.bestScore || 0;
    const total = topic.exercises.length;

    return (
      <button key={topic.id} className="grammar-topic-card" onClick={() => openTopic(topic)}>
        <div className="grammar-topic-icon" style={{ background: topic.bg }}>
          {topic.icon}
        </div>
        <div className="grammar-topic-info">
          <div className="grammar-topic-header">
            <h3>{topic.title}</h3>
            <span className="grammar-topic-diff" style={{ background: topic.color }}>
              {topic.difficulty}
            </span>
          </div>
                  <p>{topic.exercises.length} ta mashq</p>
                </div>
                <div className="grammar-topic-right">
                  {completed && <span className="grammar-completed-badge" title="Yakunlangan">✅</span>}
                  {!completed && best > 0 && (
                    <span className="grammar-best-score">Eng yaxshi: {best}/{total}</span>
                  )}
                  <div className="grammar-topic-arrow">→</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Topic detail view
  return (
    <div className="grammar-screen">
      <div className="grammar-header">
        <button className="btn-back" onClick={() => setSelectedTopic(null)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Mavzular
        </button>
        <h2>{selectedTopic.icon} {selectedTopic.title}</h2>
        <div />
      </div>

      {!showResults ? (
        <div className="grammar-topic-detail">
          {/* Explanation */}
          <div className="grammar-explanation">
            <div className="grammar-explanation-content">
              {selectedTopic.explanation.split("\n").map((line, i) => {
                if (line.startsWith("## ")) return <h4 key={i} className="grammar-ex-heading">{line.replace("## ", "")}</h4>;
                if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="grammar-ex-bold">{line.replace(/\*\*/g, "")}</p>;
                if (line.startsWith("| ")) return null;
                if (line.startsWith("---")) return null;
                if (line.trim()) return <p key={i} className="grammar-ex-text">{line}</p>;
                return null;
              })}
            </div>
          </div>

          {/* Examples */}
          <div className="grammar-examples">
            <h4>📝 Misollar</h4>
            <div className="grammar-examples-list">
              {selectedTopic.examples.map((ex, i) => (
                <div key={i} className="grammar-example-item">
                  <span className="grammar-example-num">{i + 1}</span>
                  <span>{ex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exercises */}
          <div className="grammar-exercises">
            <div className="grammar-exercises-header">
              <h4>✏️ Mashqlar</h4>
              <span className="grammar-exercises-progress">{answeredCount}/{totalExercises} ta bajarildi</span>
            </div>

            {selectedTopic.exercises.map((ex, idx) => (
              <div key={idx} className="grammar-exercise-card">
                <div className="grammar-exercise-num">{idx + 1}</div>
                <div className="grammar-exercise-content">
                  <p className="grammar-exercise-question">{ex.question}</p>
                  <div className="grammar-options">
                    {ex.options.map((opt, oi) => (
                      <button
                        key={oi}
                        className={`grammar-option ${exerciseAnswers[idx] === opt ? "selected" : ""}`}
                        onClick={() => selectAnswer(idx, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {answeredCount === totalExercises && (
              <button className="btn btn-primary btn-lg" onClick={finishExercises} style={{ marginTop: 16, width: "100%" }}>
                Natijani ko'rish
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grammar-result">
          <div className="score-circle" style={{ background: exerciseScore === totalExercises ? "var(--success)" : "var(--primary)" }}>
            {exerciseScore}/{totalExercises}
          </div>
          <h2>✏️ Mashq natijalari</h2>
          <p className="result-comment">
            {exerciseScore === totalExercises
              ? "Mukammal! Mavzuni to'liq o'zlashtirdingiz! 🎉"
              : exerciseScore >= totalExercises * 0.7
                ? "Yaxshi natija! Mavzuni takrorlang."
                : "Qayta o'qib chiqing va yana urinib ko'ring."}
          </p>

          <div className="grammar-review-list">
            {selectedTopic.exercises.map((ex, idx) => {
              const userAns = exerciseAnswers[idx] || "";
              const correct = userAns.toLowerCase() === ex.answer.toLowerCase();
              return (
                <div key={idx} className={`grammar-review-item ${correct ? "correct" : "incorrect"}`}>
                  <span className="grammar-review-icon">{correct ? "✅" : "❌"}</span>
                  <div className="grammar-review-content">
                    <p>{ex.question}</p>
                    <p className="grammar-review-answer">
                      {correct ? (
                        <span className="val-correct">{ex.answer} ✓</span>
                      ) : (
                        <>
                          Siz: <span className="val-incorrect">{userAns || "(bo'sh)"}</span>
                          &nbsp;| To'g'ri: <span className="val-correct">{ex.answer}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => setSelectedTopic(null)}>
              Mavzularga qaytish
            </button>
            <button className="btn btn-secondary" onClick={() => openTopic(selectedTopic)}>
              Qayta urinish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

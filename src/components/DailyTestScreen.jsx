import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateDailyTest, loadDailyProgress } from "../services/userService";
import verbsDB from "../data/verbs";
import vocabularyDB from "../data/vocabulary";
import grammarTopics from "../data/grammarTopics";

function generateQuestions() {
  const questions = [];
  const used = new Set();

  // 3 ta verb questions
  const shuffledVerbs = [...verbsDB].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 3 && i < shuffledVerbs.length; i++) {
    const v = shuffledVerbs[i];
    const type = Math.floor(Math.random() * 3);
    let prompt, answer, mode;
    if (type === 0) {
      prompt = `"${v.uz}" fe'lining V2 (Past Simple) shaklini yozing`;
      answer = v.v2;
      mode = "verb-v2";
    } else if (type === 1) {
      prompt = `"${v.uz}" fe'lining V3 (Past Participle) shaklini yozing`;
      answer = v.v3;
      mode = "verb-v3";
    } else {
      prompt = `"${v.v1}" fe'lining o'zbekcha tarjimasi?`;
      answer = v.uz;
      mode = "verb-uz";
    }
    questions.push({ prompt, answer, mode, source: v });
    used.add(v.v1);
  }

  // 3 ta vocabulary questions
  const shuffledVocab = [...vocabularyDB].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 3 && i < shuffledVocab.length; i++) {
    const w = shuffledVocab[i];
    const type = Math.floor(Math.random() * 2);
    let prompt, answer;
    if (type === 0) {
      prompt = `"${w.uz}" ingliz tilida qanday?`;
      answer = w.en;
    } else {
      prompt = `"${w.en}" so'zining ma'nosi nima?`;
      answer = w.uz;
    }
    questions.push({ prompt, answer, mode: "vocab" });
  }

  // 2 ta grammar questions
  const shuffledGrammar = [...grammarTopics].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 2 && i < shuffledGrammar.length; i++) {
    const topic = shuffledGrammar[i];
    const exercises = topic.exercises;
    const ex = exercises[Math.floor(Math.random() * exercises.length)];
    questions.push({
      prompt: `[${topic.title}] ${ex.question}`,
      answer: ex.answer,
      options: ex.options,
      mode: "grammar",
    });
  }

  return questions.sort(() => Math.random() - 0.5);
}

export default function DailyTestScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dailyInfo, setDailyInfo] = useState(null);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [grammarAnswer, setGrammarAnswer] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (user) {
      loadDailyProgress(user.id).then(setDailyInfo);
    }
  }, [user]);

  const today = new Date().toISOString().split("T")[0];
  const alreadyDone = dailyInfo?.lastDate === today;

  const startTest = () => {
    const qs = generateQuestions();
    setQuestions(qs);
    setStarted(true);
    setQIndex(0);
    setScore(0);
    setFinished(false);
    setUserAnswer("");
    setResult(null);
    setGrammarAnswer("");
  };

  const submitAnswer = () => {
    const q = questions[qIndex];
    let correct = false;

    if (q.mode === "grammar") {
      if (grammarAnswer.toLowerCase() === q.answer.toLowerCase()) correct = true;
    } else {
      const clean = (s) => s.toLowerCase().trim().replace(/\s+/g, " ");
      const answers = q.answer.toLowerCase().split("/").map((a) => a.trim());
      correct = answers.some((a) => clean(userAnswer) === clean(a));
    }

    setResult(correct);
    if (correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (qIndex + 1 < questions.length) {
      setQIndex((i) => i + 1);
      setResult(null);
      setUserAnswer("");
      setGrammarAnswer("");
    } else {
      setFinished(true);
      if (user) {
        updateDailyTest(user.id, score + (result ? 1 : 0), questions.length);
      }
    }
  };

  if (!started) {
  if (!dailyInfo) {
    return (
      <div className="daily-screen">
        <div className="loading-screen" style={{ color: "var(--text-muted)", minHeight: 200 }}>
          <div className="loading-spinner" style={{ borderColor: "var(--border-light)", borderTopColor: "var(--primary)" }} />
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-screen">
      <div className="daily-header">
        <button className="btn-back" onClick={() => navigate("/play")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Orqaga
        </button>
        <h2>📅 Kunlik Test</h2>
        <div />
      </div>

        <div className="daily-start-card">
          <div className="daily-streak-display">
            <span className="daily-streak-emoji">🔥</span>
            <span className="daily-streak-value">{dailyInfo?.streak || 0}</span>
            <span className="daily-streak-label">kunlik streak</span>
          </div>

          {dailyInfo?.lastStats && (
            <div className="daily-last-result">
              Oxirgi test: {dailyInfo.lastStats.score}/{dailyInfo.lastStats.total}
            </div>
          )}

          <p className="daily-desc">
            Har kuni 8 ta bland savol (fe'llar, so'z boyligi, grammar).
            Streakingizni saqlang va ingliz tilingizni mustahkamlang!
          </p>

          {alreadyDone ? (
            <div className="daily-done-msg">
              ✅ Bugungi testni allaqachon topshirdingiz!
              <br />
              <small>Ertaga yana kelib sinang!</small>
            </div>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={startTest}>
              🚀 Testni boshlash
            </button>
          )}
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="daily-screen">
        <div className="daily-result">
          <div className="score-circle" style={{ background: score === questions.length ? "var(--success)" : "var(--primary)" }}>
            {score}/{questions.length}
          </div>
          <h2>📅 Kunlik test yakunlandi!</h2>
          <p className="result-comment">
            {score === questions.length
              ? "Mukammal! 🔥 Streakingiz davom etsin!"
              : score >= questions.length * 0.7
                ? "Yaxshi! Ertaga yana urinib ko'ring!"
                : "Davom eting! Har kuni yaxshilanasiz!"}
          </p>
          <div className="daily-streak-final">
            <span>🔥 {dailyInfo?.streak || 0} kunlik streak</span>
          </div>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => navigate("/play")}>
              Bosh sahifaga qaytish
            </button>
            <button className="btn btn-secondary" onClick={startTest}>
              Qayta urinish
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[qIndex];
  const isGrammar = q.mode === "grammar";

  return (
    <div className="daily-screen">
      <div className="daily-header">
        <span />
        <span className="vocab-progress">{qIndex + 1}/{questions.length}</span>
        <span className="daily-score">Ball: {score}</span>
      </div>

      <div className="daily-question-card">
        <div className="daily-question-badge">
          {q.mode?.startsWith("verb") ? "📝 Fe'l" : q.mode === "vocab" ? "📖 So'z" : "📚 Grammar"}
        </div>
        <div className="daily-question-text">{q.prompt}</div>

        {isGrammar ? (
          <div className="daily-grammar-options">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`daily-grammar-opt ${grammarAnswer === opt ? "selected" : ""}`}
                onClick={() => setGrammarAnswer(opt)}
                disabled={result !== null}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="daily-answer-area">
            <input
              ref={inputRef}
              type="text"
              className="vocab-quiz-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && userAnswer.trim() && result === null) submitAnswer();
                if (e.key === "Enter" && result !== null) nextQuestion();
              }}
              placeholder="Javobingizni yozing..."
              autoFocus
              autoComplete="off"
              spellCheck={false}
              disabled={result !== null}
            />
          </div>
        )}

        {result !== null && (
          <div className={`daily-result-badge ${result ? "correct" : "incorrect"}`}>
            {result ? "✅ To'g'ri!" : `❌ Xato. To'g'ri javob: ${q.answer}`}
          </div>
        )}

        <div className="daily-actions">
          {result === null ? (
            <button
              className="btn btn-primary"
              onClick={submitAnswer}
              disabled={isGrammar ? !grammarAnswer : !userAnswer.trim()}
            >
              Tekshirish
            </button>
          ) : (
            <button className="btn btn-primary" onClick={nextQuestion}>
              {qIndex + 1 < questions.length ? "Keyingisi ➔" : "Natijani ko'rish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

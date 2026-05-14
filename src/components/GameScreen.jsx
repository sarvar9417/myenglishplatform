import { useState, useRef, useEffect, useCallback } from "react";
import { validate, hintMap } from "../utils/validation";

const INPUT_FIELDS = {
  1: [
    { id: "v1", placeholder: "Infinitive (V1)", label: "V1 — Infinitive" },
    { id: "v2", placeholder: "Past Simple (V2)", label: "V2 — Past Simple" },
    { id: "v3", placeholder: "Past Participle (V3)", label: "V3 — Past Participle" },
  ],
  3: [
    { id: "v2", placeholder: "Past Simple (V2)", label: "V2 — Past Simple" },
    { id: "v3", placeholder: "Past Participle (V3)", label: "V3 — Past Participle" },
  ],
};

export default function GameScreen({ item, currentMode, onCheck, onNext, checked, isCorrect, isTransitioning }) {
  const [inputs, setInputs] = useState({});
  const [givenType, setGivenType] = useState(null);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef({});
  const containerRef = useRef(null);

  // Reset state when item changes
  useEffect(() => {
    setInputs({});
    setShake(false);

    if (currentMode === 2) {
      const types = ["v1", "v2", "v3"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      setGivenType(randomType);
    } else {
      setGivenType(null);
      // Pre-populate inputs for mode 1 and 3
      const fields = INPUT_FIELDS[currentMode] || INPUT_FIELDS[3];
      const initial = {};
      fields.forEach((f) => (initial[f.id] = ""));
      setInputs(initial);
    }
  }, [item, currentMode]);

  // Pre-populate inputs once givenType is set for mode 2
  useEffect(() => {
    if (currentMode === 2 && givenType) {
      const fields = ["v1", "v2", "v3"]
        .filter((t) => t !== givenType)
        .map((t) => ({ id: t }));
      const initial = {};
      fields.forEach((f) => (initial[f.id] = ""));
      setInputs(initial);
    }
  }, [givenType, currentMode]);

  // Auto-focus first input only when question loads (not on every keystroke)
  const hasAutoFocused = useRef(false);
  useEffect(() => {
    hasAutoFocused.current = false;
  }, [item, currentMode]);

  useEffect(() => {
    if (!checked && !isTransitioning && !hasAutoFocused.current) {
      const firstKey = Object.keys(inputs)[0];
      if (firstKey && inputRefs.current[firstKey]) {
        inputRefs.current[firstKey].focus();
        hasAutoFocused.current = true;
      }
    }    }, [checked, isTransitioning]);

  const handleInputChange = useCallback((field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!checked) {
          onCheck(inputs);
        } else {
          onNext();
        }
      }
      // Tab between inputs manually on mobile
      if (e.key === "Tab" && !e.shiftKey && !checked) {
        const fields = Object.keys(inputs);
        const currentIdx = fields.indexOf(e.target.id?.replace("inp-", ""));
        if (currentIdx < fields.length - 1) {
          const nextId = fields[currentIdx + 1];
          if (inputRefs.current[nextId]) {
            inputRefs.current[nextId].focus();
            e.preventDefault();
          }
        }
      }
    },
    [checked, inputs, onCheck, onNext]
  );

  // Determine question display
  let questionLabel, questionWord, questionHint;
  if (currentMode === 1) {
    questionLabel = "O'zbekcha tarjimasi";
    questionWord = item.uz;
    questionHint = "Ushbu fe'lning 3 shaklini yozing";
  } else if (currentMode === 2) {
    if (!givenType) return null;
    questionLabel = "Berilgan shakl (qolganini toping)";
    questionWord = item[givenType];
    questionHint = hintMap[givenType];
  } else {
    questionLabel = "Infinitive berilgan";
    questionWord = item.v1;
    questionHint = "V2 va V3 shakllarini yozing";
  }

  // Get input fields for current mode
  const inputFields =
    currentMode === 2
      ? ["v1", "v2", "v3"]
          .filter((t) => t !== givenType)
          .map((t) => ({
            id: t,
            placeholder:
              t === "v1" ? "Infinitive (V1)" : t === "v2" ? "Past Simple (V2)" : "Past Participle (V3)",
            label:
              t === "v1"
                ? "V1 — Infinitive"
                : t === "v2"
                  ? "V2 — Past Simple"
                  : "V3 — Past Participle",
          }))
      : INPUT_FIELDS[currentMode] || INPUT_FIELDS[3];

  const getFieldStatus = (fieldId) => {
    if (!checked) return "pending";
    const userVal = inputs[fieldId] || "";
    const correctVal = item[fieldId];
    const altVal = item[`alt${fieldId.toUpperCase()}`];
    return validate(userVal, correctVal, altVal) ? "correct" : "incorrect";
  };

  const getFieldValue = (fieldId) => {
    if (!checked) return inputs[fieldId] || "";
    if (getFieldStatus(fieldId) === "correct") return inputs[fieldId];
    return item[fieldId]; // show correct answer
  };

  // Shake animation on wrong answer
  useEffect(() => {
    if (checked && !isCorrect) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [checked, isCorrect]);

  return (
    <div
      className={`game-screen-content ${isTransitioning ? "slide-out" : "slide-in"} ${shake ? "shake" : ""}`}
      ref={containerRef}
    >
      <div className="question-card">
        <span className="label-text">{questionLabel}</span>
        <div className="main-word">{questionWord}</div>
        {questionHint && <div className="sub-hint">{questionHint}</div>}
      </div>

      <div className="inputs-grid" role="group" aria-label="Javob maydonlari">
        {inputFields.map((field, idx) => {
          const status = getFieldStatus(field.id);
          return (
            <div className={`input-group ${status}`} key={field.id}>
              <label htmlFor={`inp-${field.id}`}>{field.label}</label>
              <div className="input-wrapper">
                <input
                  ref={(el) => (inputRefs.current[field.id] = el)}
                  id={`inp-${field.id}`}
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  autoCapitalize="off"
                  value={getFieldValue(field.id)}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  disabled={checked}
                  className={status}
                  placeholder={field.placeholder}
                  aria-label={field.label}
                  aria-invalid={status === "incorrect"}
                  tabIndex={idx + 1}
                  onKeyDown={handleKeyDown}
                />
                {checked && status === "correct" && <span className="input-icon icon-correct">✓</span>}
                {checked && status === "incorrect" && <span className="input-icon icon-incorrect">✗</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`feedback-area ${checked ? "visible" : ""}`} role="alert" aria-live="assertive">
        {checked &&
          (isCorrect ? (
            <span className="feedback-correct">
              <span className="feedback-icon">✅</span> Ajoyib! To'g'ri
            </span>
          ) : (
            <span className="feedback-incorrect">
              <span className="feedback-icon">❌</span> Xato — to'g'ri javoblar kataklarda ko'rsatildi
            </span>
          ))}
      </div>

      <div className="button-row">
        {!checked ? (
          <button
            className="btn btn-primary btn-lg"
            onClick={() => onCheck(inputs)}
            aria-label="Javoblarni tekshirish"
          >
            Tekshirish
          </button>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={onNext} autoFocus aria-label="Keyingi savol">
            Keyingisi ➔
          </button>
        )}
      </div>
    </div>
  );
}

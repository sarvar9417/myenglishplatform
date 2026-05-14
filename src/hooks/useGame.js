import { useState, useCallback, useEffect, useRef } from "react";
import verbsDB from "../data/verbs";
import { validate, getFieldsToCheck } from "../utils/validation";
import { supabase } from "../supabase/config";
import { saveGameResult, loadUserStats } from "../services/userService";

const QUESTIONS_COUNT = 10;
const STATS_KEY = "fellar-masteri-stats";
const GAME_STATE_KEY = "fellar-masteri-game-state";

function shuffleAndPick(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function loadStats() {
  try {
    const data = localStorage.getItem(STATS_KEY);
    return data
      ? JSON.parse(data)
      : { gamesPlayed: 0, totalCorrect: 0, totalQuestions: 0, bestScore: 0 };
  } catch {
    return { gamesPlayed: 0, totalCorrect: 0, totalQuestions: 0, bestScore: 0 };
  }
}

function loadGameState() {
  try {
    const data = localStorage.getItem(GAME_STATE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export default function useGame() {
  const saved = loadGameState();

  const [screen, setScreen] = useState(saved?.screen || "mode");
  const [currentMode, setCurrentMode] = useState(saved?.currentMode || 1);
  const [gameQueue, setGameQueue] = useState(saved?.gameQueue || []);
  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex || 0);
  const [score, setScore] = useState(saved?.score || 0);
  const [mistakes, setMistakes] = useState(saved?.mistakes || []);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stats, setStats] = useState(loadStats);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load remote stats on mount (user is guaranteed authenticated via ProtectedRoute)
  // Use a ref to avoid overwriting stats when a game finishes before remote responds
  const remoteLoaded = useRef(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        loadUserStats(user.id).then((remoteStats) => {
          // Only set if game hasn't finished yet
          // Prevents overwriting fresh game results with stale remote data
          if (remoteStats && !remoteLoaded.current) {
            setStats(remoteStats);
          }
          remoteLoaded.current = true;
        });
      }
    });
  }, []);

  // When game ends, update stats and save to Supabase
  const persistAndFinish = useCallback((finalScore, finalMistakes) => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        saveGameResult(user.id, {
          score: finalScore,
          total: QUESTIONS_COUNT,
          mistakes: finalMistakes,
        });
      }
    });

    setStats((prev) => ({
      gamesPlayed: prev.gamesPlayed + 1,
      totalCorrect: prev.totalCorrect + finalScore,
      totalQuestions: prev.totalQuestions + QUESTIONS_COUNT,
      bestScore: Math.max(prev.bestScore, finalScore),
    }));
    setScreen("result");
    setIsTransitioning(false);
  }, []);

  // Persist stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  // Persist game state so refresh doesn't lose progress
  useEffect(() => {
    if (screen === "mode") {
      localStorage.removeItem(GAME_STATE_KEY);
    } else {
      const toSave = {
        screen,
        currentMode,
        gameQueue,
        currentIndex,
        score,
        mistakes,
      };
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(toSave));
    }
  }, [screen, currentMode, gameQueue, currentIndex, score, mistakes]);

  const startGame = useCallback((mode) => {
    const queue = shuffleAndPick(verbsDB, QUESTIONS_COUNT);
    setCurrentMode(mode);
    setGameQueue(queue);
    setCurrentIndex(0);
    setScore(0);
    setMistakes([]);
    setChecked(false);
    setIsCorrect(false);
    setIsTransitioning(false);
    setScreen("game");
  }, []);

  const handleCheck = useCallback(
    (inputs) => {
      const item = gameQueue[currentIndex];
      let allCorrect = true;
      const fieldsToCheck = getFieldsToCheck(currentMode, inputs);

      fieldsToCheck.forEach((field) => {
        const correct = item[field];
        const alt = item[`alt${field.toUpperCase()}`];
        if (!validate(inputs[field], correct, alt)) {
          allCorrect = false;
        }
      });

      if (allCorrect) {
        setScore((s) => s + 1);
        setIsCorrect(true);
      } else {
        setMistakes((prev) => [...prev, item]);
        setIsCorrect(false);
      }
      setChecked(true);
    },
    [gameQueue, currentIndex, currentMode]
  );

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentIndex + 1 < QUESTIONS_COUNT) {
        setCurrentIndex((i) => i + 1);
        setChecked(false);
        setIsCorrect(false);
        setIsTransitioning(false);
      } else {
        remoteLoaded.current = true;
        persistAndFinish(score, mistakes);
      }
    }, 200);
  }, [currentIndex, score, mistakes, persistAndFinish]);

  const restartCurrentMode = useCallback(() => {
    startGame(currentMode);
  }, [currentMode, startGame]);

  const goToModeSelect = useCallback(() => {
    setScreen("mode");
  }, []);

  const resetStats = useCallback(() => {
    const empty = { gamesPlayed: 0, totalCorrect: 0, totalQuestions: 0, bestScore: 0 };
    setStats(empty);
    localStorage.setItem(STATS_KEY, JSON.stringify(empty));
  }, []);

  return {
    screen,
    currentMode,
    gameQueue,
    currentIndex,
    score,
    mistakes,
    checked,
    isCorrect,
    stats,
    isTransitioning,
    questionsCount: QUESTIONS_COUNT,
    startGame,
    handleCheck,
    handleNext,
    restartCurrentMode,
    goToModeSelect,
    resetStats,
  };
}

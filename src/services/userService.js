import { supabase } from "../supabase/config";

/**
 * Create or update user profile on first login
 */
export async function createUserProfile(user) {
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!existing) {
    const displayName =
      user.user_metadata?.display_name || user.email?.split("@")[0] || "User";

    await supabase.from("users").insert([
      {
        id: user.id,
        email: user.email,
        display_name: displayName,
        stats: {
          gamesPlayed: 0,
          totalCorrect: 0,
          totalQuestions: 0,
          bestScore: 0,
        },
        daily_streak: 0,
        last_daily_date: null,
        vocabulary_progress: {},
        grammar_progress: {},
      },
    ]);
  }
}

/**
 * Save game results to Supabase
 */
export async function saveGameResult(uid, { score, total, mistakes }) {
  try {
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("stats")
      .eq("id", uid)
      .single();

    if (fetchError || !userData) return null;

    const current = userData.stats || {
      gamesPlayed: 0,
      totalCorrect: 0,
      totalQuestions: 0,
      bestScore: 0,
    };

    const newStats = {
      gamesPlayed: current.gamesPlayed + 1,
      totalCorrect: current.totalCorrect + score,
      totalQuestions: current.totalQuestions + total,
      bestScore: Math.max(current.bestScore, score),
    };

    const { error: updateError } = await supabase
      .from("users")
      .update({
        stats: newStats,
        last_game_at: new Date().toISOString(),
        last_mistakes: mistakes,
      })
      .eq("id", uid);

    if (updateError) throw updateError;
    return newStats;
  } catch (err) {
    console.error("Supabase save error:", err);
    return null;
  }
}

/**
 * Load user stats from Supabase
 */
export async function loadUserStats(uid) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("stats")
      .eq("id", uid)
      .single();

    if (error) {
      console.error("Supabase load error:", error);
      return null;
    }
    return data?.stats || null;
  } catch (err) {
    console.error("Supabase load error:", err);
    return null;
  }
}

// ===== VOCABULARY PROGRESS =====

export async function updateVocabularyProgress(uid, wordEn, correct) {
  try {
    const { data: userData } = await supabase
      .from("users")
      .select("vocabulary_progress")
      .eq("id", uid)
      .single();

    const progress = userData?.vocabulary_progress || {};
    const existing = progress[wordEn] || { attempts: 0, correct: 0, lastSeen: null };
    existing.attempts += 1;
    if (correct) existing.correct += 1;
    existing.lastSeen = new Date().toISOString();
    progress[wordEn] = existing;

    await supabase.from("users").update({ vocabulary_progress: progress }).eq("id", uid);
    return progress;
  } catch (err) {
    console.error("Vocabulary progress error:", err);
    return null;
  }
}

export async function loadVocabularyProgress(uid) {
  try {
    const { data } = await supabase.from("users").select("vocabulary_progress").eq("id", uid).single();
    return data?.vocabulary_progress || {};
  } catch {
    return {};
  }
}

// ===== GRAMMAR PROGRESS =====

export async function updateGrammarProgress(uid, topicId, score, total) {
  try {
    const { data: userData } = await supabase
      .from("users")
      .select("grammar_progress")
      .eq("id", uid)
      .single();

    const progress = userData?.grammar_progress || {};
    const topicStr = String(topicId);
    const existing = progress[topicStr] || { bestScore: 0, attempts: 0, completed: false };
    existing.bestScore = Math.max(existing.bestScore, score);
    existing.attempts += 1;
    if (score === total) existing.completed = true;
    existing.lastAttempt = new Date().toISOString();
    progress[topicStr] = existing;

    await supabase.from("users").update({ grammar_progress: progress }).eq("id", uid);
    return progress;
  } catch (err) {
    console.error("Grammar progress error:", err);
    return null;
  }
}

export async function loadGrammarProgress(uid) {
  try {
    const { data } = await supabase.from("users").select("grammar_progress").eq("id", uid).single();
    return data?.grammar_progress || {};
  } catch {
    return {};
  }
}

// ===== DAILY TEST PROGRESS =====

export async function updateDailyTest(uid, score, total) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const { data: userData } = await supabase
      .from("users")
      .select("daily_streak, last_daily_date")
      .eq("id", uid)
      .single();

    let streak = userData?.daily_streak || 0;
    const lastDate = userData?.last_daily_date;

    // Calculate streak
    if (lastDate === today) {
      // Already done today — don't increase
    } else if (lastDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];
      streak = lastDate === yesterdayStr ? streak + 1 : 1;
    } else {
      streak = 1;
    }

    await supabase
      .from("users")
      .update({
        daily_streak: streak,
        last_daily_date: today,
        daily_test_stats: { score, total, date: today },
      })
      .eq("id", uid);

    return { streak, today };
  } catch (err) {
    console.error("Daily test error:", err);
    return null;
  }
}

export async function loadDailyProgress(uid) {
  try {
    const { data } = await supabase
      .from("users")
      .select("daily_streak, last_daily_date, daily_test_stats")
      .eq("id", uid)
      .single();

    return {
      streak: data?.daily_streak || 0,
      lastDate: data?.last_daily_date,
      lastStats: data?.daily_test_stats || null,
    };
  } catch {
    return { streak: 0, lastDate: null, lastStats: null };
  }
}

/**
 * Validates a user's answer against the correct value and optional alternative.
 */
export function validate(userVal, correctVal, altVal) {
  const u = (userVal || "").trim().toLowerCase();
  const c = (correctVal || "").toLowerCase();
  if (!u) return false;
  if (c.includes("/")) return c.split("/").some((part) => part.trim() === u);
  if (u === c) return true;
  if (altVal && u === altVal.toLowerCase()) return true;
  return false;
}

/**
 * Determines which fields to check based on game mode and inputs.
 */
export function getFieldsToCheck(currentMode, inputs) {
  if (currentMode === 1) return ["v1", "v2", "v3"];
  if (currentMode === 2) {
    const keys = Object.keys(inputs);
    return keys.length > 0 ? keys : ["v1", "v2", "v3"];
  }
  return ["v2", "v3"];
}

/**
 * Hint labels for mode 2
 */
export const hintMap = {
  v1: "(Infinitive)",
  v2: "(Past Simple)",
  v3: "(Past Participle)",
};

/**
 * Mode display names
 */
export const modeNames = {
  1: "Rejim 1: To'liq",
  2: "Rejim 2: Topish",
  3: "Rejim 3: Tezkor",
};

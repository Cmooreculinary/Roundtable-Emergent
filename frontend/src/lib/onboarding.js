import { formatApiError } from "./api";

export const ONBOARDING_COLORS = [
  "#007AFF",
  "#34C759",
  "#FF9500",
  "#FF3B30",
  "#AF52DE",
  "#FF2D55",
  "#FFCC00",
  "#5AC8FA",
  "#EC5B13",
  "#8E8E93",
];

const HEX_COLOR = /^#[0-9A-F]{6}$/;

export function normalizeHexColor(value, fallback = "#007AFF") {
  const normalized = String(value || "").trim().toUpperCase();
  return HEX_COLOR.test(normalized) ? normalized : fallback;
}

export function isHexColor(value) {
  return HEX_COLOR.test(String(value || "").trim().toUpperCase());
}

export function onboardingErrorMessage(error) {
  if (error?.response?.status === 401) {
    return "Your secure session expired or was blocked by the browser. Sign in again, then continue where you left off.";
  }
  if (error?.response?.status === 403) {
    return "Your account is signed in, but it is not authorized to complete that action.";
  }
  return formatApiError(error, "We could not save that step. Your entries are still here; please try again.");
}

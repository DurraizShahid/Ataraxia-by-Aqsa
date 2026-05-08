export type AppTheme = "dark" | "light";

const STORAGE_KEY = "theme";

export function getStoredTheme(): AppTheme | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw === "light" || raw === "dark" ? raw : null;
}

export function applyTheme(theme: AppTheme): void {
  const root = document.documentElement;

  // Data attribute drives token overrides (light only).
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;

  // Keep Tailwind darkMode(["class"]) working for `dark:` variants.
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

export function setTheme(theme: AppTheme): void {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function initTheme(): void {
  // Dark-first default.
  applyTheme(getStoredTheme() ?? "dark");
}


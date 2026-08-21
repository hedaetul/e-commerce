export const THEME_STORAGE_KEY = "mira-haat-theme";

export const THEMES = ["dark", "light"] as const;

export type ThemeName = (typeof THEMES)[number];

export const DEFAULT_THEME: ThemeName = "dark";

export function isThemeName(value: string | null): value is ThemeName {
  return value === "dark" || value === "light";
}

export function resolveStoredTheme(value: string | null): ThemeName {
  if (isThemeName(value)) return value;
  if (value === "night" || value === "storm") return "dark";
  if (value === "day") return "light";
  return DEFAULT_THEME;
}

export function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === "dark");
}

export const THEME_INIT_SCRIPT = `!function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="night"||t==="storm")t="dark";else if(t==="day")t="light";if(t!=="dark"&&t!=="light")t="${DEFAULT_THEME}";var e=document.documentElement;e.setAttribute("data-theme",t);e.classList.toggle("dark",t==="dark");}catch(e){}}();`;

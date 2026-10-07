import { useTheme } from "./useTheme";
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}
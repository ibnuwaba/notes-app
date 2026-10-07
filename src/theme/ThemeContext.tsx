import {
  type ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

function getInitialTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>(
    "theme",
    getInitialTheme(),
  );

  const toggleTheme = useCallback(() => {
  setTheme((current) => (current === "light" ? "dark" : "light"));
}, [setTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const value = useMemo(
  () => ({ theme, toggleTheme }),
  [theme, toggleTheme],
);
  return (
    <ThemeContext value={value}>
      {children}
    </ThemeContext>
  );
}
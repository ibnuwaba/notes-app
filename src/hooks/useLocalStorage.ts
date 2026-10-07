import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  version = 1,
) {
  const storageKey = `${key}:v${version}`;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(storageKey);

      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((current: T) => T)) => {
    setStoredValue((current) =>
      typeof value === "function"
        ? (value as (current: T) => T)(current)
        : value,
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(storedValue));
    } catch {
      // Ignore storage errors
    }
  }, [storageKey, storedValue]);

  return [storedValue, setValue] as const;
}
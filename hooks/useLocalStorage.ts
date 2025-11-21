"use client";

import { useEffect, useState } from "react";

// Hook personalizado para sincronizar estado con localStorage
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para almacenar el valor
  // Inicializamos con initialValue para evitar hydration mismatch
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Leer de localStorage después del montaje
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
  }, [key]);

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que value sea una función para tener la misma API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook para sincronizar múltiples valores con localStorage
export function useLocalStorageMultiple<T extends Record<string, unknown>>(
  prefix: string,
  initialValues: T,
): [T, (key: keyof T, value: T[keyof T]) => void] {
  const [values, setValues] = useState<T>(initialValues);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialValues is an object and would cause infinite loops if added. We only want to run this on mount/prefix change.
  useEffect(() => {
    const loaded = { ...initialValues };
    let hasChanges = false;
    for (const key in initialValues) {
      try {
        const item = window.localStorage.getItem(`${prefix}_${String(key)}`);
        if (item) {
          loaded[key] = JSON.parse(item);
          hasChanges = true;
        }
      } catch (error) {
        console.error(
          `Error loading ${prefix}_${String(key)} from localStorage:`,
          error,
        );
      }
    }
    if (hasChanges) {
      setValues(loaded);
    }
  }, [prefix]);

  const setValue = (key: keyof T, value: T[keyof T]) => {
    try {
      setValues((prev) => ({ ...prev, [key]: value }));
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          `${prefix}_${String(key)}`,
          JSON.stringify(value),
        );
      }
    } catch (error) {
      console.error(
        `Error saving ${prefix}_${String(key)} to localStorage:`,
        error,
      );
    }
  };

  return [values, setValue];
}

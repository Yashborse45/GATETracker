import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// FIX: Updated function signature to use imported Dispatch/SetStateAction, fixing the 'React' namespace error.
// Also updated to accept a function for `initialValue` to support lazy initialization, resolving a type error in SyllabusTracker.tsx.
function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.error(error);
    }

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      const valueToStore = storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
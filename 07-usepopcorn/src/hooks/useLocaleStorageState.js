import { useEffect, useState } from "react";

export function useLocaleStorageState(initialState, key) {
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) || initialState);

  useEffect(function() {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
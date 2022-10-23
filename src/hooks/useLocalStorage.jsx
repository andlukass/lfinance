import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const currentValue = localStorage.getItem(key);

    if (currentValue) {
      return JSON.parse(currentValue);
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;

// Utility functions for localStorage operations in a singleton pattern

const LocalStorage = (() => {
  // check if the code is running in a browser environment
  const isBrowser = () => typeof window !== 'undefined';

  // get an item from localStorage
  const get = (key) => {
    if (!isBrowser()) return null;
    const stored = localStorage.getItem(key);
    try {
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error parsing localStorage item:', error);
      return null;
    }
  };

  // set an item in localStorage
  const set = (key, value) => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  };

  // remove an item from localStorage
  const remove = (key) => {
    if (!isBrowser()) return;
    localStorage.removeItem(key);
  };

  return {
    get,
    set,
    remove
  };
})();

export default LocalStorage;

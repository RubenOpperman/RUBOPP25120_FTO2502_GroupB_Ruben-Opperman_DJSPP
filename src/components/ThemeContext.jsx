import { createContext, useEffect, useState, useContext } from "react";

const ThemeContext = createContext();

/**
 * ThemeProvider component that manages the light/dark theme state
 * and persists the user's preference in localStorage.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render within the provider.
 *
 * @returns {JSX.Element} The ThemeContext.Provider wrapping children.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  //Gets theme from local storage if it exists otherwise the default theme is light
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  /**
   * Toggles the theme between "light" and "dark", updates the DOM class,
   * and saves the new theme in localStorage.
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access the theme context.
 *
 * @returns {{ theme: string, toggleTheme: function }} - Current theme and toggle function.
 */
export function useTheme() {
  return useContext(ThemeContext);
}

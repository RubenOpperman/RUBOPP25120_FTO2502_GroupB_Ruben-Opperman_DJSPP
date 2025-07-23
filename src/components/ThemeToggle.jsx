import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-700 hover:scale-105 text-xl"
    >
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
}

import { useTheme } from "./ThemeContext";

/**
 * ThemeToggle Component
 *
 * A button that toggles between light and dark themes using the ThemeContext.
 * Displays a sun emoji 🌞 when the theme is light and a moon emoji 🌜 when the theme is dark.
 *
 * @component
 * @returns {JSX.Element} The theme toggle button.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full  transition-all  duration-400 ease-in-out border-2 border-color hover:scale-110 text-xl"
    >
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
}

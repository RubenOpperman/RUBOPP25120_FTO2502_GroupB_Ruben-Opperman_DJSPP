import { useTheme } from "./ThemeContext";

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

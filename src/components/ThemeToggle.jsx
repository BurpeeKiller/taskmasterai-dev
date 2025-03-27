import { useTheme } from '../contexts/ThemeContext.jsx'

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:scale-105 transition"
      title="Changer de thème"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle

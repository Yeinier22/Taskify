import { useTheme } from "../context/themeSwitch";

const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <label className="relative inline-block w-11 h-6">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5" />
    </label>
  );
};

export default Switch;

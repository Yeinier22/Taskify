import { useTheme } from "../context/themeSwitch";
import "./switch.css"

const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "light"}
          onChange={toggleTheme}
        />
        <span className="slider round"/>
      </label>
    </div>
  );
};

export default Switch;
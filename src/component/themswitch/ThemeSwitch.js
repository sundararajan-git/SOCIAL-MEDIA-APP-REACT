import React from "react";
import "./ThemeSwitch.css";
import { useThemeContext } from "../../hook/useThemeContext";

const ThemeSwitch = () => {
  const { theme, dispatch } = useThemeContext();
  const switchTheme = () => {
    if (theme === "light") {
      dispatch({ type: "DARK" });
    } else {
      dispatch({ type: "LIGHT" });
    }
  };
  return (
    <div className="moon">
      <i
        className="fa-solid fa-circle-half-stroke fa-lg"
        onClick={switchTheme}
      ></i>
    </div>
  );
};

export default ThemeSwitch;

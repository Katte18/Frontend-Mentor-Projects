import React from "react";
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";

import User from "./User";
import Buttons from "./Buttons";

export const ThemeMode = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark-theme");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light-theme" ? "dark-theme" : "light-theme"));
  };
  return (
    <ThemeMode.Provider value={{ theme, toggleTheme }}>
      <main className="main-container" id={theme}>
        <div className="component-container">
          <User />
          <Buttons />
          <div className="theme-toggle">
            <ReactSwitch
              onChange={toggleTheme}
              checked={theme === "dark-theme"}
            />
          </div>
        </div>
      </main>
    </ThemeMode.Provider>
  );
}

export default App;

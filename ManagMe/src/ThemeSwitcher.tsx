import React, { useState } from 'react';

const ThemeSwitcher: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    if (isDarkTheme) {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  };

  return (
    <div className="theme-switcher">
      <label>
        <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
        Dark Mode
      </label>
    </div>
  );
};

export default ThemeSwitcher;

import React, { useState, useEffect } from 'react';

export default function ColorSwitcher() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'theme1');
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');

  useEffect(() => {
    document.body.classList.remove('theme1', 'theme2', 'theme3');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark);
  }, [dark]);

  return (
    <div className="color-switcher">
      <select value={theme} onChange={e => setTheme(e.target.value)} aria-label="color select">
        <option value="theme1">Option 1</option>
        <option value="theme2">Option 2</option>
        <option value="theme3">Option 3</option>
      </select>
      <label>
        <input
          type="checkbox"
          aria-label="dark mode toggle"
          checked={dark}
          onChange={e => setDark(e.target.checked)}
        />{' '}Dark
      </label>
    </div>
  );
}

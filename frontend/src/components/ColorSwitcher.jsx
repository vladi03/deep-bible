import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
  IconButton
} from 'rmwc';

const themes = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5'];

export default function ColorSwitcher() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'theme1');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.remove(...themes);
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <IconButton
        icon="palette"
        aria-label="open color picker"
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Theme</DialogTitle>
        <DialogContent>
          <div className="color-switcher">
            {themes.map(t => (
              <button
                key={t}
                type="button"
                aria-label={`set ${t}`}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                style={{
                  backgroundColor: `var(--color-${t})`,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: theme === t ? '2px solid #000' : '1px solid #ccc',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <DialogButton action="close">Close</DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

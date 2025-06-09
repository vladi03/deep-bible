import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorSwitcher from './components/ColorSwitcher.jsx';
import '@testing-library/jest-dom';

afterEach(() => {
  document.body.className = '';
  localStorage.clear();
});

describe('ColorSwitcher', () => {
  it('changes theme and dark mode', () => {
    render(<ColorSwitcher />);
    fireEvent.change(screen.getByLabelText('color select'), { target: { value: 'theme2' } });
    expect(document.body.classList.contains('theme2')).toBe(true);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(document.body.classList.contains('dark')).toBe(true);
  });
});

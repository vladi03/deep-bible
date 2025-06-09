import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorSwitcher from './components/ColorSwitcher.jsx';
import '@testing-library/jest-dom';

afterEach(() => {
  document.body.className = '';
  localStorage.clear();
});

describe('ColorSwitcher', () => {
  it('changes theme when a swatch is clicked', () => {
    render(<ColorSwitcher />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    expect(document.body.classList.contains('theme2')).toBe(true);
  });
});

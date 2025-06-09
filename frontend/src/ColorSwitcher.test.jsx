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
    fireEvent.click(screen.getByLabelText('open color picker'));
    const swatches = screen.getAllByLabelText(/set theme/);
    fireEvent.click(swatches[1]);
    expect(document.body.classList.contains('theme2')).toBe(true);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileAccordion from './components/MobileAccordion.jsx';
import '@testing-library/jest-dom';

const categories = [
  {
    category_name: 'Belief',
    category_description: 'Belief desc',
    scriptures: [
      { reference: 'Heb 11:1', text: 'Now faith', context_description: 'ctx' }
    ]
  }
];

describe('MobileAccordion', () => {
  it('renders category and toggles content', () => {
    const { container } = render(
      <MobileAccordion categories={categories} topicIcon="<svg></svg>" />
    );
    expect(screen.getAllByText('Belief')[0]).toBeInTheDocument();
    const list = container.querySelector('.rmwc-collapsible-list');
    expect(list.classList.contains('rmwc-collapsible-list--open')).toBe(false);
    fireEvent.click(screen.getAllByText('Belief')[0]);
    expect(list.classList.contains('rmwc-collapsible-list--open')).toBe(true);
  });
});

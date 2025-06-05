import React from 'react';
import { render, screen } from '@testing-library/react';
import RandomScripture from './components/RandomScripture.jsx';
import '@testing-library/jest-dom';

const topics = [
  {
    title: 'Faith',
    description: 'Faith desc',
    categories: [
      {
        category_name: 'Belief',
        category_description: 'Belief desc',
        scriptures: [
          { reference: 'Hebrews 11:1', text: 'Now faith is...', context_description: 'Context' }
        ]
      }
    ]
  }
];

describe('RandomScripture', () => {
  it('renders a random scripture section', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    render(<RandomScripture topics={topics} />);
    expect(screen.getByText('Faith')).toBeInTheDocument();
    expect(screen.getByText('Belief')).toBeInTheDocument();
    expect(screen.getByText('Hebrews 11:1')).toBeInTheDocument();
    Math.random.mockRestore();
  });
});

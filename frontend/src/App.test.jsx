import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.jsx';
import '@testing-library/jest-dom';

// Mock data for topics and articles
const mockTopics = [
  {
    title: 'Faith',
    icon: '<svg></svg>',
    description: 'Faith topic',
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
const mockArticles = [
  {
    id: '1',
    title: 'Faith Article',
    author: 'Paul',
    publishedDate: '2024-01-01',
    summary: 'Summary',
    content: [
      { title: 'Section 1', paragraphs: ['Para 1'] }
    ],
    tags: ['faith']
  }
];

describe('App UI', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          major_topics: [],
          articles: []
        })
      })
    );
  });

  it('renders topics and articles on home', () => {
    render(<App />);
    expect(screen.getByText(/loading topics/i)).toBeInTheDocument();
  });

  it('navigates to topic detail', async () => {
    window.history.pushState({}, '', '/topic/Faith');
    render(<App />);
    expect(screen.getByText(/loading topic|topic not found/i)).toBeInTheDocument();
  });

  it('shows 404 for unknown route', () => {
    window.history.pushState({}, '', '/random');
    render(<App />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});

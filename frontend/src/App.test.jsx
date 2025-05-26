import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.jsx';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

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
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          major_topics: [],
          articles: []
        })
      })
    );
  });

  it('renders topics and articles on home', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/loading topics/i)).toBeInTheDocument();
    });
  });

  it('navigates to topic detail', async () => {
    window.history.pushState({}, '', '/topic/Faith');
    render(
      <MemoryRouter initialEntries={["/topic/Faith"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/loading topic|topic not found/i)).toBeInTheDocument();
    });
  });

  it('shows 404 for unknown route', async () => {
    window.history.pushState({}, '', '/random');
    render(
      <MemoryRouter initialEntries={["/random"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/404/i)).toBeInTheDocument();
    });
  });
});

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

const originalFetch = global.fetch;

describe('App UI', () => {
  beforeEach(() => {
    global.fetch = jest.fn(url => {
      if (url.includes('bible_scripture_categories.json')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ major_topics: mockTopics })
        });
      }
      if (url.includes('articles.json')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ articles: mockArticles })
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({})
      });
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.fetch = originalFetch;
  });

  it('renders topics and articles on home', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // wait for fetches to resolve and content to render
    await screen.findByText('Faith');
    expect(screen.getByText('Faith')).toBeInTheDocument();
    expect(screen.getByText('Faith Article')).toBeInTheDocument();
  });

  it('navigates to topic detail', async () => {
    window.history.pushState({}, '', '/topic/Faith');
    render(
      <MemoryRouter initialEntries={["/topic/Faith"]}>
        <App />
      </MemoryRouter>
    );

    await screen.findByText('Faith');
    const descs = screen.getAllByText('Belief desc');
    expect(descs.length).toBeGreaterThan(0);
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

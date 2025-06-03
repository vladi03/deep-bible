import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ArticleView from './components/ArticleView.jsx';
import '@testing-library/jest-dom';

const mockArticles = [
  {
    id: '1',
    title: 'Test Article',
    author: 'John',
    publishedDate: '2024-01-01',
    summary: 'Summary',
    content: [
      { title: 'Section', paragraphs: ['Para'] }
    ],
    tags: ['t']
  }
];
const originalFetch = global.fetch;

describe('ArticleView', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ articles: mockArticles })
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.fetch = originalFetch;
  });

  it('shows loading then renders article', async () => {
    render(<ArticleView articleId="1" onBack={() => {}} />);
    expect(screen.getByText(/Loading article/i)).toBeInTheDocument();
    await screen.findByText('Test Article');
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });

  it('shows not found for unknown id', async () => {
    render(<ArticleView articleId="2" onBack={() => {}} />);
    await screen.findByText(/Article not found/i);
  });

  it('shows not found when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('fail'));
    render(<ArticleView articleId="1" onBack={() => {}} />);
    await screen.findByText(/Article not found/i);
  });
});

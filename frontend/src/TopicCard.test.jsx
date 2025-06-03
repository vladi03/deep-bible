import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopicCard from './components/TopicCard.jsx';
import '@testing-library/jest-dom';

const topic = {
  title: 'Faith',
  description: 'Faith desc',
  icon: '<svg></svg>'
};

describe('TopicCard', () => {
  it('renders info and handles click', () => {
    const onReadMore = jest.fn();
    render(<TopicCard topic={topic} onReadMore={onReadMore} />);
    expect(screen.getByText('Faith')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Read More'));
    expect(onReadMore).toHaveBeenCalled();
  });
});

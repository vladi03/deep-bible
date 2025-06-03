import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DesktopCategoryView from './components/DesktopCategoryView.jsx';
import '@testing-library/jest-dom';

const mockTopic = {
  title: 'Faith',
  description: 'Faith desc',
  categories: [
    {
      category_name: 'Belief',
      category_description: 'Belief desc',
      scriptures: [
        { reference: 'Heb 11:1', text: 'Now faith', context_description: 'ctx' }
      ]
    },
    {
      category_name: 'Trust',
      category_description: 'Trust desc',
      scriptures: [
        { reference: 'Ps 1', text: 'Blessed', context_description: 'ctx2' }
      ]
    }
  ]
};

describe('DesktopCategoryView', () => {
  it('renders tabs and scripture content', () => {
    render(
      <DesktopCategoryView
        selectedTopic={mockTopic}
        activeTab={0}
        setActiveTab={() => {}}
      />
    );
    expect(screen.getByText('Faith')).toBeInTheDocument();
    expect(screen.getAllByText('Belief')[0]).toBeInTheDocument();
    expect(screen.getByText('Heb 11:1')).toBeInTheDocument();
  });

  it('changes tab on click', () => {
    const setActiveTab = jest.fn();
    render(
      <DesktopCategoryView
        selectedTopic={mockTopic}
        activeTab={0}
        setActiveTab={setActiveTab}
      />
    );
    fireEvent.click(screen.getByText('Trust'));
    expect(setActiveTab).toHaveBeenCalledWith(1);
  });
});

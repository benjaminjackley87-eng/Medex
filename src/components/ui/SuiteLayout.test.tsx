import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { SuiteLayout } from './SuiteLayout';
import { Heart, Activity } from 'lucide-react';

// Mock useColumnWidths to avoid localStorage side effects
vi.mock('../../hooks/useColumnWidths', () => ({
  useColumnWidths: () => ({
    sidebarWidth: 240,
    setSidebarWidth: vi.fn(),
    detailWidth: 384,
    setDetailWidth: vi.fn()
  })
}));

describe('SuiteLayout', () => {
  const defaultProps = {
    title: 'Test Suite',
    category: 'Test Category',
    activeTab: 'tab1',
    tabs: [
      { id: 'tab1', label: 'Tab 1', icon: Heart },
      { id: 'tab2', label: 'Tab 2', icon: Activity }
    ],
    onSelectTab: vi.fn(),
    onBack: vi.fn(),
    sidebarContent: <div data-testid="sidebar-content">Sidebar Content</div>,
    sidebarTitle: 'My Sidebar',
    children: <div data-testid="main-content">Main Content</div>,
    detailContent: <div data-testid="detail-content">Detail Content</div>,
    detailTitle: 'My Detail'
  };

  it('renders header elements correctly', () => {
    const { getByText, getAllByText } = render(<SuiteLayout {...defaultProps} />);
    expect(getByText('Test Suite')).toBeInTheDocument();
    expect(getByText('Test Category')).toBeInTheDocument();
    expect(getAllByText('Tab 1').length).toBeGreaterThan(0);
    expect(getByText('Tab 2')).toBeInTheDocument();
  });

  it('renders all three columns', () => {
    const { getByTestId, getByText } = render(<SuiteLayout {...defaultProps} />);
    expect(getByTestId('sidebar-content')).toBeInTheDocument();
    expect(getByText('My Sidebar')).toBeInTheDocument();

    expect(getByTestId('main-content')).toBeInTheDocument();

    expect(getByTestId('detail-content')).toBeInTheDocument();
    expect(getByText('My Detail')).toBeInTheDocument();
  });

  it('fires onBack when back button is clicked', () => {
    const onBackMock = vi.fn();
    const { getByText } = render(<SuiteLayout {...defaultProps} onBack={onBackMock} />);

    fireEvent.click(getByText('Back').closest('button')!);
    expect(onBackMock).toHaveBeenCalled();
  });

  it('fires onSelectTab when a tab is clicked', () => {
    const onSelectTabMock = vi.fn();
    const { getByText } = render(<SuiteLayout {...defaultProps} onSelectTab={onSelectTabMock} />);

    fireEvent.click(getByText('Tab 2').closest('button')!);
    expect(onSelectTabMock).toHaveBeenCalledWith('tab2');
  });

  it('collapses and expands the sidebar', () => {
    const { container, queryByTestId, getByTitle } = render(<SuiteLayout {...defaultProps} />);

    // Sidebar should be present
    expect(queryByTestId('sidebar-content')).toBeInTheDocument();

    // Find the collapse button for sidebar (it's absolute positioned left)
    const collapseBtn = container.querySelector('aside button');
    expect(collapseBtn).toBeInTheDocument();

    fireEvent.click(collapseBtn!);

    // Now sidebar content should be hidden
    expect(queryByTestId('sidebar-content')).not.toBeInTheDocument();

    // Expand it again
    const expandBtn = getByTitle('Expand Navigation');
    fireEvent.click(expandBtn);

    expect(queryByTestId('sidebar-content')).toBeInTheDocument();
  });
});

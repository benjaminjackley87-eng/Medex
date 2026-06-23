import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BentoCard } from './BentoCard';

describe('BentoCard Component', () => {
  it('renders children correctly', () => {
    render(<BentoCard>Test Content</BentoCard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies interactive hover classes when interactive is true', () => {
    const { container } = render(<BentoCard interactive>Interactive Card</BentoCard>);
    const div = container.firstChild as HTMLDivElement;
    expect(div.className).toContain('hover:scale-[1.01]');
  });

  it('handles click events when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<BentoCard onClick={handleClick}>Clickable Card</BentoCard>);

    const element = screen.getByText('Clickable Card');
    fireEvent.click(element);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom class names', () => {
    const { container } = render(<BentoCard className="custom-test-class">Styled Card</BentoCard>);
    const div = container.firstChild as HTMLDivElement;
    expect(div.className).toContain('custom-test-class');
  });
});

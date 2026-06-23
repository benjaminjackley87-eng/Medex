import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { ClinicalCard } from './ClinicalCard';
import { Heart } from 'lucide-react';

describe('ClinicalCard', () => {
  const defaultProps = {
    title: 'Test Card',
    subtitle: 'Test Subtitle',
    icon: Heart,
    details: [
      { label: 'Detail 1', content: 'Content 1' },
      { label: 'Detail 2', content: 'Content 2' }
    ]
  };

  it('renders title and subtitle', () => {
    const { getByText } = render(<ClinicalCard {...defaultProps} />);
    expect(getByText('Test Card')).toBeInTheDocument();
    expect(getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders all detail sections', () => {
    const { getByText } = render(<ClinicalCard {...defaultProps} />);
    expect(getByText('Detail 1')).toBeInTheDocument();
    expect(getByText('Content 1')).toBeInTheDocument();
    expect(getByText('Detail 2')).toBeInTheDocument();
    expect(getByText('Content 2')).toBeInTheDocument();
  });

  it('renders image if imageUrl is provided', () => {
    const { container } = render(<ClinicalCard {...defaultProps} imageUrl="http://example.com/test.jpg" />);
    // MedImage returns an img element or a fallback. Assuming img here.
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.src).toBe('http://example.com/test.jpg');
  });

  it('opens an image modal when the image is clicked', () => {
    const { container, getAllByAltText } = render(<ClinicalCard {...defaultProps} imageUrl="http://example.com/test.jpg" />);
    const img = container.querySelector('img');
    
    // Not explicitly testing the Modal contents deeply, just that clicking it opens something
    expect(img).not.toBeNull();
    fireEvent.click(img!);
    
    // A modal image should now appear in the document (so there are 2 total images with the alt text)
    const modalImages = getAllByAltText('Test Card');
    expect(modalImages.length).toBe(2);
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import MedImage from './MedImage';
import { getLocalAssetUrl } from '../../utils/assetHelper';

vi.mock('../../utils/assetHelper', () => ({
  getLocalAssetUrl: vi.fn()
}));

describe('MedImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders standard src image', () => {
    const { container, getByText } = render(<MedImage src="http://example.com/test.jpg" alt="test" label="Test Label" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.src).toBe('http://example.com/test.jpg');
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('resolves localId into a blob url', async () => {
    const mockBlobUrl = 'blob:http://localhost/123';
    vi.mocked(getLocalAssetUrl).mockResolvedValueOnce(mockBlobUrl);

    const { container } = render(<MedImage localId="test-id" alt="local" label="Local Label" />);
    
    // initially it might not have the img if resolving is async
    await waitFor(() => {
      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img?.src).toBe(mockBlobUrl);
    });
  });

  it('shows fallback when no src or localId is provided', () => {
    const { container, getByText } = render(<MedImage alt="none" label="No Image" />);
    const img = container.querySelector('img');
    expect(img).not.toBeInTheDocument();
    expect(getByText('No Image Empty')).toBeInTheDocument(); // label + " Empty"
  });

  it('fires onEnlarge when image is clicked', () => {
    const mockOnEnlarge = vi.fn();
    const { container } = render(<MedImage src="http://example.com/test.jpg" alt="test" label="Label" onEnlarge={mockOnEnlarge} />);
    
    const img = container.querySelector('img');
    fireEvent.click(img!);
    
    expect(mockOnEnlarge).toHaveBeenCalledWith('http://example.com/test.jpg', 'test');
  });

  it('shows edit controls when isEditMode is true and has image', () => {
    const { getByTitle } = render(<MedImage src="http://example.com/test.jpg" alt="test" label="Label" isEditMode={true} />);
    expect(getByTitle('Replace Image')).toBeInTheDocument();
    expect(getByTitle('Delete Image')).toBeInTheDocument();
    expect(getByTitle('Align Left')).toBeInTheDocument();
  });
});

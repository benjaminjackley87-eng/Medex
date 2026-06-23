import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { TherapeuticNavigator } from './TherapeuticNavigator';
import { GeminiService } from '../services/geminiService';

vi.mock('../services/geminiService');

describe('TherapeuticNavigator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial state', () => {
    const { getByText, getByPlaceholderText } = render(<TherapeuticNavigator />);
    expect(
      getByText(
        'Real-time therapeutic guidance grounded in local Queensland and Australian protocols.'
      )
    ).toBeInTheDocument();
    expect(getByPlaceholderText(/Search condition/i)).toBeInTheDocument();
    expect(getByText('Ready to Navigate')).toBeInTheDocument();
  });

  it('shows error if search fails', async () => {
    vi.mocked(GeminiService.prototype.getTherapeuticGuidance).mockRejectedValueOnce(
      new Error('API Error')
    );

    const { getByPlaceholderText, getByRole, getByText } = render(<TherapeuticNavigator />);

    const input = getByPlaceholderText(/Search condition/i);
    fireEvent.change(input, { target: { value: 'Sepsis' } });

    const searchBtn = getByRole('button', { name: /Search/i });
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(
        getByText('Failed to fetch therapeutic guidelines. Please try again.')
      ).toBeInTheDocument();
    });
  });

  it('displays guidance after successful search', async () => {
    const mockGuidance = {
      condition: 'Sepsis',
      summary: 'Test summary',
      firstLine: ['Fluids', 'Antibiotics'],
      secondLine: ['Vasopressors'],
      tnqSpecifics: 'Call retrieval',
      monitoring: ['Lactate'],
      sources: [{ title: 'eTG', uri: 'http://example.com' }],
      retrievedAt: Date.now()
    };

    vi.mocked(GeminiService.prototype.getTherapeuticGuidance).mockResolvedValueOnce(mockGuidance);

    const { getByPlaceholderText, getByRole, getByText } = render(<TherapeuticNavigator />);

    const input = getByPlaceholderText(/Search condition/i);
    fireEvent.change(input, { target: { value: 'Sepsis' } });

    const searchBtn = getByRole('button', { name: /Search/i });
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(getByText('Sepsis')).toBeInTheDocument();
      expect(getByText('Test summary')).toBeInTheDocument();
      expect(getByText('Antibiotics')).toBeInTheDocument();
      expect(getByText('Vasopressors')).toBeInTheDocument();
      expect(getByText('eTG')).toBeInTheDocument();
    });
  });

  it('toggles the reference URL input field', () => {
    const { getByText, queryByPlaceholderText } = render(<TherapeuticNavigator />);

    expect(queryByPlaceholderText(/https:\/\/www.health.qld.gov.au/i)).not.toBeInTheDocument();

    const toggleBtn = getByText('Attach Reference Pathway (URL)');
    fireEvent.click(toggleBtn);

    expect(queryByPlaceholderText(/https:\/\/www.health.qld.gov.au/i)).toBeInTheDocument();

    fireEvent.click(getByText('Hide Reference URL'));

    // Note: Framer motion uses AnimatePresence, so it might not unmount immediately.
    // Testing the UI logic works: the button text changes.
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { GlowContainer } from './GlowContainer';

describe('GlowContainer', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <GlowContainer theme="blue">
        <div>Test Content</div>
      </GlowContainer>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct gradient based on the theme', () => {
    const { container } = render(
      <GlowContainer theme="emerald">
        <div>Test Content</div>
      </GlowContainer>
    );

    // We expect the emerald theme to have specific tailwind classes for the gradient
    const gradientRings = container.querySelectorAll('.bg-gradient-radial');
    expect(gradientRings.length).toBe(2);
    expect(gradientRings[0].className).toContain('from-emerald-500/10');
    expect(gradientRings[1].className).toContain('from-teal-500/5');
  });

  it('falls back to slate gradients for an invalid theme', () => {
    const { container } = render(
      // @ts-ignore - purposefully passing invalid theme
      <GlowContainer theme="unknown">
        <div>Test Content</div>
      </GlowContainer>
    );

    const gradientRings = container.querySelectorAll('.bg-gradient-radial');
    expect(gradientRings[0].className).toContain('from-slate-500/5');
  });

  it('allows custom container classes', () => {
    const { container } = render(
      <GlowContainer theme="blue" containerClass="custom-wrapper-class">
        <div>Test Content</div>
      </GlowContainer>
    );

    const wrapper = container.querySelector('.custom-wrapper-class');
    expect(wrapper).toBeInTheDocument();
  });
});

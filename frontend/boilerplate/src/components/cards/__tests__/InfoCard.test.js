import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import InfoCard from '../InfoCard';

// Mock theme for testing
const mockTheme = {
  'primary-color': '#8231D3',
  'secondary-color': '#FF6B72',
  mainContent: 'lightMode',
  lightMode: {
    'gray-text': '#666D92',
  },
  darkMode: {
    'gray-text': '#ADB5D9',
  },
};

// Test wrapper component
function TestWrapper({ children }) {
  return <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>;
}


describe('InfoCard Component', () => {
  test('renders with default props', () => {
    const { container } = render(<InfoCard />, { wrapper: TestWrapper });
    expect(container.textContent).toContain('Total Products');
    expect(container.textContent).toContain('21k');
    expect(container.querySelector('[aria-label="21k Total Products"]')).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  test('renders with custom text and counter', () => {
    const { container } = render(<InfoCard text="New Users" counter="500" />, { wrapper: TestWrapper });
    expect(container.textContent).toContain('New Users');
    expect(container.textContent).toContain('500');
    expect(container.querySelector('[aria-label="500 New Users"]')).toBeInTheDocument();
  });

  test('renders with a specific icon', () => {
    const { container } = render(<InfoCard icon="UilUsersAlt" />, { wrapper: TestWrapper });
    // This checks if the UilUsersAlt icon is rendered.
    // The actual SVG content is hard to assert directly, so we check for its presence via role.
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  test('applies primary type styles', () => {
    const { container } = render(<InfoCard type="primary" />, { wrapper: TestWrapper });
    const card = container.querySelector('.ninjadash-infocard-style');
    expect(card).toHaveStyle(`background-color: ${mockTheme['primary-color']}`);
  });

  test('applies secondary type styles', () => {
    const { container } = render(<InfoCard type="secondary" />, { wrapper: TestWrapper });
    const card = container.querySelector('.ninjadash-infocard-style');
    expect(card).toHaveStyle(`background-color: ${mockTheme['secondary-color']}`);
  });

  test('has correct accessibility attributes', () => {
    const { container } = render(<InfoCard text="Sales" counter="1.2M" />, { wrapper: TestWrapper });
    expect(container.querySelector('[aria-label="1.2M Sales"]')).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  test('renders fallback icon if specified icon is not found', () => {
    const { container } = render(<InfoCard icon="NonExistentIcon" />, { wrapper: TestWrapper });
    // Expecting UilQuestionCircle as fallback
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});

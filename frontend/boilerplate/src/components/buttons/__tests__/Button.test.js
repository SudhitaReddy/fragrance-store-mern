import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Button } from '../buttons';

// Mock theme for testing
const mockTheme = {
  'primary-color': '#8231D3',
  'primary-hover': '#6726A8',
  'white-color': '#ffffff',
  'gray-color': '#404040',
  'border-color-normal': '#E3E6EF',
  'btn-height-large': '50px',
  'btn-height-small': '38px',
  'btn-height-extra-small': '32px',
  mainContent: 'lightMode',
  rtl: false,
  topMenu: false,
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


describe('Button Component', () => {
  test('renders button with text', () => {
    const { container } = render(
      <TestWrapper>
        <Button>Click me</Button>
      </TestWrapper>,
    );
    expect(container.textContent).toContain('Click me');
  });

  test('renders button with different types', () => {
    const { container, rerender } = render(
      <TestWrapper>
        <Button type="primary">Primary</Button>
      </TestWrapper>,
    );
    expect(container.textContent).toContain('Primary');

    rerender(
      <TestWrapper>
        <Button type="secondary">Secondary</Button>
      </TestWrapper>,
    );
    expect(container.textContent).toContain('Secondary');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <TestWrapper>
        <Button onClick={handleClick}>Click Me</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state when load prop is true', (done) => {
    const { container } = render(
      <TestWrapper>
        <Button load>Loading Button</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    fireEvent.click(button);

    // Check if button has loading attribute
    expect(button).toHaveAttribute('loading');
    expect(button).toBeDisabled();

    // Wait for loading to finish
    setTimeout(() => {
      expect(button).not.toHaveAttribute('loading');
      expect(button).not.toBeDisabled();
      done();
    }, 2100);
  });

  test('shows external loading state', () => {
    const { container } = render(
      <TestWrapper>
        <Button loading>External Loading</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveAttribute('loading');
    expect(button).toBeDisabled();
  });

  test('renders outlined button', () => {
    const { container } = render(
      <TestWrapper>
        <Button outlined>Outlined Button</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveStyle('border-width: 1px');
  });

  test('renders ghost button', () => {
    const { container } = render(
      <TestWrapper>
        <Button ghost>Ghost Button</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveStyle('background-color: transparent');
  });

  test('renders raised button', () => {
    const { container } = render(
      <TestWrapper>
        <Button raised>Raised Button</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveStyle('box-shadow: 0 10px 10px rgba(82, 67, 170, 0.03)');
  });

  test('renders squared button', () => {
    const { container } = render(
      <TestWrapper>
        <Button squared>Squared Button</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveStyle('border-radius: 0px');
  });

  test('renders social button', () => {
    const { container } = render(
      <TestWrapper>
        <Button social>Social Button</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveStyle('padding: 0 15px');
  });

  test('has proper accessibility attributes', () => {
    const { container } = render(
      <TestWrapper>
        <Button>Accessible Button</Button>
      </TestWrapper>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label', 'Accessible Button');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef();
    render(
      <TestWrapper>
        <Button ref={ref}>Ref Button</Button>
      </TestWrapper>,
    );

    expect(ref.current).toBeInTheDocument();
  });
});

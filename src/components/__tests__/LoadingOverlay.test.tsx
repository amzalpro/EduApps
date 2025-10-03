import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingOverlay } from '../LoadingOverlay';

describe('LoadingOverlay', () => {
  it('should render with title and status', () => {
    render(
      <LoadingOverlay 
        title="Loading..." 
        status="Initializing" 
        progress={50} 
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Initializing')).toBeInTheDocument();
  });

  it('should render with custom title', () => {
    render(
      <LoadingOverlay 
        title="Processing Data" 
        status="Please wait" 
        progress={25} 
      />
    );

    expect(screen.getByText('Processing Data')).toBeInTheDocument();
  });

  it('should render with custom status', () => {
    render(
      <LoadingOverlay 
        title="Test" 
        status="Custom status message" 
        progress={75} 
      />
    );

    expect(screen.getByText('Custom status message')).toBeInTheDocument();
  });

  it('should render progress bar with correct width', () => {
    const { container } = render(
      <LoadingOverlay 
        title="Test" 
        status="Loading" 
        progress={60} 
      />
    );

    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '60%' });
  });

  it('should render progress bar at 0%', () => {
    const { container } = render(
      <LoadingOverlay 
        title="Test" 
        status="Starting" 
        progress={0} 
      />
    );

    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '0%' });
  });

  it('should render progress bar at 100%', () => {
    const { container } = render(
      <LoadingOverlay 
        title="Test" 
        status="Complete" 
        progress={100} 
      />
    );

    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '100%' });
  });

  it('should have loading spinner icon', () => {
    const { container } = render(
      <LoadingOverlay 
        title="Test" 
        status="Loading" 
        progress={50} 
      />
    );

    // Check for the loading spinner (Loader2 component renders an SVG)
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should have overlay covering entire screen', () => {
    const { container } = render(
      <LoadingOverlay 
        title="Test" 
        status="Loading" 
        progress={50} 
      />
    );

    const overlay = container.querySelector('.fixed.inset-0');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('bg-black', 'bg-opacity-70');
  });
});

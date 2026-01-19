import React, { ReactNode } from 'react';
import LoadingThrobber from './LoadingThrobber';

/**
 * Wraps a lazy-loaded component with Suspense and a loading fallback.
 * Use this for sub-components that should load on-demand within pages.
 */
export const lazyWithSuspense = (
  lazyComponent: React.LazyExoticComponent<React.ComponentType<any>>,
  message = 'Loading component...',
  size: 'sm' | 'md' | 'lg' = 'md'
) => {
  return (
    <React.Suspense fallback={<LoadingThrobber message={message} size={size} />}>
      {React.createElement(lazyComponent)}
    </React.Suspense>
  );
};

/**
 * Renders a lazy component with props, wrapped in Suspense and a fast fade-in animation.
 * Uses GPU-accelerated transforms for optimal performance.
 */
export const LazyBoundary: React.FC<{
  children: React.ReactNode;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, message = 'Loading...', size = 'md' }) => (
  <React.Suspense fallback={<LoadingThrobber message={message} size={size} />}>
    <div className="animate-fadeIn" style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden' }}>
      {children}
    </div>
  </React.Suspense>
);

import React from 'react';

interface LoadingThrobberProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingThrobber: React.FC<LoadingThrobberProps> = ({ 
  message = 'Loading...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  const containerClasses = {
    sm: 'min-h-[100px]',
    md: 'min-h-[200px]',
    lg: 'min-h-[300px]',
  };

  return (
    <div className={`flex items-center justify-center ${containerClasses[size]}`}>
      <div className="text-center">
        <div className={`inline-block animate-spin rounded-full border-slate-300 border-t-emerald-600 ${sizeClasses[size]}`}></div>
        <p className="mt-4 text-slate-600 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default LoadingThrobber;

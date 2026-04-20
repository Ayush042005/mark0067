import React from 'react';
import './Skeleton.css';

export const Skeleton = ({ width, height, borderRadius, style, className = '' }) => {
  const mergedStyle = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius || 'var(--radius-sm)',
    ...style
  };

  return (
    <div 
      className={`skeleton animate-shimmer ${className}`} 
      style={mergedStyle}
      aria-hidden="true"
    />
  );
};

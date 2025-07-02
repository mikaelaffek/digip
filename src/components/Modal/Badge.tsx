"use client";

import React from 'react';
import styles from './Modal.module.css';
import { BadgeProps } from './types/badge';

/**
 * A reusable badge component for displaying status, countries, etc.
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  type = 'status',
  backgroundColor,
  color,
}) => {
  let badgeClassName = styles.badge;
  
  // Apply type-specific class
  if (type === 'country') {
    badgeClassName = styles.countryBadge;
  }
  
  // Apply custom styles if provided
  const customStyle = {
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(color ? { color } : {}),
  };
  
  return (
    <span 
      className={`${badgeClassName} ${className}`}
      style={customStyle}
    >
      {children}
    </span>
  );
};

export default Badge;

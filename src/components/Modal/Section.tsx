"use client";

import React from 'react';
import styles from './Modal.module.css';
import { SectionProps } from './types/section';

/**
 * A reusable component for organizing content into sections within modals
 */
const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = '',
  titleClassName = '',
}) => {
  return (
    <div className={`${styles.modalSection} ${className}`}>
      <h3 className={titleClassName}>{title}</h3>
      {children}
    </div>
  );
};

export default Section;

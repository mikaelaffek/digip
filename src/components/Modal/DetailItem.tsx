"use client";

import React from 'react';
import styles from './Modal.module.css';
import { DetailItemProps } from './types/detail-item';

/**
 * A reusable component for displaying labeled details in modals or other UI elements
 */
const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  className = '',
  labelClassName = '',
  valueClassName = '',
}) => {
  // Don't render if value is null, undefined, or empty string
  if (value === null || value === undefined || value === '') return null;
  
  return (
    <div className={`${styles.detailItem} ${className}`}>
      <span className={`${styles.detailLabel} ${labelClassName}`}>{label}:</span>
      <span className={`${styles.detailValue} ${valueClassName}`}>{value}</span>
    </div>
  );
};

export default DetailItem;

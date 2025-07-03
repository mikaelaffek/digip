"use client";

import React from 'react';
import styles from '@/components/Modal/styles/ModalComponent.module.css';
import { ModalDetailItemProps } from '@/components/Modal/types/modal-detail-item';

const ModalDetailItem: React.FC<ModalDetailItemProps> = ({
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

export default ModalDetailItem;

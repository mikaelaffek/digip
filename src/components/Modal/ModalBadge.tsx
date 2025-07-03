"use client";

import React from 'react';
import styles from '@/components/Modal/styles/ModalComponent.module.css';
import { ModalBadgeProps } from '@/components/Modal/types/modal-badge';

const badgeTypeClassMap: Record<string, string> = {
  status: styles.badge,
  country: styles.countryBadge,
};

const ModalBadge: React.FC<ModalBadgeProps> = ({
  children,
  className = '',
  type = 'status',
  backgroundColor,
  color,
}) => {
  const badgeClassName = badgeTypeClassMap[type] || styles.badge;

  const customStyle: React.CSSProperties = {
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

export type { ModalBadgeProps };
export default ModalBadge;
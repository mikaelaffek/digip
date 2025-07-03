"use client";

import React from 'react';
import styles from './styles/ModalComponent.module.css';
import { ModalSectionProps } from '@/components/Modal/types/modal-section';

const ModalSection: React.FC<ModalSectionProps> = ({
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

export default ModalSection;

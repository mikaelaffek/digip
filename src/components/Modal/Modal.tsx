"use client";

import React, { CSSProperties } from 'react';
import styles from './Modal.module.css';
import { ModalProps } from './types/modal';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  contentClassName = '',
  headerClassName = '',
  width,
  maxHeight,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const modalStyle = {
    ...(width ? { width } : {}),
    ...(maxHeight ? { maxHeight } : {}),
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`${styles.modal} ${className}`} 
        onClick={handleModalClick}
        style={modalStyle}
      >
        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
          </div>
        )}
        <div className={`${styles.modalHeader} ${headerClassName}`}>
          {title ? <h2>{title}</h2> : <div></div>}
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={`${styles.modalContent} ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

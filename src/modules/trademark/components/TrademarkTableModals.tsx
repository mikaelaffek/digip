"use client";

import React, { useState, useEffect } from 'react';
import { Trademark } from '../../../types/trademark';
import { Modal } from '../../../components/Modal';
import TrademarkDetailsModal from './TrademarkDetailsModal';

interface TrademarkModalProps {
  trademark: Trademark;
  onClose: () => void;
}

/**
 * Modal component for displaying trademark details
 * Uses the generic Modal component with TrademarkDetailsModal content
 */
const TrademarkModal: React.FC<TrademarkModalProps> = ({ trademark, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading when modal opens
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate data loading with a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [trademark.id]); // Reset loading when trademark changes
  
  // Handle closing with loading animation
  const handleClose = () => {
    setIsLoading(true);
    
    // Add a small delay before actually closing
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  return (
    <Modal 
      isOpen={true} 
      onClose={handleClose}
      width="700px"
      maxHeight="90vh"
      isLoading={isLoading}
    >
      <TrademarkDetailsModal trademark={trademark} />
    </Modal>
  );
};

export default TrademarkModal;

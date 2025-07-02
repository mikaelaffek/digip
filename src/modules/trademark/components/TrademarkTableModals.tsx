"use client";

import React from 'react';
import { Trademark } from '../../../types/trademark';
import { Modal } from '../../../components/Modal';
import TrademarkDetailsModal from './TrademarkDetailsModal';

interface TrademarkModalProps {
  trademark: Trademark;
  onClose: () => void;
}

const TrademarkModal: React.FC<TrademarkModalProps> = ({ trademark, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <TrademarkDetailsModal trademark={trademark} />
    </Modal>
  );
};




export default TrademarkModal;

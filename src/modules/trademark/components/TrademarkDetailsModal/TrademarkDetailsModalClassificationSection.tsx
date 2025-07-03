"use client";

import React from 'react';
import { TrademarkProperties } from '@/types/trademark';
import ModalDetailItem from '@/components/Modal/ModalDetailItem';
import ModalSection from '@/components/Modal/ModalSection';

interface TrademarkDetailsModalClassificationSectionProps {
  properties: TrademarkProperties;
}

const TrademarkDetailsModalClassificationSection: React.FC<TrademarkDetailsModalClassificationSectionProps> = ({ properties }) => {
  return (
    <ModalSection title="Classification">
      <ModalDetailItem 
        label="Classes" 
        value={properties.class_numbers ? properties.class_numbers.join(", ") : null} 
      />
      <ModalDetailItem label="Goods & Services" value={properties.goods_and_services} />
    </ModalSection>
  );
};

export default TrademarkDetailsModalClassificationSection;

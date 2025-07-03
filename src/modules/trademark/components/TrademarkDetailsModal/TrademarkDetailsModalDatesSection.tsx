"use client";

import React from 'react';
import { TrademarkProperties } from '@/types/trademark';
import ModalDetailItem from '@/components/Modal/ModalDetailItem';
import ModalSection from '@/components/Modal/ModalSection';
import { formatDate } from '@/utils/dateUtils';

interface TrademarkDetailsModalDatesSectionProps {
  properties: TrademarkProperties;
}

const TrademarkDetailsModalDatesSection: React.FC<TrademarkDetailsModalDatesSectionProps> = ({ properties }) => {
  return (
    <ModalSection title="Dates">
      <ModalDetailItem 
        label="Registration Date" 
        value={properties.registration_date ? formatDate(properties.registration_date) : null} 
      />
      <ModalDetailItem 
        label="Application Date" 
        value={properties.application_date ? formatDate(properties.application_date) : null} 
      />
      <ModalDetailItem 
        label="Expiry Date" 
        value={properties.expiry_date ? formatDate(properties.expiry_date) : null} 
      />
    </ModalSection>
  );
};

export default TrademarkDetailsModalDatesSection;

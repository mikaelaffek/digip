"use client";

import React from 'react';
import { TrademarkProperties } from '@/types/trademark';
import ModalDetailItem from '@/components/Modal/ModalDetailItem';
import ModalSection from '@/components/Modal/ModalSection';

interface TrademarkDetailsModalOwnershipSectionProps {
  properties: TrademarkProperties;
}

const TrademarkDetailsModalOwnershipSection: React.FC<TrademarkDetailsModalOwnershipSectionProps> = ({ properties }) => {
  return (
    <ModalSection title="Ownership">
      <ModalDetailItem label="Owner" value={properties.applicant_legal_name} />
      <ModalDetailItem label="City" value={properties.applicant_city} />
      <ModalDetailItem label="Country" value={properties.applicant_country} />
      <ModalDetailItem label="Address" value={properties.applicant_street_address} />
    </ModalSection>
  );
};

export default TrademarkDetailsModalOwnershipSection;

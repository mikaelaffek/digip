"use client";

import React from 'react';
import { TrademarkProperties } from '@/types/trademark';
import ModalDetailItem from '@/components/Modal/ModalDetailItem';
import ModalSection from '@/components/Modal/ModalSection';

const TrademarkDetailsModalRegionSection: React.FC<TrademarkProperties> = ({ properties }) => {
  return (
    <ModalSection title="Region">
      <ModalDetailItem label="Region" value={properties.region} />
    </ModalSection>
  );
};

export default TrademarkDetailsModalRegionSection;

"use client";

import React from 'react';
import { TrademarkProperties } from '@/types/trademark';
import ModalSection from '@/components/Modal/ModalSection';
import ModalBadge from '@/components/Modal/ModalBadge';
import styles from '../../styles/TrademarkDetailsModal.module.css';

interface TrademarkDetailsModalDesignatedCountriesSectionProps {
  properties: TrademarkProperties;
}

const TrademarkDetailsModalDesignatedCountriesSection: React.FC<TrademarkDetailsModalDesignatedCountriesSectionProps> = ({ properties }) => {
  if (!properties.designated_countries || properties.designated_countries.length === 0) {
    return null;
  }
  
  return (
    <ModalSection title="Designated Countries">
      <div className={styles.badgeContainer}>
        {properties.designated_countries.map((country: string) => (
          <ModalBadge key={country} type="country">
            {country}
          </ModalBadge>
        ))}
      </div>
    </ModalSection>
  );
};

export default TrademarkDetailsModalDesignatedCountriesSection;

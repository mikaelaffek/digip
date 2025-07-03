"use client";

import React from 'react';
import { Trademark } from '@/types/trademark';
import TrademarkDetailsModalLogoTitle from './TrademarkDetailsModal/TrademarkDetailsModalLogoTitle';
import TrademarkDetailsModalDatesSection from './TrademarkDetailsModal/TrademarkDetailsModalDatesSection';
import TrademarkDetailsModalOwnershipSection from './TrademarkDetailsModal/TrademarkDetailsModalOwnershipSection';
import TrademarkDetailsModalClassificationSection from './TrademarkDetailsModal/TrademarkDetailsModalClassificationSection';
import TrademarkDetailsModalDesignatedCountriesSection from './TrademarkDetailsModal/TrademarkDetailsModalDesignatedCountriesSection';
import TrademarkDetailsModalRegionSection from './TrademarkDetailsModal/TrademarkDetailsModalRegionSection';
import styles from '../styles/TrademarkDetailsModal.module.css';

interface TrademarkDetailsProps {
  trademark: Trademark;
}

const TrademarkDetails: React.FC<TrademarkDetailsProps> = ({ trademark }) => {
  return (
    <div className={styles.trademarkDetails}>
      <TrademarkDetailsModalLogoTitle properties={trademark.properties} />
      <TrademarkDetailsModalDatesSection properties={trademark.properties} />
      <TrademarkDetailsModalOwnershipSection properties={trademark.properties} />
      <TrademarkDetailsModalClassificationSection properties={trademark.properties} />
      <TrademarkDetailsModalDesignatedCountriesSection properties={trademark.properties} />
      <TrademarkDetailsModalRegionSection properties={trademark.properties} />
    </div>
  );
};

export default TrademarkDetails;

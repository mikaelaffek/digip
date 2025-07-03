"use client";

import React from 'react';
import { TrademarkProperties } from '@/types/trademark';
import styles from '../../styles/TrademarkDetailsModal.module.css';

interface TrademarkLogoTitleProps {
  properties: TrademarkProperties;
}

const TrademarkDetailsModalLogoTitle: React.FC<TrademarkLogoTitleProps> = ({ properties }) => {
  return (
    <>
      <h2 className={styles.trademarkTitle}>
        {properties.display_text || 'Trademark Details'}
      </h2>
      
      {properties.logo && (
        <div className={styles.logoContainer}>
          <img
            src={properties.logo}
            alt={properties.display_text || 'Trademark logo'}
            className={styles.trademarkLogo}
          />
        </div>
      )}
    </>
  );
};

export default TrademarkDetailsModalLogoTitle;

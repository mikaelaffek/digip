"use client";

import React from 'react';
import { Trademark } from '../../../types/trademark';
import { DetailItem, Section, Badge } from '../../../components/Modal';
import { formatDate } from '../../../utils/dateUtils';
import styles from './TrademarkDetailsModal.module.css';

interface TrademarkDetailsProps {
  /**
   * The trademark data to display
   */
  trademark: Trademark;
}

/**
 * Component for displaying detailed trademark information
 * Designed to be used with the Modal component
 */
const TrademarkDetails: React.FC<TrademarkDetailsProps> = ({ trademark }) => {
  const { properties } = trademark;

  return (
    <div className={styles.trademarkDetails}>
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
      
      <Section title="Dates">
        <DetailItem 
          label="Registration Date" 
          value={properties.registration_date ? formatDate(properties.registration_date) : null} 
        />
        <DetailItem 
          label="Application Date" 
          value={properties.application_date ? formatDate(properties.application_date) : null} 
        />
        <DetailItem 
          label="Expiry Date" 
          value={properties.expiry_date ? formatDate(properties.expiry_date) : null} 
        />
      </Section>
      
      <Section title="Ownership">
        <DetailItem label="Owner" value={properties.applicant_legal_name} />
        <DetailItem label="City" value={properties.applicant_city} />
        <DetailItem label="Country" value={properties.applicant_country} />
        <DetailItem label="Address" value={properties.applicant_street_address} />
      </Section>
      
      <Section title="Classification">
        <DetailItem 
          label="Classes" 
          value={properties.class_numbers ? properties.class_numbers.join(", ") : null} 
        />
        <DetailItem label="Goods & Services" value={properties.goods_and_services} />
      </Section>
      
      {properties.designated_countries && properties.designated_countries.length > 0 && (
        <Section title="Designated Countries">
          <div className={styles.badgeContainer}>
            {properties.designated_countries.map((country: string) => (
              <Badge key={country} type="country">
                {country}
              </Badge>
            ))}
          </div>
        </Section>
      )}
      
      <Section title="Region">
        <DetailItem label="Region" value={properties.region} />
      </Section>
    </div>
  );
};

export default TrademarkDetails;

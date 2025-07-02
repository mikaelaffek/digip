"use client";

import React from 'react';
import { Trademark } from '../../types/trademark';
import styles from '../../styles/TrademarkTable.module.css';

interface TrademarkModalProps {
  trademark: Trademark;
  onClose: () => void;
}

const TrademarkModal: React.FC<TrademarkModalProps> = ({ trademark, onClose }) => {
  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { properties } = trademark;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.modalHeader}>
          <h2>{properties.display_text || 'Trademark Details'}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.modalContent}>
          <div className={styles.modalRow}>
            {properties.logo && (
              <div className={styles.logoContainer}>
                <img
                  src={properties.logo}
                  alt={properties.display_text || 'Trademark logo'}
                  className={styles.detailLogo}
                />
              </div>
            )}
          </div>
          
          <div className={styles.modalSection}>
            <h3>Dates</h3>
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
          </div>
          
          <div className={styles.modalSection}>
            <h3>Ownership</h3>
            <DetailItem label="Owner" value={properties.applicant_legal_name} />
            <DetailItem label="City" value={properties.applicant_city} />
            <DetailItem label="Country" value={properties.applicant_country} />
            <DetailItem label="Address" value={properties.applicant_street_address} />
          </div>
          
          <div className={styles.modalSection}>
            <h3>Classification</h3>
            <DetailItem 
              label="Classes" 
              value={properties.class_numbers ? properties.class_numbers.join(", ") : null} 
            />
            <DetailItem label="Goods & Services" value={properties.goods_and_services} />
          </div>
          
          {properties.logo && (
            <div className={styles.modalSection}>
              <h3>Trademark Image</h3>
              <img 
                src={properties.logo} 
                alt={`${properties.brand || 'Trademark'} image`} 
                className={styles.trademarkImage}
              />
            </div>
          )}
          
          {properties.designated_countries && properties.designated_countries.length > 0 && (
            <>
              <div className={styles.modalSection}>
                <h3>Designated Countries</h3>
              </div>
              <div className={styles.badgeContainer}>
                {properties.designated_countries.map((country: string) => (
                  <span key={country} className={styles.countryBadge}>
                    {country}
                  </span>
                ))}
              </div>
            </>
          )}
          
          <div className={styles.modalSection}>
            <h3>Region</h3>
            <DetailItem label="Region" value={properties.region} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying detail items
const DetailItem: React.FC<{ label: string; value: string | null | undefined }> = ({
  label,
  value,
}) => {
  if (!value) return null;
  
  return (
    <div className={styles.detailItem}>
      <span className={styles.detailLabel}>{label}:</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
};

export default TrademarkModal;

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

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.modalHeader}>
          <h2>{trademark.properties.display_text || 'Trademark Details'}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.modalContent}>
          <div className={styles.modalRow}>
            {trademark.properties.logo && (
              <div className={styles.logoContainer}>
                <img
                  src={trademark.properties.logo}
                  alt={trademark.properties.display_text || 'Trademark logo'}
                  className={styles.detailLogo}
                />
              </div>
            )}
          </div>
          
          <div className={styles.detailsGrid}>
            <DetailItem label="ID" value={trademark.id} />
            <DetailItem label="Brand" value={trademark.properties.brand} />
            <DetailItem label="Status" value={trademark.properties.status} />
            <DetailItem label="Region" value={trademark.properties.region} />
            <DetailItem label="Application No." value={trademark.properties.application_no} />
            <DetailItem label="Registration No." value={trademark.properties.registration_number} />
            <DetailItem label="Application Date" value={trademark.properties.application_date} />
            <DetailItem label="Registration Date" value={trademark.properties.registration_date} />
            <DetailItem label="Expiry Date" value={trademark.properties.expiry_date} />
            <DetailItem label="Classes" value={trademark.properties.classes} />
            <DetailItem label="Mark Feature" value={trademark.properties.mark_feature} />
            <DetailItem label="Word Mark" value={trademark.properties.word_mark_specification_text} />
          </div>
          
          <div className={styles.sectionTitle}>Applicant Information</div>
          <div className={styles.detailsGrid}>
            <DetailItem label="Legal Name" value={trademark.properties.applicant_legal_name} />
            <DetailItem label="Legal Form" value={trademark.properties.applicant_legal_form} />
            <DetailItem label="Type" value={trademark.properties.applicant_type} />
            <DetailItem label="Country" value={trademark.properties.applicant_country} />
            <DetailItem label="City" value={trademark.properties.applicant_city} />
            <DetailItem label="Address" value={trademark.properties.applicant_street_address} />
          </div>
          
          <div className={styles.sectionTitle}>Goods and Services</div>
          <div className={styles.goodsAndServices}>
            <p>{trademark.properties.goods_and_services}</p>
          </div>
          
          {trademark.properties.designated_countries && 
           trademark.properties.designated_countries.length > 0 && (
            <>
              <div className={styles.sectionTitle}>Designated Countries</div>
              <div className={styles.countriesGrid}>
                {trademark.properties.designated_countries.map((country) => (
                  <span key={country} className={styles.countryBadge}>
                    {country}
                  </span>
                ))}
              </div>
            </>
          )}
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

export default TrademarkModal;

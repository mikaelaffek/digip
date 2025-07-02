"use client";

import React from 'react';
import { Trademark } from '../../../types/trademark';
import { DetailItem, Section, Badge } from '../../../components/Modal';
import { formatDate } from '../../../utils/dateUtils';

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
    <>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', fontWeight: 600 }}>
        {properties.display_text || 'Trademark Details'}
      </h2>
      
      {properties.logo && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <img
            src={properties.logo}
            alt={properties.display_text || 'Trademark logo'}
            style={{ maxWidth: '200px', maxHeight: '200px' }}
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
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
    </>
  );
};

export default TrademarkDetails;

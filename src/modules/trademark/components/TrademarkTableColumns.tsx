import React from 'react';
import { TableColumn } from '../../../types/table';
import { Trademark } from '../../../types/trademark';
import { formatDate } from '../../../utils/dateUtils';
import styles from '../../../styles/TrademarkTable.module.css';

/**
 * Defines the columns for the trademark table
 * Separating this into its own file makes the main component cleaner
 * and allows for easier reuse of column definitions
 */
export const getTrademarkColumns = (onViewClick?: (trademark: Trademark) => void): TableColumn<Trademark>[] => [
  {
    key: 'properties.display_text',
    header: 'Trademark',
    sortable: true,
  },
  {
    key: 'registration_number',
    header: 'Registration No.',
    render: (trademark: Trademark) => trademark.properties.registration_number || 'N/A',
    sortable: true,
  },
  {
    key: 'properties.status',
    header: 'Status',
    render: (trademark: Trademark) => {
      const status = trademark.properties.status || 'Unknown';
      const statusClass = status.replace(/\s+/g, '');
      return (
        <span className={`${styles.statusBadge} ${styles[`status${statusClass}`]}`}>
          {status}
        </span>
      );
    },
    sortable: true,
    type: 'status',
    filterable: true,
  },
  {
    key: 'registration_date',
    header: 'Registration Date',
    render: (trademark: Trademark) => 
      trademark.properties.registration_date 
        ? formatDate(trademark.properties.registration_date)
        : 'N/A',
    sortable: true,
    type: 'date',
    filterable: true,
  },
  {
    key: 'application_date',
    header: 'Application Date',
    render: (trademark: Trademark) => 
      trademark.properties.application_date 
        ? formatDate(trademark.properties.application_date)
        : 'N/A',
    sortable: true,
    type: 'date',
    filterable: true,
  },
  {
    key: 'expiry_date',
    header: 'Expiry Date',
    render: (trademark: Trademark) => 
      trademark.properties.expiry_date 
        ? formatDate(trademark.properties.expiry_date)
        : 'N/A',
    sortable: true,
    type: 'date',
    filterable: true,
  },
  {
    key: 'region',
    header: 'Region',
    render: (trademark: Trademark) => trademark.properties.region || 'N/A',
    sortable: true,
  },
  {
    key: 'mark_feature',
    header: 'Type',
    render: (trademark: Trademark) => trademark.properties.mark_feature || 'N/A',
    sortable: true,
  },
  {
    key: 'designated_countries',
    header: 'Countries',
    render: (trademark: Trademark) => {
      const countries = trademark.properties.designated_countries || [];
      return (
        <div className={styles.countriesContainer}>
          {countries && countries.length > 0 ? (
            countries.slice(0, 3).map((country) => (
              <span key={country} className={styles.countryBadge}>
                {country}
              </span>
            ))
          ) : (
            <span>-</span>
          )}
          {countries && countries.length > 3 && (
            <span className={styles.countryBadge}>+{countries.length - 3}</span>
          )}
        </div>
      );
    },
    sortable: false,
  },
  {
    key: 'view',
    header: 'View',
    render: (trademark: Trademark) => {
      return (
        <button 
          className={styles.viewButton}
          onClick={(e) => {
            // Stop event propagation to prevent the row click handler from firing
            e.stopPropagation();
            // Call the onViewClick handler if provided
            if (onViewClick) {
              onViewClick(trademark);
            }
          }}
        >
          Details
        </button>
      );
    },
    sortable: false,
  },
];

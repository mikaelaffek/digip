"use client";

import React, { useState } from 'react';
import { useTrademarks } from '../../hooks/useTrademarks';
import { Table } from '../Table/Table';
import { Trademark } from '../../types/trademark';
import { TableColumn } from '../../types/table';
import { formatDate } from '../../utils/dateUtils';
import styles from '../../styles/TrademarkTable.module.css';
import TrademarkTableFilters from './TrademarkTableFilters';
import TrademarkModal from './TrademarkTableModals';

const TrademarkTable: React.FC = () => {
  const {
    trademarks,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    totalCount,
  } = useTrademarks();

  const [selectedTrademark, setSelectedTrademark] = useState<Trademark | null>(null);

  // Define columns for the trademark table
  const columns: TableColumn<Trademark>[] = [
    {
      key: 'properties.display_text',
      header: 'Trademark',
      sortable: true,
    },
    {
      key: 'registration_number',
      header: 'Registration No.',
      render: (trademark) => trademark.properties.registration_number || 'N/A',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (trademark) => {
        const status = trademark.properties.status || 'Unknown';
        const statusClass = status.replace(/\s+/g, '');
        return (
          <span className={`${styles.statusBadge} ${styles[`status${statusClass}`]}`}>
            {status}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'registration_date',
      header: 'Registration Date',
      render: (trademark) => formatDate(trademark.properties.registration_date),
      sortable: true,
    },
    {
      key: 'expiry_date',
      header: 'Expiry Date',
      render: (trademark) => formatDate(trademark.properties.expiry_date),
      sortable: true,
    },
    {
      key: 'mark_feature',
      header: 'Type',
      render: (trademark) => trademark.properties.mark_feature || 'N/A',
      sortable: true,
    },
    {
      key: 'region',
      header: 'Region',
      render: (trademark) => trademark.properties.region || 'N/A',
      sortable: true,
    },
    {
      key: 'designated_countries',
      header: 'Countries',
      render: (trademark) => {
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
  ];

  // Handle row click to show modal
  const handleRowClick = (trademark: Trademark) => {
    setSelectedTrademark(trademark);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedTrademark(null);
  };

  return (
    <div className={styles.trademarkTableContainer}>
      <div className={styles.tableHeader}>
        <h1>Trademark Portfolio</h1>
        <div className={styles.tableStats}>
          <span>Total: {totalCount} trademarks</span>
        </div>
      </div>

      <TrademarkTableFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Table<Trademark>
        columns={columns}
        data={trademarks}
        isLoading={isLoading}
        error={error}
        onRowClick={handleRowClick}
        sortConfig={sortConfig}
        onSort={handleSort}
        emptyMessage="No trademarks found matching your criteria"
      />

      {selectedTrademark && (
        <TrademarkModal
          trademark={selectedTrademark}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TrademarkTable;

import React, { useState } from 'react';
import { useTrademarks } from '../../hooks/useTrademarks';
import { Table } from '../Table/Table';
import { Trademark } from '../../types/trademark';
import { TableColumn } from '../../types/table';
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
      render: (item) => (
        <div className={styles.trademarkCell}>
          {item.properties.logo && (
            <img
              src={item.properties.logo}
              alt={item.properties.display_text || 'Trademark logo'}
              className={styles.trademarkLogo}
            />
          )}
          <span>{item.properties.display_text || 'Unnamed Trademark'}</span>
        </div>
      ),
    },
    {
      key: 'properties.application_no',
      header: 'Application No.',
      sortable: true,
    },
    {
      key: 'properties.status',
      header: 'Status',
      sortable: true,
      render: (item) => (
        <span className={`${styles.statusBadge} ${styles[item.properties.status?.toLowerCase() || 'unknown']}`}>
          {item.properties.status || 'Unknown'}
        </span>
      ),
    },
    {
      key: 'properties.region',
      header: 'Region',
      sortable: true,
    },
    {
      key: 'properties.application_date',
      header: 'Application Date',
      sortable: true,
      render: (item) => formatDate(item.properties.application_date),
    },
    {
      key: 'properties.expiry_date',
      header: 'Expiry Date',
      sortable: true,
      render: (item) => formatDate(item.properties.expiry_date),
    },
    {
      key: 'properties.class_numbers',
      header: 'Classes',
      render: (item) => (
        <div className={styles.classBadges}>
          {item.properties.class_numbers?.map((classNumber) => (
            <span key={classNumber} className={styles.classBadge}>
              {classNumber}
            </span>
          ))}
        </div>
      ),
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

export default TrademarkTable;

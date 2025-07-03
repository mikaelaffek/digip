import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/StatusFilter.module.css';
import { FaTimes } from 'react-icons/fa';

export interface StatusFilterProps {
  columnKey: string;
  onFilterChange: (selectedStatuses: string[]) => void;
  onClose: () => void;
  availableStatuses: string[];
  selectedStatuses: string[];
}

export const TableStatusFilter: React.FC<StatusFilterProps> = ({
  columnKey,
  onFilterChange,
  onClose,
  availableStatuses,
  selectedStatuses: initialSelectedStatuses = [],
}) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialSelectedStatuses);
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Handle outside click to close the filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Toggle status selection
  const handleStatusToggle = (status: string) => {
    console.log(`Toggling status: ${status}`);
    setSelectedStatuses(prev => {
      const newStatuses = prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status];
      console.log('New selected statuses:', newStatuses);
      return newStatuses;
    });
  };

  // Apply the filter
  const handleApplyFilter = () => {
    console.log('Applying filter with statuses:', selectedStatuses);
    onFilterChange(selectedStatuses);
    onClose();
  };

  // Clear the filter
  const handleClearFilter = () => {
    setSelectedStatuses([]);
    onFilterChange([]);
    onClose();
  };

  return (
    <div className={styles.filterContainer} ref={filterRef}>
      <div className={styles.filterHeader}>
        <h4>Filter by Status</h4>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      
      <div className={styles.statusOptions}>
        {availableStatuses.map(status => (
          <label key={status} className={styles.statusOption}>
            <input
              type="checkbox"
              checked={selectedStatuses.includes(status)}
              onChange={() => handleStatusToggle(status)}
              className={styles.statusCheckbox}
            />
            <span className={styles.statusLabel}>{status}</span>
          </label>
        ))}
      </div>
      
      <div className={styles.filterActions}>
        <button 
          className={styles.clearButton} 
          onClick={handleClearFilter}
          disabled={selectedStatuses.length === 0}
        >
          Clear
        </button>
        <button 
          className={styles.applyButton} 
          onClick={handleApplyFilter}
          disabled={selectedStatuses.length === 0}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

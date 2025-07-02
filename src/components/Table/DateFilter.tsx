"use client";

import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { DateFilterConfig } from '../../types/table';
import styles from '../../styles/DateFilter.module.css';

// Import the datepicker styles
import 'react-datepicker/dist/react-datepicker.css';

interface DateFilterProps {
  columnKey: string;
  initialFilter?: DateFilterConfig;
  onFilterChange: (columnKey: string, filter: DateFilterConfig) => void;
  onClose: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  columnKey,
  initialFilter,
  onFilterChange,
  onClose
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialFilter?.startDate || null);
  const [endDate, setEndDate] = useState<Date | null>(initialFilter?.endDate || null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the filter to close it
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

  const handleApplyFilter = () => {
    onFilterChange(columnKey, { startDate, endDate });
    onClose();
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    onFilterChange(columnKey, { startDate: null, endDate: null });
    onClose();
  };

  return (
    <div className={styles.dateFilterContainer} ref={filterRef}>
      <div className={styles.datePickerWrapper}>
        <label className={styles.dateLabel}>Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className={styles.datePicker}
          placeholderText="Select start date"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      
      <div className={styles.datePickerWrapper}>
        <label className={styles.dateLabel}>End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || undefined}
          className={styles.datePicker}
          placeholderText="Select end date"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      
      <div className={styles.filterActions}>
        <button 
          className={`${styles.filterButton} ${styles.applyButton}`} 
          onClick={handleApplyFilter}
        >
          Apply
        </button>
        <button 
          className={`${styles.filterButton} ${styles.clearButton}`} 
          onClick={handleClearFilter}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DateFilter;

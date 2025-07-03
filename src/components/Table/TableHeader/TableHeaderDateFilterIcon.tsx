import { FaCalendarAlt } from 'react-icons/fa';
import TableDateFilter from '../TableDateFilter';
import styles from '../../../styles/Table.module.css';
import { DateFilterConfig } from '../../../types/table';

interface DateFilterIconProps {
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
  columnKey: string;
  filter?: DateFilterConfig;
  onFilterChange: (columnKey: string, filter: DateFilterConfig) => void;
  onClose: () => void;
  isActive: boolean;
}

export function TableHeaderDateFilterIcon(props: DateFilterIconProps) {
  return (
    <div className={styles.filterIconContainer}>
      <button
        className={`${styles.filterIcon} ${props.isActive ? styles.activeFilter : ''}`}
        onClick={props.onClick}
        aria-label="Filter date"
      >
        <FaCalendarAlt />
      </button>
      {props.active && (
        <TableDateFilter
          columnKey={props.columnKey}
          initialFilter={props.filter}
          onFilterChange={props.onFilterChange}
          onClose={props.onClose}
        />
      )}
    </div>
  );
}

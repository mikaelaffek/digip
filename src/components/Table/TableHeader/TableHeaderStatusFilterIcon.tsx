import { FaFilter } from 'react-icons/fa';
import { TableStatusFilter } from '../TableStatusFilter';
import styles from '../../../styles/Table.module.css';

interface StatusFilterIconProps {
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
  columnKey: string;
  availableStatuses: string[];
  selectedStatuses: string[];
  onFilterChange: (selected: string[]) => void;
  onClose: () => void;
  isActive: boolean;
}

export function TableHeaderStatusFilterIcon(props: StatusFilterIconProps) {
  return (
    <div className={styles.filterIconContainer}>
      <button
        className={`${styles.filterIcon} ${props.isActive ? styles.activeFilter : ''}`}
        onClick={props.onClick}
        aria-label="Filter status"
      >
        <FaFilter />
      </button>
      {props.active && (
        <TableStatusFilter
          columnKey={props.columnKey}
          availableStatuses={props.availableStatuses}
          selectedStatuses={props.selectedStatuses}
          onFilterChange={props.onFilterChange}
          onClose={props.onClose}
        />
      )}
    </div>
  );
}

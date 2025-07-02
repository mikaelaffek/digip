"use client";

import React from 'react';
import { TableColumn } from '../../types/table';
import styles from '../../styles/Table.module.css';

interface TableRowProps<T extends { id: string }> {
  item: T;
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
}

export function TableRow<T extends { id: string }>({ 
  item, 
  columns, 
  onRowClick 
}: TableRowProps<T>) {
  return (
    <tr
      onClick={() => onRowClick && onRowClick(item)}
      className={onRowClick ? styles.clickableRow : ''}
    >
      {columns.map((column) => (
        <td key={`${item.id}-${column.key}`}>
          {column.render
            ? column.render(item)
            : getNestedValue(item, column.key)}
        </td>
      ))}
    </tr>
  );
}

// Helper function to get nested values from an object using dot notation
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
}

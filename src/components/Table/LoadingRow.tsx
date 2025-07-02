"use client";

import React from 'react';
import { TableColumn } from '../../types/table';
import styles from '../../styles/Table.module.css';

interface LoadingRowProps<T> {
  columns: TableColumn<T>[];
  index: number;
}

export function LoadingRow<T>({ columns, index }: LoadingRowProps<T>) {
  return (
    <tr className={styles.loadingRow}>
      {columns.map((column) => (
        <td key={`${index}-${column.key}`} className={styles.loadingCell}>
          <div className={styles.skeleton}></div>
        </td>
      ))}
    </tr>
  );
}

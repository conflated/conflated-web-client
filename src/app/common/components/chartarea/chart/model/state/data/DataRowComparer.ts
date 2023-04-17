/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SortDirection } from '../sorts/sort/types/SortDirection';

export default class DataRowComparer {
  static compareRows(
    dataRow: { [key: string]: any },
    otherDataRow: { [key: string]: any },
    sortDirection: SortDirection,
    sqlColumnName: string
  ): number {
    if (sortDirection === 'ASC') {
      return this.compareRowsForAscendingOrder(dataRow, otherDataRow, sortDirection, sqlColumnName);
    }

    return this.compareRowsForDescendingOrder(dataRow, otherDataRow, sortDirection, sqlColumnName);
  }

  static compareRowsForAscendingOrder(
    dataRow: { [key: string]: any },
    otherDataRow: { [key: string]: any },
    sortDirection: SortDirection,
    sqlColumnName: string
  ): number {
    if (dataRow[sqlColumnName] > otherDataRow[sqlColumnName]) {
      return 1;
    } else if (dataRow[sqlColumnName] === otherDataRow[sqlColumnName]) {
      return 0;
    }
    return -1;
  }

  static compareRowsForDescendingOrder(
    dataRow: { [key: string]: any },
    otherDataRow: { [key: string]: any },
    sortDirection: SortDirection,
    sqlColumnName: string
  ): number {
    if (otherDataRow[sqlColumnName] > dataRow[sqlColumnName]) {
      return 1;
    } else if (dataRow[sqlColumnName] === otherDataRow[sqlColumnName]) {
      return 0;
    }
    return -1;
  }
}

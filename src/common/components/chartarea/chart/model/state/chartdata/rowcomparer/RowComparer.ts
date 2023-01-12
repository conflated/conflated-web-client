import type { SortDirection } from '../../selectedsortbys/selectedsortby/types/SortDirection';

export default class RowComparer {
  static compareRows(
    chartDataRow: { [key: string]: any },
    otherChartDataRow: { [key: string]: any },
    sortDirection: SortDirection,
    sqlColumnName: string
  ): number {
    if (sortDirection === 'ASC') {
      return this.compareRowsForAscendingOrder(chartDataRow, otherChartDataRow, sortDirection, sqlColumnName);
    }

    return this.compareRowsForDescendingOrder(chartDataRow, otherChartDataRow, sortDirection, sqlColumnName);
  }

  static compareRowsForAscendingOrder(
    chartDataRow: { [key: string]: any },
    otherChartDataRow: { [key: string]: any },
    sortDirection: SortDirection,
    sqlColumnName: string
  ): number {
    if (chartDataRow[sqlColumnName] > otherChartDataRow[sqlColumnName]) {
      return 1;
    } else if (chartDataRow[sqlColumnName] === otherChartDataRow[sqlColumnName]) {
      return 0;
    }
    return -1;
  }

  static compareRowsForDescendingOrder(
    chartDataRow: { [key: string]: any },
    otherChartDataRow: { [key: string]: any },
    sortDirection: SortDirection,
    sqlColumnName: string
  ): number {
    if (otherChartDataRow[sqlColumnName] > chartDataRow[sqlColumnName]) {
      return 1;
    } else if (chartDataRow[sqlColumnName] === otherChartDataRow[sqlColumnName]) {
      return 0;
    }
    return -1;
  }
}

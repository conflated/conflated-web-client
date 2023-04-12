/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import React from 'react';
import AbstractFilter from './AbstractFilter';
import type { ColumnNameToValuesMap } from '../../../chartdata/ColumnNameToValuesMap';

export default class DateRangeFilter extends AbstractFilter {
  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap {
    if (!this.filterExpression) {
      return chartData;
    }

    const filteredInIndexes: number[] = [];
    const newChartData = chartData;
    const filterDateRangeParts = this.filterExpression.split(' - ');
    if (filterDateRangeParts.length === 2) {
      const filterStartDate = moment(filterDateRangeParts[0]);
      const filterEndDate = moment(filterDateRangeParts[1]);

      if (chartData[this.sqlColumn.name]) {
        newChartData[this.sqlColumn.name] = (chartData as any)[this.sqlColumn.name].filter(
          (chartDataDate: string, index: number): boolean => {
            const chartDataDateIsBetweenFilterStartDateAndFilterEndDate = moment(chartDataDate).isBetween(
              filterStartDate,
              filterEndDate
            );

            if (chartDataDateIsBetweenFilterStartDateAndFilterEndDate) {
              filteredInIndexes.push(index);
            }

            return chartDataDateIsBetweenFilterStartDateAndFilterEndDate;
          }
        );
      }
    }

    return this.filterChartDataOtherColumns(newChartData, filteredInIndexes);
  }

  getFilterInputView(): JSX.Element {
    return <div>Not implemented</div>;
  }
}

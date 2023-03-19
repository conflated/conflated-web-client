/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import moment from 'moment';
import AbstractSelectedFilterImpl from '../AbstractSelectedFilterImpl';
import type { ColumnNameToValuesMap } from '../../../../chartdata/ColumnNameToValuesMap';
import type { ChartData } from '../../../../chartdata/ChartData';
import TimestampRangeFilterInputView from '../../../../../../../../selector/filter/view/selectedfilter/filterinput/timestamprange/TimestampRangeFilterInputView';

export default class TimestampRangeSelectedFilterImpl extends AbstractSelectedFilterImpl {
  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap {
    if (!this.filterExpression) {
      return chartData;
    }

    const filteredInIndexes: number[] = [];
    const newChartData = chartData;
    const filterTimestampRangeParts = this.filterExpression.split(';');

    if (filterTimestampRangeParts.length === 2) {
      const filterStartTimestamp = moment(filterTimestampRangeParts[0]);
      const filterEndTimestamp = moment(filterTimestampRangeParts[1]);

      if (chartData[this.sqlColumn.name]) {
        newChartData[this.sqlColumn.name] = (chartData as any)[this.sqlColumn.name].filter(
          (chartDataTimestamp: string, index: number): boolean => {
            const chartDataTimestampIsBetweenFilterStartTimestampAndFilterEndTimestamp = moment(
              chartDataTimestamp
            ).isBetween(filterStartTimestamp, filterEndTimestamp);

            if (chartDataTimestampIsBetweenFilterStartTimestampAndFilterEndTimestamp) {
              filteredInIndexes.push(index);
            }

            return chartDataTimestampIsBetweenFilterStartTimestampAndFilterEndTimestamp;
          }
        );
      }
    }

    return this.filterChartDataOtherColumns(newChartData, filteredInIndexes);
  }

  getFilterInputView(
    className: string,
    chartData: ChartData,
    changeFilterExpression: (filterExpression: string) => void
  ): JSX.Element {
    return (
      <TimestampRangeFilterInputView
        changeFilterExpression={changeFilterExpression}
        className={className}
        filterExpression={this.filterExpression}
      />
    );
  }
}

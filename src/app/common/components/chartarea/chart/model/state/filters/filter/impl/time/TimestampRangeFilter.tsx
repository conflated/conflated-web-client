/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import moment from 'moment';
import AbstractFilter from '../AbstractFilter';
import type { ColumnNameToValuesMap } from '../../../../data/ColumnNameToValuesMap';
import type { ChartData } from '../../../../data/ChartData';
import AbsoluteTimeFilterInputView from '../../../../../../../../selector/filter/view/input/time/absolute/AbsoluteTimeFilterInputView';

export default class TimestampRangeFilter extends AbstractFilter {
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
      <AbsoluteTimeFilterInputView
        changeFilterExpression={changeFilterExpression}
        className={className}
        filterExpression={this.filterExpression}
      />
    );
  }
}

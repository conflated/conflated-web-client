/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import AbstractFilter from '../AbstractFilter';
import type { ColumnNameToValuesMap } from '../../../../data/ColumnNameToValuesMap';
import type { ChartData } from '../../../../data/ChartData';
import RelativeTimeFilterInputView from '../../../../../../../../selector/filter/view/input/time/relative/RelativeTimeFilterInputView';

export default class RelativeTimeFilter extends AbstractFilter {
  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap {
    if (!this.filterExpression) {
      return chartData;
    }

    const relativeTimeParts = this.filterExpression.split(' ');

    if (relativeTimeParts.length !== 2) {
      return chartData;
    }

    const filteredInIndexes: number[] = [];
    const newChartData = chartData;
    const relativeTimeValue = parseInt(relativeTimeParts[0], 10);

    if (_.isFinite(relativeTimeValue)) {
      const relativeTimeUnit = relativeTimeParts[1];
      const relativeTimeBeginTimestamp = moment().subtract(relativeTimeValue, relativeTimeUnit.toLowerCase() as any);

      if (chartData[this.sqlColumn.name]) {
        newChartData[this.sqlColumn.name] = (chartData as any)[this.sqlColumn.name].filter(
          (chartDataTimestamp: string, index: number): boolean => {
            const chartDataTimestampIsAfterRelativeTimeBeginTimestamp =
              moment(chartDataTimestamp).isAfter(relativeTimeBeginTimestamp);
            if (chartDataTimestampIsAfterRelativeTimeBeginTimestamp) {
              filteredInIndexes.push(index);
            }
            return chartDataTimestampIsAfterRelativeTimeBeginTimestamp;
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
      <RelativeTimeFilterInputView
        changeFilterExpression={changeFilterExpression}
        filterExpression={this.filterExpression}
      />
    );
  }
}

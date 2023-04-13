/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AbstractFilter from './AbstractFilter';
import type { ColumnNameToValuesMap } from '../../../data/ColumnNameToValuesMap';
import type { ChartData } from '../../../data/ChartData';
import RadioButtonsFilterInputView from '../../../../../../../selector/filter/view/input/RadioButtonsFilterInputView';

export default class RadioButtonFilter extends AbstractFilter {
  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap {
    const filteredInIndexes: number[] = [];
    const newChartData = chartData;

    if (this.filterExpression && chartData[this.sqlColumn.name]) {
      newChartData[this.sqlColumn.name] = (chartData as any)[this.sqlColumn.name].filter(
        (chartDataValue: string, index: number): boolean => {
          const chartDataValueIsSameAsFilterExpression = chartDataValue === this.filterExpression;
          if (chartDataValueIsSameAsFilterExpression) {
            filteredInIndexes.push(index);
          }
          return chartDataValueIsSameAsFilterExpression;
        }
      );
    }

    return this.filterChartDataOtherColumns(newChartData, filteredInIndexes);
  }

  getFilterInputView(
    className: string,
    chartData: ChartData,
    changeFilterExpression: (filterExpression: string) => void
  ): JSX.Element {
    return (
      <RadioButtonsFilterInputView
        changeFilterExpression={changeFilterExpression}
        chartData={chartData}
        className={className}
        selectedFilter={this}
      />
    );
  }
}

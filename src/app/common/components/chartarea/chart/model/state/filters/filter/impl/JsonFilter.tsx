/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AbstractFilter from './AbstractFilter';
import type { ColumnNameToValuesMap } from '../../../data/ColumnNameToValuesMap';
import CheckboxesFilterInputView from '../../../../../../../selector/filter/view/input/checkboxes/CheckboxesFilterInputView';
import DropdownFilterInputView from '../../../../../../../selector/filter/view/input/DropdownFilterInputView';
import type { ChartData } from '../../../data/ChartData';

export default class JsonFilter extends AbstractFilter {
  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap {
    if (!this.filterExpression) {
      return chartData;
    }

    const filterValues = (() => {
      // noinspection UnusedCatchParameterJS
      try {
        return JSON.parse(this.filterExpression);
      } catch (error) {
        return [];
      }
    })();

    const filteredInIndexes: number[] = [];
    const newChartData = chartData;

    if (chartData[this.sqlColumn.name]) {
      newChartData[this.sqlColumn.name] = (chartData as any)[this.sqlColumn.name].filter(
        (chartDataValue: string, index: number): boolean => {
          const hasChartDataValueInFilterValues = filterValues.includes(chartDataValue);
          if (hasChartDataValueInFilterValues) {
            filteredInIndexes.push(index);
          }
          return hasChartDataValueInFilterValues;
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
    if (this.filterInputType === 'Checkboxes filter') {
      return (
        <CheckboxesFilterInputView
          chartData={chartData}
          className={className}
          selectedFilter={this}
          changeFilterExpression={changeFilterExpression}
        />
      );
    }

    return (
      <DropdownFilterInputView
        changeFilterExpression={changeFilterExpression}
        chartData={chartData}
        className={className}
        selectedFilter={this}
      />
    );
  }
}

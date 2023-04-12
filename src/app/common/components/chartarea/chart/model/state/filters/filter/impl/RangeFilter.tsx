/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
import AbstractFilter from './AbstractFilter';
import type { ColumnNameToValuesMap } from '../../../data/ColumnNameToValuesMap';
import NumberRangesParser from '../../../../../../../../utils/numberrange/NumberRangesParser';
import type { ChartData } from '../../../data/ChartData';
import SliderFilterInputView from '../../../../../../../selector/filter/view/selectedfilter/filterinput/slider/SliderFilterInputView';

export default class RangeFilter extends AbstractFilter {
  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap {
    const filteredInIndexes: any[] = [];
    const newChartData = chartData;
    const { startValue, endValue } = NumberRangesParser.parseNumberRange(this.filterExpression);

    if (_.isFinite(startValue) && _.isFinite(endValue) && chartData[this.sqlColumn.name]) {
      newChartData[this.sqlColumn.name] = (chartData as any)[this.sqlColumn.name].filter(
        (chartDataValue: number, index: number): boolean => {
          const chartDataValueBelongsToRange = chartDataValue >= startValue && chartDataValue <= endValue;
          if (chartDataValueBelongsToRange) {
            filteredInIndexes.push(index);
          }
          return chartDataValueBelongsToRange;
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
      <SliderFilterInputView
        changeFilterExpression={changeFilterExpression}
        chartData={chartData}
        className={className}
        selectedFilter={this}
      />
    );
  }
}

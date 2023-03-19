/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
import AbstractSelectedFilterImpl from '../AbstractSelectedFilterImpl';
import type { ColumnNameToValuesMap } from '../../../../chartdata/ColumnNameToValuesMap';
import NumberRangesParser from '../../numberrange/NumberRangesParser';
import type { ChartData } from '../../../../chartdata/ChartData';
import SliderFilterInputView from '../../../../../../../../selector/filter/view/selectedfilter/filterinput/slider/SliderFilterInputView';

export default class RangeSelectedFilterImpl extends AbstractSelectedFilterImpl {
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

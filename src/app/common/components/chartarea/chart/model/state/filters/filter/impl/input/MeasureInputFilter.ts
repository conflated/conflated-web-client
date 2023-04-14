/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import NumberRangesParser from '../../../../../../../../../utils/numberrange/NumberRangesParser';
import type { NumberRange } from '../../../../../../../../../utils/numberrange/NumberRange';
import type { ColumnNameToValuesMap } from '../../../../data/ColumnNameToValuesMap';
import AbstractInputFilter from './AbstractInputFilter';

export default class MeasureInputFilter extends AbstractInputFilter {
  getPlaceholder(): string {
    return 'Enter measure values, e.g. >10, <=90, 50-100';
  }

  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap {
    if (!this.filterExpression) {
      return chartData;
    }

    const filteredInIndexes: number[] = [];
    const newChartData = chartData;
    const filterNumberRanges = NumberRangesParser.parseNumberRanges(this.filterExpression);

    if (chartData[this.sqlColumn.name]) {
      newChartData[this.sqlColumn.name] = (chartData as any)[this.sqlColumn.name].filter(
        (chartDataValue: number, index: number): boolean => {
          const filterNumberRangeForChartDataValue = filterNumberRanges.find(
            ({ startValue, endValue, isStartValueExclusive, isEndValueExclusive }: NumberRange): boolean => {
              if (_.isFinite(startValue) && _.isFinite(endValue)) {
                if (isStartValueExclusive) {
                  return chartDataValue > startValue && chartDataValue <= endValue;
                } else if (isEndValueExclusive) {
                  return chartDataValue >= startValue && chartDataValue < endValue;
                } else {
                  return chartDataValue >= startValue && chartDataValue <= endValue;
                }
              }

              return false;
            }
          );

          if (filterNumberRangeForChartDataValue) {
            filteredInIndexes.push(index);
          }

          return !!filterNumberRangeForChartDataValue;
        }
      );
    }

    return this.filterChartDataOtherColumns(newChartData, filteredInIndexes);
  }
}

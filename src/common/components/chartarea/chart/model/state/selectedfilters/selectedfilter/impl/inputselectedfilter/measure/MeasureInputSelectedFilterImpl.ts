/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import NumberRangesParser from '../../../numberrange/NumberRangesParser';
import type { NumberRange } from '../../../numberrange/NumberRange';
import type { ColumnNameToValuesMap } from '../../../../../chartdata/ColumnNameToValuesMap';
import InputSelectedFilterImpl from '../InputSelectedFilterImpl';

export default class MeasureInputSelectedFilterImpl extends InputSelectedFilterImpl {
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
            ({ startValue, endValue }: NumberRange): boolean => {
              if (_.isFinite(startValue) && _.isFinite(endValue)) {
                return chartDataValue >= startValue && chartDataValue <= endValue;
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

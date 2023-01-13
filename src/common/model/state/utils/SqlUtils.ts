import type { Measure } from '../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { SelectedMeasure } from '../../../components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { AggregationFunction } from '../../../components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';

export default class SqlUtils {
  static getSqlColumnName(
    measureOrDimension: Measure | Dimension,
    aggregationFunction: AggregationFunction = 'NONE'
  ): string {
    if (aggregationFunction === 'NONE') {
      if (measureOrDimension.name.includes(' ')) {
        return `"${measureOrDimension.name}"`;
      } else {
        return measureOrDimension.name;
      }
    } else {
      return `"${measureOrDimension.name} ${aggregationFunction}"`;
    }
  }

  static getSqlColumnExpression(
    measureOrDimension: Measure | Dimension,
    aggregationFunction: AggregationFunction = 'NONE'
  ): string {
    if (aggregationFunction === 'NONE') {
      if (measureOrDimension.expression) {
        return measureOrDimension.expression;
      } else if (measureOrDimension.name.includes(' ')) {
        return `"${measureOrDimension.name}"`;
      } else {
        return measureOrDimension.name;
      }
    } else if (aggregationFunction === 'DISTINCT') {
      if (measureOrDimension.name.includes(' ')) {
        return `COUNT(DISTINCT("${measureOrDimension.name}"))`;
      } else {
        return `COUNT(DISTINCT(${measureOrDimension.name}))`;
      }
    } else if (measureOrDimension.name.includes(' ')) {
      return `${aggregationFunction}("${measureOrDimension.name}")`;
    } else {
      return `${aggregationFunction}(${measureOrDimension.name})`;
    }
  }

  static getAverageExpression(selectedMeasures: SelectedMeasure[]): string {
    const measureSumExpression = selectedMeasures.reduce(
      (sumExpression: string, { aggregationFunction, sqlColumn }: SelectedMeasure, index: number): string => {
        if (aggregationFunction === 'NONE') {
          return index === 0 ? sqlColumn.name : `${sumExpression} + ${sqlColumn.name}`;
        } else {
          return index === 0
            ? `${aggregationFunction}(${sqlColumn.name})`
            : `${sumExpression} + ${aggregationFunction}(${sqlColumn.name})`;
        }
      },
      ''
    );

    return `${measureSumExpression} / ${selectedMeasures.length}`;
  }
}

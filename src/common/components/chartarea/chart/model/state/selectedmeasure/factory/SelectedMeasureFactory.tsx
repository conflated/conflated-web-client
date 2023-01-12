import type { SelectedMeasure } from '../SelectedMeasure';
import type { AggregationFunction } from '../types/AggregationFunction';
import type { MeasureVisualizationType } from '../types/MeasureVisualizationType';
import type { Measure } from '../../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import SqlUtils from '../../../../../../../model/state/utils/SqlUtils';

export default class SelectedMeasureFactory {
  static createSelectedMeasure(
    measureOrDimension: Measure | Dimension,
    aggregationFunction: AggregationFunction,
    visualizationType: MeasureVisualizationType,
    color: string
  ): SelectedMeasure {
    return {
      aggregationFunction,
      visualizationType,
      measure: measureOrDimension,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(measureOrDimension, aggregationFunction)
      },
      visualizationColor: visualizationType === 'text' ? 'rgb(0 0 0)' : color
    };
  }
}

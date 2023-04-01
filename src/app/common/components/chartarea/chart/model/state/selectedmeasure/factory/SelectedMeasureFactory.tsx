import type { SelectedMeasure } from '../SelectedMeasure';
import type { AggregationFunction } from '../types/AggregationFunction';
import type { MeasureVisualizationType } from '../types/MeasureVisualizationType';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import SqlUtils from '../../../../../../../utils/SqlUtils';

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

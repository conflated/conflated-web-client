import type { Dimension } from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { SelectedDimension } from '../SelectedDimension';
import type { DimensionVisualizationType } from '../types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import SqlUtils from '../../../../../../../model/state/utils/SqlUtils';

export default class SelectedDimensionFactory {
  static createSelectedDimension(
    dimensionOrMeasure: Dimension | Measure,
    visualizationType: DimensionVisualizationType,
    visualizationColor: string
  ): SelectedDimension {
    return {
      visualizationColor,
      visualizationType,
      dimension: dimensionOrMeasure,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(dimensionOrMeasure),
        expression: SqlUtils.getSqlColumnExpression(dimensionOrMeasure)
      }
    };
  }
}

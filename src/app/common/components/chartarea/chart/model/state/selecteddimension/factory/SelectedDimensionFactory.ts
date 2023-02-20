import type { Dimension } from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { SelectedDimension } from '../SelectedDimension';
import type { DimensionVisualizationType } from '../types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import SqlUtils from '../../../../../../../utils/SqlUtils';

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

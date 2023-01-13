import type { Dimension } from '../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { DimensionVisualizationType } from './types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';

export type SelectedDimension = {
  readonly dimension: Dimension | Measure;
  readonly sqlColumn: {
    readonly name: string;
    readonly expression: string;
  };
  readonly visualizationType: DimensionVisualizationType;
  readonly previousVisualizationType?: DimensionVisualizationType;
  readonly visualizationColor?: string;
};

import type { Dimension } from '../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { DimensionVisualizationType } from './types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';

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

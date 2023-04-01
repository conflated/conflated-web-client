import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { DimensionVisualizationType } from './types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';

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

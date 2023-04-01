import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from './types/AggregationFunction';
import type { MeasureVisualizationType } from './types/MeasureVisualizationType';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';

export type SelectedMeasure = {
  readonly measure: Measure | Dimension;
  readonly sqlColumn: {
    readonly name: string;
    readonly expression: string;
  };
  readonly aggregationFunction: AggregationFunction;
  readonly visualizationType: MeasureVisualizationType;
  readonly visualizationColor: string;
};

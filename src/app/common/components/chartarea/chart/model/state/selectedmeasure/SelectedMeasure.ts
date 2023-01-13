import type { Dimension } from '../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { AggregationFunction } from './types/AggregationFunction';
import type { MeasureVisualizationType } from './types/MeasureVisualizationType';
import type { Measure } from '../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';

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

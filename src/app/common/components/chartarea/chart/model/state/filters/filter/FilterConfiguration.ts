import type { FilterType } from './FilterType';
import type { FilterInputType } from './inputtype/FilterInputType';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { DataScope } from '../../types/DataScope';
import { Chart } from '../../Chart';

export type FilterConfiguration = {
  readonly allowedDimensionFilterInputTypes: FilterInputType[];
  readonly aggregationFunction: AggregationFunction;
  readonly filteringChart: Chart | null;
  readonly dataScopeType: DataScope;
  readonly filterExpression: string;
  readonly filterInputType: FilterInputType;
  readonly isDrillDownFilter: boolean;
  readonly measureOrDimension: Measure | Dimension;
  readonly sqlColumn: {
    readonly name: string;
    readonly expression: string;
  };
  readonly type: FilterType;
};

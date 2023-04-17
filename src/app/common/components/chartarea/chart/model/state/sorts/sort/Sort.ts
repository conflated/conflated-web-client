import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { TimeSortOption } from './types/TimeSortOption';
import type { SortDirection } from './types/SortDirection';
import type { DefaultSortType } from './types/DefaultSortType';
import type { SortType } from './types/SortType';
import type { DataScope } from '../../types/DataScope';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';

export type Sort = {
  readonly measureOrDimension: Measure | Dimension;
  readonly sqlColumn: {
    readonly name: string;
    readonly expression: string;
  };
  readonly aggregationFunction: AggregationFunction;
  readonly timeSortOption: TimeSortOption;
  readonly type: SortType;
  readonly direction: SortDirection;
  readonly dataScope: DataScope;
  readonly defaultType: DefaultSortType;
};

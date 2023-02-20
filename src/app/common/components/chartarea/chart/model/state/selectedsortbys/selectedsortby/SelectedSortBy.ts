import type { Measure } from '../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { TimeSortOption } from './types/TimeSortOption';
import type { SortDirection } from './types/SortDirection';
import type { DefaultSelectedSortByType } from './types/DefaultSelectedSortByType';
import type { SelectedSortByType } from './types/SelectedfSortByType';
import type { DataScopeType } from '../../types/DataScopeType';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';

export type SelectedSortBy = {
  readonly measureOrDimension: Measure | Dimension;
  readonly sqlColumn: {
    readonly name: string;
    readonly expression: string;
  };
  readonly aggregationFunction: AggregationFunction;
  readonly timeSortOption: TimeSortOption;
  readonly type: SelectedSortByType;
  readonly sortDirection: SortDirection;
  readonly dataScopeType: DataScopeType;
  readonly defaultType: DefaultSelectedSortByType;
};

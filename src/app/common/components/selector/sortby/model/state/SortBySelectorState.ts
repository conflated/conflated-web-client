import type { TimeSortOption } from '../../../../chartarea/chart/model/state/sorts/sort/types/TimeSortOption';
import type { SortDirection } from '../../../../chartarea/chart/model/state/sorts/sort/types/SortDirection';

export type SortBySelectorState = {
  readonly timeSortOptions: TimeSortOption[];
  readonly lastUsedSortDirection: SortDirection;
  readonly areSelectedSortBysShown: boolean;
};

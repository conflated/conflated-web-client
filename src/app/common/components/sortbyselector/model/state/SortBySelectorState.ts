import type { TimeSortOption } from '../../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/TimeSortOption';
import type { SortDirection } from '../../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/SortDirection';

export type SortBySelectorState = {
  readonly timeSortOptions: TimeSortOption[];
  readonly lastUsedSortDirection: SortDirection;
  readonly areSelectedSortBysShown: boolean;
};

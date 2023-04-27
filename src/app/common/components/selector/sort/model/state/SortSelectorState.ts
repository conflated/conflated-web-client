import type { SortDirection } from '../../../../chartarea/chart/model/state/sorts/sort/types/SortDirection';

export type SortSelectorState = {
  readonly lastUsedSortDirection: SortDirection;
  readonly sortsAreShown: boolean;
};

import type { Dimension } from './types/Dimension';

export type DimensionSelectorState = {
  readonly dimensions: Dimension[];
  readonly isFetchingDimensions: boolean;
};

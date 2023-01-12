import type { Dimension } from './entities/Dimension';

export type DimensionSelectorState = {
  readonly dimensions: Dimension[];
  readonly isFetchingDimensions: boolean;
};

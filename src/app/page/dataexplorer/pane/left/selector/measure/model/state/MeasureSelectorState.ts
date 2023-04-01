import type { Measure } from './types/Measure';

export type MeasureSelectorState = {
  readonly measures: Measure[];
  readonly isFetchingMeasures: boolean;
};

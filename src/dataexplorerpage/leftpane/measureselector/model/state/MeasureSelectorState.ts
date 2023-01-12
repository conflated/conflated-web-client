import type { Measure } from './entities/Measure';

export type MeasureSelectorState = {
  readonly measures: Measure[];
  readonly isFetchingMeasures: boolean;
};

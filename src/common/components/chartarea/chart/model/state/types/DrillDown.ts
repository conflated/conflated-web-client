/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';

export type DrillDown = {
  selectedDimension: SelectedDimension;
  value: any;
};

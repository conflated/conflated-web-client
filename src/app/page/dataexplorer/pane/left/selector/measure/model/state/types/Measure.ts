import type { MeasureUnit } from './MeasureUnit';

export type Measure = {
  name: string;
  expression: string;
  isString: boolean;
  isTimestamp: boolean;
  isDate: boolean;
  unit: MeasureUnit;
};

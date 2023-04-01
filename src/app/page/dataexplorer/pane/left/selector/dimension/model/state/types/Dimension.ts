import type { MeasureUnit } from '../../../../measure/model/state/types/MeasureUnit';

export type Dimension = {
  name: string;
  expression: string;
  isTimestamp: boolean;
  isDate: boolean;
  isString: boolean;
  unit: MeasureUnit;
};

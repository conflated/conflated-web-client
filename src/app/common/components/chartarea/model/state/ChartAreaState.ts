import { Chart } from '../../chart/model/state/Chart';
import type { GridItems } from './types/GridItems';

export type ChartAreaState = {
  readonly layout: GridItems;
  readonly selectedChart: Chart;
  readonly charts: Chart[];
  readonly previousLayout?: GridItems;
  readonly copiedChart?: Chart | null;
  readonly maximizedChart: Chart | null;
};

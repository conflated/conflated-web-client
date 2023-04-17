import { Chart } from '../../chart/model/state/Chart';
import { GridItem } from './types/GridItem';

export type ChartAreaState = {
  readonly layout: GridItem[];
  readonly selectedChart: Chart;
  readonly charts: Chart[];
  readonly previousLayout?: GridItem[];
  readonly copiedChart?: Chart | null;
  readonly maximizedChart: Chart | null;
};

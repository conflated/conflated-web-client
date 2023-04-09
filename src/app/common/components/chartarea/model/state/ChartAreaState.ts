import { Chart } from '../../chart/model/state/Chart';
import type { Layout } from './types/Layout';

export type ChartAreaState = {
  readonly layout: Layout;
  readonly selectedChart: Chart;
  readonly charts: Chart[];
  readonly previousLayout?: Layout;
  readonly copiedChart?: Chart | null;
  readonly maximizedChart: Chart | null;
};

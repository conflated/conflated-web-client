import type { Layout } from '../../../../../common/components/chartarea/model/state/types/Layout';
import type { Chart } from '../../../../../common/components/chartarea/chart/model/state/Chart';

export type Dashboard = {
  readonly name: string;
  readonly layout: Layout;
  readonly charts: Chart[];
};

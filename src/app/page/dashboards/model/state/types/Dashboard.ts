import type { Chart } from '../../../../../common/components/chartarea/chart/model/state/Chart';
import { GridItem } from '../../../../../common/components/chartarea/model/state/types/GridItem';

export type Dashboard = {
  readonly name: string;
  readonly layout: GridItem[];
  readonly charts: Chart[];
};

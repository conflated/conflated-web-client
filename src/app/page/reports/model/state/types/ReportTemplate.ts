import type { GridItems } from '../../../../../common/components/chartarea/model/state/types/GridItems';
import type { Chart } from '../../../../../common/components/chartarea/chart/model/state/Chart';

export type ReportTemplate = {
  readonly name: string;
  readonly layout: GridItems;
  readonly charts: Chart[];
};

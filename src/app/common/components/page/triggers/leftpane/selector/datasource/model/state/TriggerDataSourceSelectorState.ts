import type { DataSource } from '../../../../../../../chartarea/chart/model/state/datasource/DataSource';

export type TriggerDataSourceSelectorState = {
  readonly selectedDataSources: DataSource[];
  readonly dataSources: DataSource[];
  readonly isFetchingDataSources: boolean;
};

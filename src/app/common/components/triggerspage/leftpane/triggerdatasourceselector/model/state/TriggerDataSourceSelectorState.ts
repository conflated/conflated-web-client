import type { DataSource } from '../../../../../../model/state/datasource/DataSource';

export type TriggerDataSourceSelectorState = {
  readonly selectedDataSources: DataSource[];
  readonly dataSources: DataSource[];
  readonly isFetchingDataSources: boolean;
};

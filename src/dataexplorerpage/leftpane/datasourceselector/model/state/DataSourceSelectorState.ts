import type { DataSource } from '../../../../../common/model/state/datasource/DataSource';

export type DataSourceSelectorState = {
  readonly dataSources: DataSource[];
  readonly isFetchingDataSources: boolean;
  readonly isDataSourceChangeConfirmationShown: boolean;
  readonly selectedDataSourceToConfirm?: DataSource | null;
};

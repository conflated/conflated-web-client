import type { DataSource } from '../../../../../common/model/state/datasource/DataSource';

export interface DataSourceService {
  fetchDataSources(): Promise<DataSource[]>;
}

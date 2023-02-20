import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';

export interface DataSourceService {
  fetchDataSources(): Promise<DataSource[]>;
}

import type { DataSource } from '../../../../../chartarea/chart/model/state/datasource/DataSource';

export default class AlertDataSourceService {
  // noinspection JSMethodCanBeStatic
  fetchDataSources(): Promise<DataSource[]> {
    throw new TypeError('Abstract method error');
  }
}

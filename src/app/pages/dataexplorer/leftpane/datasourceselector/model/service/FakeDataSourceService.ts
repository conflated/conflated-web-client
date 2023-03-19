import { DataSourceService } from './DataSourceService';
import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';

export default class FakeDataSourceService implements DataSourceService {
  latency = 1000;

  // TODO: encrypt user, password and sqlStatement in config service and decrypt in data service
  fetchDataSources(): Promise<DataSource[]> {
    return new Promise<DataSource[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'CNI 5G RAN Counters',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            name: 'CNI 4G RAN Counters',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            name: 'CNI 5G Core Counters',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            name: 'CNI 4G Core Counters',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            name: 'FNI Counters',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          }
        ]);
      }, this.latency);
    });
  }
}

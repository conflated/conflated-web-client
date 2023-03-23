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
            type: 'raw',
            name: 'CNI Call Reports',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            type: 'aggregated',
            name: 'CNI RAN Counters',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            type: 'aggregated',
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
            type: 'aggregated',
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
            type: 'aggregated',
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

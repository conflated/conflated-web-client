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
            name: 'CNI 5G RAN Counters 30 x 1d',
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
            name: 'CNI 5G RAN Counters 24 x 1h',
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
            name: 'CNI 5G RAN Counters 30 x 1min',
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
            name: 'FNI Counters 30 x 1min',
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

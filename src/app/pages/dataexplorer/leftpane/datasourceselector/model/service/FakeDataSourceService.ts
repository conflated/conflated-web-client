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
            labels: ['Data, raw', 'Product, CNI'],
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
            name: 'CNI 5G RAN 14 x 1d',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 5G', 'Network, radio', 'Time, 14 x 1d'],
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
            name: 'CNI 5G RAN 24 x 1h',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 5G', 'Network, radio', 'Time, 24 x 1h'],
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
            name: 'CNI 5G RAN 30 x 1min',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 5G', 'Network, radio', 'Time, 30 x 1min'],
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
            name: 'CNI 4G RAN 14 x 1d',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 4G', 'Network, radio', 'Time, 14 x 1d'],
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
            name: 'CNI 4G RAN 24 x 1h',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 4G', 'Network, radio', 'Time, 24 x 1h'],
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
            name: 'CNI 4G RAN 30 x 1min',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 4G', 'Network, radio', 'Time, 30 x 1min'],
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
            name: 'CNI 5G Core 14 x 1d',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 5G', 'Network, core', 'Time, 14 x 1d'],
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
            name: 'CNI 5G Core 24 x 1h',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 5G', 'Network, core', 'Time, 24 x 1h'],
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
            name: 'CNI 5G Core 30 x 1min',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 5G', 'Network, core', 'Time, 30 x 1min'],
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
            name: 'CNI 4G Core 14 x 1d',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 4G', 'Network, core', 'Time, 14 x 1d'],
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
            name: 'CNI 4G Core 24 x 1h',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 4G', 'Network, core', 'Time, 24 x 1h'],
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
            name: 'CNI 4G Core 30 x 1min',
            labels: ['Data, aggregated', 'Product, CNI', 'Network, 4G', 'Network, core', 'Time, 30 x 1min'],
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
            name: 'FNI 30 x 1min',
            labels: ['Data, aggregated', 'Product, FNI', 'Time, 30 x 1min'],
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

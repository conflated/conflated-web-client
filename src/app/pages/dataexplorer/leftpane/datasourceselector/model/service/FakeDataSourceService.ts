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
            labels: ['Raw data', 'CNI'],
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
            labels: ['Aggregated data', 'CNI', '5G', 'RAN', '14 x 1d'],
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
            labels: ['Aggregated data', 'CNI', '5G', 'RAN', '24 x 1h'],
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
            labels: ['Aggregated data', 'CNI', '5G', 'RAN', '30 x 1min'],
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
            labels: ['Aggregated data', 'CNI', '4G', 'RAN', '14 x 1d'],
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
            labels: ['Aggregated data', 'CNI', '4G', 'RAN', '24 x 1h'],
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
            labels: ['Aggregated data', 'CNI', '4G', 'RAN', '30 x 1min'],
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
            labels: ['Aggregated data', 'CNI', '5G', 'Core network', '14 x 1d'],
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
            labels: ['Aggregated data', 'CNI', '5G', 'Core network', '24 x 1h'],
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
            labels: ['Aggregated data', 'CNI', '4G', 'RAN', '30 x 1min'],
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
            labels: ['Aggregated data', 'CNI', '4G', 'Core', '14 x 1d'],
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
            labels: ['Aggregated data', 'CNI', '4G', 'Core', '24 x 1h'],
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
            labels: ['Aggregated data', 'CNI', '4G', 'Core network', '30 x 1min'],
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
            labels: ['Aggregated data', 'FNI', '30 x 1min'],
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

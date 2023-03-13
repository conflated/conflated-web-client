import AlertDataSourceService from './AlertDataSourceService';
import type { DataSource } from '../../../../../chartarea/chart/model/state/datasource/DataSource';

export default class FakeAlertDataSourceService extends AlertDataSourceService {
  latency = 1000;

  // TODO: encrypt user, password and sqlStatement in config service and decrypt in data service
  fetchDataSources(): Promise<DataSource[]> {
    return new Promise<DataSource[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'AVA Customer and Network Insights (CNI)',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            name: 'AVA Fixed Network Insights (FNI)',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            name: 'NOA AI Anomaly Detection',
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

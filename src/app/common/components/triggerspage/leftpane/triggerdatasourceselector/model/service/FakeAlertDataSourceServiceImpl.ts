import AlertDataSourceService from './AlertDataSourceService';
import type { DataSource } from '../../../../../../model/state/datasource/DataSource';

export default class FakeAlertDataSourceServiceImpl extends AlertDataSourceService {
  latency = 1000;

  // TODO: encrypt user, password and sqlStatement in config service and decrypt in data service
  fetchDataSources(): Promise<DataSource[]> {
    return new Promise<DataSource[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'fetchedAlertDS1',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            name: 'fetchedAlertDS2',
            jdbcDriverClass: '',
            jdbcUrl: '',
            authentication: {
              user: '',
              password: ''
            },
            sqlStatement: ''
          },
          {
            name: 'fetchedAlertDS3',
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

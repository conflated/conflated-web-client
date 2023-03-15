import TriggerDataSourceService from './TriggerDataSourceService';
import type { DataSource } from '../../../../../chartarea/chart/model/state/datasource/DataSource';
import { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

export default class FakeTriggerDataSourceService extends TriggerDataSourceService {
  latency = 1000;

  // TODO: encrypt user, password and sqlStatement in config service and decrypt in data service
  fetchTriggerDataSources(stateNamespace: TriggersPageStateNamespace): Promise<DataSource[]> {
    return new Promise<DataSource[]>((resolve) => {
      setTimeout(() => {
        if (stateNamespace === 'alertsPage') {
          resolve([
            {
              name: 'Active CNI Alerts',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'Active FNI Alerts',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'Active Detected Anomalies',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'Active CNI Core Alerts',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'Active CNI RAN Alerts',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'All Alerts',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            }
          ]);
        } else {
          resolve([
            {
              name: 'Executive Goals',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'Customer Experience Goals',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'Service Goals',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'Network Goals',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'Core Network Goals',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            },
            {
              name: 'RAN Goals',
              jdbcDriverClass: '',
              jdbcUrl: '',
              authentication: {
                user: '',
                password: ''
              },
              sqlStatement: ''
            }
          ]);
        }
      }, this.latency);
    });
  }
}

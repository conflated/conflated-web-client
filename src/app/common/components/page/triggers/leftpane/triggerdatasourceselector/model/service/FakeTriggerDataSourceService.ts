import TriggerDataSourceService from './TriggerDataSourceService';
import type { DataSource } from '../../../../../../chartarea/chart/model/state/datasource/DataSource';
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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
              type: 'raw',
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

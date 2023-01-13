import { DashboardGroupsService } from './DashboardGroupsService';
import layout1 from '../../../dataexplorerpage/leftpane/layoutselector/model/state/layouts/layout1';
import type { DashboardGroup } from '../state/entities/DashboardGroup';
import ChartFactory from '../../../../common/components/chartarea/chart/model/state/factory/ChartFactory';

export default class FakeDashboardGroupsServiceImpl implements DashboardGroupsService {
  private readonly latency = 1000;

  fetchDashboardGroups(): Promise<DashboardGroup[]> {
    const emptyChart = ChartFactory.createChart();

    return new Promise<DashboardGroup[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'Dashboard group 1',
            dashboards: [
              {
                name: 'Dashboard 1.1',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 1.2',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 1.3',
                layout: layout1,
                charts: [emptyChart]
              }
            ]
          },
          {
            name: 'Dashboard group 2',
            dashboards: [
              {
                name: 'Dashboard 2.1',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.2',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.3',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.4 very long name here for dashboard xxx',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.5',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.6',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.7',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.8',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.9',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.10',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.11',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.12',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.13',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.14',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.15',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.16',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.17',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.18',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.19',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.20',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.21',
                layout: layout1,
                charts: [emptyChart]
              }
            ]
          }
        ]);
      }, this.latency);
    });
  }
}

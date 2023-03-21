import { AlertChartDataService } from './AlertChartDataService';
import { ColumnNameToValuesMap } from '../../../../../common/components/chartarea/chart/model/state/chartdata/ColumnNameToValuesMap';
import ChartDataImpl from '../../../../../common/components/chartarea/chart/model/state/chartdata/ChartDataImpl';

export default class FakeAlertChartDataService implements AlertChartDataService {
  private readonly latency = 1000;

  // noinspection JSMethodCanBeStatic
  fetchAlertsDataTableData(): Promise<ColumnNameToValuesMap> {
    return new Promise<ColumnNameToValuesMap>((resolve) => {
      setTimeout(() => {
        const columnNameToValuesMap = {} as ColumnNameToValuesMap;
        columnNameToValuesMap.Severity = ['Critical', 'Critical', 'Major', 'Major', 'Minor', 'Info'];

        columnNameToValuesMap['"Trigger time"'] = [
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00'
        ];

        columnNameToValuesMap['"Active duration"'] = ['3 hours', '3 hours', '3 hours', '3 hours', '3 hours', ''];

        columnNameToValuesMap['"Labels"'] = [
          '5G RAN, gNB 2345, Error: Signalling Congestion',
          '5G RAN, gNB 2345',
          '5G RAN, gNB 2366, Error: Signalling Congestion',
          'Label very long name very long name long long',
          '4G RAN, eNB 4333',
          'Core Network, AMF 3'
        ];

        columnNameToValuesMap['"Description"'] = [
          'Very High gNB Setup Failure Rate',
          'High gNB Drop Call Rate',
          'High gNB Setup Failure Rate',
          'Alert description very long name very long name long long',
          'High 5G-4G Handover Failure Rate',
          'Successful Software Upgrade'
        ];

        columnNameToValuesMap['"Data source"'] = [
          'Active CNI Alerts',
          'Active CNI Alerts',
          'Active CNI Alerts',
          'Active FNI Alerts',
          'Active CNI Alerts',
          'Active CNI Alerts'
        ];

        columnNameToValuesMap['"Trigger values"'] = [
          'Setup Failure Rate: 18%',
          'Drop Call Rate: 11%',
          'Setup Failure Rate: 12%',
          'Measure1: 45.76',
          'Handover Failure Rate: 25%',
          ''
        ];

        columnNameToValuesMap.Status = ['New', 'New', 'New', 'New', 'New', ''];
        columnNameToValuesMap.Assignee = ['', '', '', '', '', ''];

        columnNameToValuesMap['"Status last modified"'] = [
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          ''
        ];

        const chartData = new ChartDataImpl(columnNameToValuesMap);
        resolve(chartData.getColumnNameToValuesMap());
      }, this.latency);
    });
  }

  fetchAlertStatisticsChartData(): Promise<ColumnNameToValuesMap> {
    return new Promise<ColumnNameToValuesMap>((resolve) => {
      setTimeout(() => {
        const columnNameToValuesMap = {} as ColumnNameToValuesMap;
        columnNameToValuesMap['"Trigger time COUNT"'] = [1, 0, 3, 0, 1, 0];

        columnNameToValuesMap['"Trigger time"'] = [
          '2019-04-02T12:02:00',
          '2019-04-02T12:02:00',
          '2019-04-02T14:00:00',
          '2019-04-02T14:00:00',
          '2019-04-02T17:10:00',
          '2019-04-02T17:10:00'
        ];

        const chartData = new ChartDataImpl(columnNameToValuesMap);
        resolve(chartData.getColumnNameToValuesMap());
      }, this.latency);
    });
  }
}

import { ColumnNameToValuesMap } from '../../../../../common/components/chartarea/chart/model/state/chartdata/ColumnNameToValuesMap';
import ChartDataImpl from '../../../../../common/components/chartarea/chart/model/state/chartdata/ChartDataImpl';
import { TriggerChartDataService } from '../../../../../common/components/page/triggers/chartarea/model/services/TriggerChartDataService';

export default class FakeGoalChartDataService implements TriggerChartDataService {
  private readonly latency = 1000;

  fetchTriggerDataTableData(): Promise<ColumnNameToValuesMap> {
    return new Promise<ColumnNameToValuesMap>((resolve) => {
      setTimeout(() => {
        const columnNameToValuesMap = {} as ColumnNameToValuesMap;
        columnNameToValuesMap.Status = ['Above target', 'On target', 'Below target', 'Far below target'];
        columnNameToValuesMap['"Trigger time"'] = [
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00',
          '2019-04-01 12:00:00'
        ];
        columnNameToValuesMap['"Labels"'] = [
          'RAN, 5G RAN, Southern, TRE Area',
          'RAN, 5G RAN, Southern, TRE Area',
          'RAN, 5G RAN, Southern, TRE Area',
          'RAN, 5G RAN, Southern, TRE Area'
        ];
        columnNameToValuesMap['"Description"'] = [
          'TRE Average 5G RAN Throughput At Least 80 Mb/s',
          'TRE 5G RAN Failure Ratio Lower Than 1%',
          'TRE 5G RAN Coverage Greater Than 75%',
          'TRE Average 5G RAN Latency Lower Than 5 ms'
        ];
        columnNameToValuesMap['"Data source"'] = [
          'RAN Goals',
          'RAN Goals',
          'RAN Goals',
          'RAN Goals',
          'RAN Goals',
          'RAN Goals'
        ];
        columnNameToValuesMap['"Trigger values"'] = [
          'Average 5G RAN Throughput: 120.76 Mb/s',
          '5G RAN Failure Ratio: 0.9%',
          '5G RAN Coverage: 68%',
          'Average 5G RAN Latency: 15 ms'
        ];

        const chartData = new ChartDataImpl(columnNameToValuesMap);
        resolve(chartData.getColumnNameToValuesMap());
      }, this.latency);
    });
  }

  fetchTriggerStatisticsChartData(): Promise<ColumnNameToValuesMap> {
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

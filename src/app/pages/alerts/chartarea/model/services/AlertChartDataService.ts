import { ColumnNameToValuesMap } from '../../../../../common/components/chartarea/chart/model/state/chartdata/ColumnNameToValuesMap';

export interface AlertChartDataService {
  fetchAlertsDataTableData(): Promise<ColumnNameToValuesMap>;
  fetchAlertStatisticsChartData(): Promise<ColumnNameToValuesMap>;
}

import { ColumnNameToValuesMap } from '../../../../../chartarea/chart/model/state/chartdata/ColumnNameToValuesMap';

export interface TriggerChartDataService {
  fetchTriggerDataTableData(): Promise<ColumnNameToValuesMap>;
  fetchTriggerStatisticsChartData(): Promise<ColumnNameToValuesMap>;
}

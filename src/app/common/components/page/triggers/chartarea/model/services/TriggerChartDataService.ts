import { ColumnNameToValuesMap } from '../../../../../chartarea/chart/model/state/data/ColumnNameToValuesMap';

export interface TriggerChartDataService {
  fetchTriggerDataTableData(): Promise<ColumnNameToValuesMap>;
  fetchTriggerStatisticsChartData(): Promise<ColumnNameToValuesMap>;
}

import { ColumnNameToValuesMap } from '../../../../../common/components/chartarea/chart/model/state/chartdata/ColumnNameToValuesMap';

export interface GoalChartDataService {
  fetchGoalsDataTableData(): Promise<ColumnNameToValuesMap>;
  fetchGoalStatisticsChartData(): Promise<ColumnNameToValuesMap>;
}

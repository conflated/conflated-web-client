import type { SelectedFilterConfiguration } from './SelectedFilterConfiguration';
import type { ColumnNameToValuesMap } from '../../chartdata/ColumnNameToValuesMap';
import type { ChartData } from '../../chartdata/ChartData';
import type { FilterInputType } from './types/FilterInputType';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';
import type { DataScopeType } from '../../types/DataScopeType';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { FilterType } from './types/FilterType';

export interface SelectedFilter {
  readonly allowedDimensionFilterInputTypes: FilterInputType[];
  readonly aggregationFunction: AggregationFunction;
  readonly chartId: string;
  readonly dataScopeType: DataScopeType;
  readonly filterExpression: string;
  readonly filterInputType: FilterInputType;
  readonly isDrillDownFilter: boolean;
  readonly isSelectionFilter: boolean;
  readonly measureOrDimension: Measure | Dimension;
  readonly sqlColumn: {
    readonly name: string;
    readonly expression: string;
  };
  readonly type: FilterType;

  getConfiguration(): SelectedFilterConfiguration;
  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap;
  getFilterInputView(
    className: string,
    chartData: ChartData,
    changeFilterExpression: (filterExpression: string) => void
  ): JSX.Element;
  shouldFetchChartData(chartData: ChartData): boolean;
  shouldFetchDimensionValues(chartData: ChartData): boolean;
  shouldFetchMeasureMinMaxValues(chartData: ChartData): boolean;
}

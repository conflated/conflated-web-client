import type { FilterConfiguration } from './FilterConfiguration';
import type { ColumnNameToValuesMap } from '../../data/ColumnNameToValuesMap';
import type { ChartData } from '../../data/ChartData';
import type { FilterInputType } from './inputtype/FilterInputType';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';
import type { DataScope } from '../../types/DataScope';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { FilterType } from './FilterType';

export interface Filter {
  readonly allowedDimensionFilterInputTypes: FilterInputType[];
  readonly aggregationFunction: AggregationFunction;
  readonly chartId: string;
  readonly dataScopeType: DataScope;
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

  getConfiguration(): FilterConfiguration;
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

import type { DataScope } from '../types/DataScope';
import type { Filter } from './filter/Filter';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from './filter/inputtype/FilterInputType';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { DrillDown } from '../types/DrillDown';
import { Chart } from '../Chart';

export interface ChartFilters {
  addDimensionFilter(dimension: Dimension, filterInputType?: FilterInputType): Filter;

  addDrillDownFilter(drillDown: DrillDown): void;

  addMeasureFilter(measure: Measure, filterInputType?: FilterInputType): Filter;

  addChartFilter(filteringChart: Chart): void;

  changeFilterAggregationFunction(filter: Filter, aggregationFunction: AggregationFunction): void;

  changeFilterDataScope(filter: Filter, dataScopeType: DataScope): void;

  changeFilterExpression(filter: Filter, filterExpression: string): void;

  changeFilterInputType(filter: Filter, filterInputType: FilterInputType): Filter;

  getLastDrillDownFilter(): Filter | null | undefined;

  getFilters(): Filter[];

  removeFilter(selectedFilter: Filter): void;

  removeChartFilter(chart: Chart): void;

  removeQuickFilters(): void;
}

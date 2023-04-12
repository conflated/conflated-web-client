import type { DataScopeType } from '../types/DataScopeType';
import type { Filter } from './filter/Filter';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from './filter/inputtype/FilterInputType';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { DrillDown } from '../types/DrillDown';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';

export interface ChartFilters {
  addDimensionSelectedFilter(dimension: Dimension): Filter;

  addDrillDownFilter(drillDown: DrillDown): void;

  addMeasureSelectedFilter(measure: Measure): Filter;

  addSelectionFilter(chartId: string, selectedDimension: SelectedDimension, filterExpression: string): void;

  changeSelectedFilterAggregationFunction(selectedFilter: Filter, aggregationFunction: AggregationFunction): void;

  changeSelectedFilterDataScopeType(selectedFilter: Filter, dataScopeType: DataScopeType): void;

  changeSelectedFilterExpression(selectedFilter: Filter, filterExpression: string): void;

  changeSelectedFilterInputType(selectedFilter: Filter, filterInputType: FilterInputType): Filter;

  getLastDrillDownFilter(): Filter | null | undefined;

  getSelectedFilters(): Filter[];

  removeSelectedFilter(selectedFilter: Filter): void;

  removeSelectionFilter(chartId: string): void;
}

import type { DataScopeType } from '../types/DataScopeType';
import type { SelectedFilter } from './selectedfilter/SelectedFilter';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from './selectedfilter/types/FilterInputType';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { DrillDown } from '../types/DrillDown';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';

export interface SelectedFilters {
  addDimensionSelectedFilter(dimension: Dimension): SelectedFilter;

  addDrillDownFilter(drillDown: DrillDown): void;

  addMeasureSelectedFilter(measure: Measure): SelectedFilter;

  addSelectionFilter(chartId: string, selectedDimension: SelectedDimension, filterExpression: string): void;

  changeSelectedFilterAggregationFunction(
    selectedFilter: SelectedFilter,
    aggregationFunction: AggregationFunction
  ): void;

  changeSelectedFilterDataScopeType(selectedFilter: SelectedFilter, dataScopeType: DataScopeType): void;

  changeSelectedFilterExpression(selectedFilter: SelectedFilter, filterExpression: string): void;

  changeSelectedFilterInputType(selectedFilter: SelectedFilter, filterInputType: FilterInputType): SelectedFilter;

  getLastDrillDownFilter(): SelectedFilter | null | undefined;

  getSelectedFilters(): SelectedFilter[];

  removeSelectedFilter(selectedFilter: SelectedFilter): void;

  removeSelectionFilter(chartId: string): void;
}

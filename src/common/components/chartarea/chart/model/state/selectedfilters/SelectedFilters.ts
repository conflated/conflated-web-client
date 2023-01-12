import type { DataScopeType } from '../../../../../../model/state/types/DataScopeType';
import type { SelectedFilter } from './selectedfilter/SelectedFilter';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from './selectedfilter/types/FilterInputType';
import type { Dimension } from '../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Measure } from '../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
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

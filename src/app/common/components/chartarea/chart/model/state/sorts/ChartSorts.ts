import type { Sort } from './sort/Sort';
import type { DefaultSortType } from './sort/types/DefaultSortType';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { SelectedSortByType } from './sort/types/SortType';
import type { SortDirection } from './sort/types/SortDirection';
import type { TimeSortOption } from './sort/types/TimeSortOption';
import type { DataScopeType } from '../types/DataScopeType';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import type { DimensionVisualizationType } from '../selecteddimension/DimensionVisualizationType';
import type { Chart } from '../Chart';

export interface ChartSorts {
  addSelectedSortBy(
    measureOrDimension: Measure | Dimension,
    type: SelectedSortByType,
    sortDirection: SortDirection,
    defaultSortByType?: DefaultSortType,
    aggregationFunction?: AggregationFunction
  ): Sort | null | undefined;

  addSelectedSortByAverageOfMeasures(selectedMeasures: SelectedMeasure[]): Sort | null | undefined;

  addSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
    dimension: Dimension | Measure,
    xAxisCategoriesSelectedDimension: SelectedDimension
  ): Sort | null | undefined;

  addSelectedSortByTime(
    dimension: Dimension | Measure,
    timeSortOption: TimeSortOption,
    sortDirection: SortDirection
  ): Sort | null | undefined;

  changeSelectedSortByAggregationFunction(selectedSortBy: Sort, aggregationFunction: AggregationFunction): void;

  changeSelectedSortByDataScopeType(selectedSortBy: Sort, dataScopeType: DataScopeType): void;

  changeSelectedSortByDirection(selectedSortBy: Sort, sortDirection: SortDirection): void;

  getConvertSelectedSortBys(selectedDimensions: SelectedDimension[]): Sort[];

  getDefaultOfType(defaultType: DefaultSortType): Sort | null | undefined;

  getSelectedSortBys(): Sort[];

  removeSelectedSortBy(selectedSortBy: Sort): void;

  updateSelectedSortBysWhenAddingSelectedDimension(
    measureOrDimension: Dimension | Measure,
    visualizationType: DimensionVisualizationType,
    chart: Chart
  ): void;

  updateSelectedSortBysWhenAddingSelectedMeasure(
    measureOrDimension: Measure | Dimension,
    selectedMeasures: SelectedMeasure[]
  ): void;

  updateSelectedSortBysWhenChangingSelectedMeasureAggregationFunction(
    aggregationFunction: AggregationFunction,
    selectedMeasures: SelectedMeasure[]
  ): void;

  updateSelectedSortBysWhenRemovingSelectedDimension(
    selectedDimension: SelectedDimension,
    selectedMeasures: SelectedMeasure[]
  ): void;

  updateSelectedSortBysWhenRemovingSelectedMeasure(
    selectedMeasure: SelectedMeasure,
    selectedMeasures: SelectedMeasure[]
  ): void;
}

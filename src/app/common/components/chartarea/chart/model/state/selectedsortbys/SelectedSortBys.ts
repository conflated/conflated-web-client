import type { SelectedSortBy } from './selectedsortby/SelectedSortBy';
import type { DefaultSelectedSortByType } from './selectedsortby/types/DefaultSelectedSortByType';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { SelectedSortByType } from './selectedsortby/types/SelectedfSortByType';
import type { SortDirection } from './selectedsortby/types/SortDirection';
import type { TimeSortOption } from './selectedsortby/types/TimeSortOption';
import type { DataScopeType } from '../types/DataScopeType';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import type { DimensionVisualizationType } from '../selecteddimension/types/DimensionVisualizationType';
import type { Chart } from '../Chart';

export interface SelectedSortBys {
  addSelectedSortBy(
    measureOrDimension: Measure | Dimension,
    type: SelectedSortByType,
    sortDirection: SortDirection,
    defaultSortByType?: DefaultSelectedSortByType,
    aggregationFunction?: AggregationFunction
  ): SelectedSortBy | null | undefined;

  addSelectedSortByAverageOfMeasures(selectedMeasures: SelectedMeasure[]): SelectedSortBy | null | undefined;

  addSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
    dimension: Dimension | Measure,
    xAxisCategoriesSelectedDimension: SelectedDimension
  ): SelectedSortBy | null | undefined;

  addSelectedSortByTime(
    dimension: Dimension | Measure,
    timeSortOption: TimeSortOption,
    sortDirection: SortDirection
  ): SelectedSortBy | null | undefined;

  changeSelectedSortByAggregationFunction(
    selectedSortBy: SelectedSortBy,
    aggregationFunction: AggregationFunction
  ): void;

  changeSelectedSortByDataScopeType(selectedSortBy: SelectedSortBy, dataScopeType: DataScopeType): void;

  changeSelectedSortByDirection(selectedSortBy: SelectedSortBy, sortDirection: SortDirection): void;

  getConvertSelectedSortBys(selectedDimensions: SelectedDimension[]): SelectedSortBy[];

  getDefaultOfType(defaultType: DefaultSelectedSortByType): SelectedSortBy | null | undefined;

  getSelectedSortBys(): SelectedSortBy[];

  removeSelectedSortBy(selectedSortBy: SelectedSortBy): void;

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

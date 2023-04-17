import type { Sort } from './sort/Sort';
import type { DefaultSortType } from './sort/types/DefaultSortType';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { SortType } from './sort/types/SortType';
import type { SortDirection } from './sort/types/SortDirection';
import type { TimeSortOption } from './sort/types/TimeSortOption';
import type { DataScope } from '../types/DataScope';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import type { DimensionVisualizationType } from '../selecteddimension/DimensionVisualizationType';
import type { Chart } from '../Chart';

export interface ChartSorts {
  addSort(
    measureOrDimension: Measure | Dimension,
    type: SortType,
    sortDirection: SortDirection,
    defaultSortType?: DefaultSortType,
    aggregationFunction?: AggregationFunction
  ): Sort | null | undefined;

  addSortByAverageOfMeasures(selectedMeasures: SelectedMeasure[]): Sort | null | undefined;

  addSortByMeasureOverLegendPartitionedByXAxisCategories(
    dimension: Dimension | Measure,
    xAxisCategoriesSelectedDimension: SelectedDimension
  ): Sort | null | undefined;

  addSortByTime(
    dimension: Dimension | Measure,
    timeSortOption: TimeSortOption,
    sortDirection: SortDirection
  ): Sort | null | undefined;

  changeSortAggregationFunction(sort: Sort, aggregationFunction: AggregationFunction): void;

  changeSortDataScope(sort: Sort, dataScope: DataScope): void;

  changeSortDirection(sort: Sort, sortDirection: SortDirection): void;

  getConvertedSorts(selectedDimensions: SelectedDimension[]): Sort[];

  getDefaultSortOfType(defaultSortType: DefaultSortType): Sort | null | undefined;

  getSorts(): Sort[];

  removeSort(sort: Sort): void;

  updateSortsWhenAddingSelectedDimension(
    measureOrDimension: Dimension | Measure,
    visualizationType: DimensionVisualizationType,
    chart: Chart
  ): void;

  updateSortsWhenAddingSelectedMeasure(
    measureOrDimension: Measure | Dimension,
    selectedMeasures: SelectedMeasure[]
  ): void;

  updateSortsWhenChangingSelectedMeasureAggregationFunction(
    aggregationFunction: AggregationFunction,
    selectedMeasures: SelectedMeasure[]
  ): void;

  updateSortsWhenRemovingSelectedDimension(
    selectedDimension: SelectedDimension,
    selectedMeasures: SelectedMeasure[]
  ): void;

  updateSortsWhenRemovingSelectedMeasure(selectedMeasure: SelectedMeasure, selectedMeasures: SelectedMeasure[]): void;
}

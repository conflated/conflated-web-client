/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import type { Filter } from '../filters/filter/Filter';
import type { SelectedSortBy } from '../selectedsortbys/selectedsortby/SelectedSortBy';
import type { DimensionVisualizationType } from '../selecteddimension/DimensionVisualizationType';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { DataScopeType } from '../types/DataScopeType';
import type { TriggersPageStateNamespace } from '../../../../../page/triggers/model/state/TriggersPageStateNamespace';
import type { ColumnNameToValuesMap } from './ColumnNameToValuesMap';

export interface ChartData {
  filterChartData(selectedFilters: Filter[], dataScopeType?: DataScopeType): void;

  getAllValues(selectedFilter: Filter): Array<any>;

  getBubbleChartData(
    selectedMeasures: SelectedMeasure[],
    selectedDimensions: SelectedDimension[]
  ): [any[], any[], any[], any[]];

  getChartDataAsRows(): Array<{ [key: string]: any }>;

  getColumnNameToValuesMap(): ColumnNameToValuesMap;

  getForSelectedMeasure(selectedMeasure: SelectedMeasure | null | undefined): Array<any>;

  getForSelectedDimension(selectedDimension: SelectedDimension | null | undefined): Array<any>;

  getForSelectedMeasureOfType(
    selectedMeasures: SelectedMeasure[],
    visualizationType: MeasureVisualizationType
  ): Array<any>;

  getForSelectedDimensionOfType(
    selectedDimensions: SelectedDimension[],
    visualizationType: DimensionVisualizationType
  ): Array<any>;

  getForSelectedFilter(selectedFilter: Filter | null | undefined): Array<any>;

  getForSelectedSortBy(selectedSortBy: SelectedSortBy | null | undefined): Array<any>;

  getMinAndMaxValueForSelectedFilter(selectedFilter: Filter): [number, number];

  getMapLocationData(selectedDimensions: SelectedDimension[]): [Array<any>, Array<any>];

  getScatterChartData(
    selectedMeasures: SelectedMeasure[],
    selectedDimensions: SelectedDimension[]
  ): [any[], any[], any[]];

  getAreaRangeChartData(
    selectedMeasures: SelectedMeasure[],
    selectedDimensions: SelectedDimension[]
  ): [any[], any[], any[], any[], any[]];

  getTriggerData(stateNamespace: TriggersPageStateNamespace): [Array<any>, Array<any>, Array<any>];
  getTriggerGroupData(stateNamespace: TriggersPageStateNamespace): [Array<any>, Array<any>];

  sortChartData(selectedSortBys: SelectedSortBy[], dataScopeType?: DataScopeType): void;
}

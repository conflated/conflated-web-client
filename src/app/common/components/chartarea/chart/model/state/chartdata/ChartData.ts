/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import type { SelectedFilter } from '../selectedfilters/selectedfilter/SelectedFilter';
import type { SelectedSortBy } from '../selectedsortbys/selectedsortby/SelectedSortBy';
import type { DimensionVisualizationType } from '../selecteddimension/types/DimensionVisualizationType';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { DataScopeType } from '../types/DataScopeType';
import type { TriggersPageStateNamespace } from '../../../../../page/triggers/model/state/TriggersPageStateNamespace';
import type { ColumnNameToValuesMap } from './ColumnNameToValuesMap';

export interface ChartData {
  filterChartData(selectedFilters: SelectedFilter[], dataScopeType?: DataScopeType): void;

  getAllValues(selectedFilter: SelectedFilter): Array<any>;

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

  getForSelectedFilter(selectedFilter: SelectedFilter | null | undefined): Array<any>;

  getForSelectedSortBy(selectedSortBy: SelectedSortBy | null | undefined): Array<any>;

  getMinAndMaxValueForSelectedFilter(selectedFilter: SelectedFilter): [number, number];

  getMapLocationData(selectedDimensions: SelectedDimension[]): [Array<any>, Array<any>];

  getScatterChartData(
    selectedMeasures: SelectedMeasure[],
    selectedDimensions: SelectedDimension[]
  ): [any[], any[], any[]];

  getTriggerData(pageStateNamespace: TriggersPageStateNamespace): [Array<any>, Array<any>, Array<any>];
  getTriggerGroupData(pageStateNamespace: TriggersPageStateNamespace): [Array<any>, Array<any>];

  sortChartData(selectedSortBys: SelectedSortBy[], dataScopeType?: DataScopeType): void;
}

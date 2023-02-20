import type { ColumnNameToValuesMap } from './chartdata/ColumnNameToValuesMap';
import type { SelectedSortBy } from './selectedsortbys/selectedsortby/SelectedSortBy';
import type { ChartType } from './types/ChartType';
import type { DataSource } from './datasource/DataSource';
import type { SelectedMeasure } from './selectedmeasure/SelectedMeasure';
import type { SelectedDimension } from './selecteddimension/SelectedDimension';
import type { DrillDown } from './types/DrillDown';
import type { DataPoint } from './types/DataPoint';
import type { ChartMenuConfirmationType } from './types/ChartMenuConfirmationType';
import type { SelectedFilter } from './selectedfilters/selectedfilter/SelectedFilter';

export type ChartConfiguration = {
  id: string;
  chartType: ChartType;
  dataSource: DataSource;
  selectedMeasures: SelectedMeasure[];
  selectedDimensions: SelectedDimension[];
  selectedFilters: SelectedFilter[];
  selectedSortBys: SelectedSortBy[];
  chartData: ColumnNameToValuesMap;
  xAxisCategoriesShownCount: number;
  fetchedRowCount: number;
  xAxisScrollPosition?: number;
  isFetchingChartData?: boolean;
  selectedDataPointIndex?: number;
  drillDowns?: DrillDown[];
  currentDrillDownSelectedDimension?: SelectedDimension;
  selectedDataPoints?: DataPoint[];
  isExportMenuOpen?: boolean;
  exportMenuCloseTimeoutID?: ReturnType<typeof setTimeout> | 0;
  menuConfirmationType?: ChartMenuConfirmationType;
};

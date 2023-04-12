import type { ColumnNameToValuesMap } from './data/ColumnNameToValuesMap';
import type { Sort } from './sorts/sort/Sort';
import type { ChartType } from './types/ChartType';
import type { DataSource } from './datasource/DataSource';
import type { SelectedMeasure } from './selectedmeasure/SelectedMeasure';
import type { SelectedDimension } from './selecteddimension/SelectedDimension';
import type { DrillDown } from './types/DrillDown';
import type { DataPoint } from './types/DataPoint';
import type { ChartMenuConfirmationType } from './types/ChartMenuConfirmationType';
import type { Filter } from './filters/filter/Filter';

export type ChartConfiguration = {
  id: string;
  chartType: ChartType;
  dataSource: DataSource;
  selectedMeasures: SelectedMeasure[];
  selectedDimensions: SelectedDimension[];
  selectedFilters: Filter[];
  selectedSortBys: Sort[];
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

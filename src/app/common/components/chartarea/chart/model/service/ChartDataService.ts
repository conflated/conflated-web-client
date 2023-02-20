import type { ColumnNameToValuesMap } from '../state/chartdata/ColumnNameToValuesMap';
import type { Column } from '../state/types/Column';
import type { MinMaxMeasureColumn } from '../state/types/MinMaxMeasureColumn';
import type { DataSource } from '../state/datasource/DataSource';
import type { SelectedSortBy } from '../state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { SelectedFilter } from '../state/selectedfilters/selectedfilter/SelectedFilter';

export interface ChartDataService {
  fetchChartData(
    dataSource: DataSource,
    columns: Column[],
    filters: SelectedFilter[],
    sortBys: SelectedSortBy[]
  ): Promise<ColumnNameToValuesMap>;

  fetchMinAndMaxValues(
    dataSource: DataSource,
    minMaxMeasureColumns: MinMaxMeasureColumn[],
    dimensionColumns: Column[],
    filters: SelectedFilter[]
  ): Promise<ColumnNameToValuesMap>;

  fetchDimensionValues(dataSource: DataSource, dimensionColumns: Column[]): Promise<ColumnNameToValuesMap>;
}

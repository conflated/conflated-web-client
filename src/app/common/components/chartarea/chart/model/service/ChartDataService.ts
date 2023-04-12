import type { ColumnNameToValuesMap } from '../state/chartdata/ColumnNameToValuesMap';
import type { Column } from '../state/types/Column';
import type { MinMaxMeasureColumn } from '../state/types/MinMaxMeasureColumn';
import type { DataSource } from '../state/datasource/DataSource';
import type { Sort } from '../state/sorts/sort/Sort';
import type { Filter } from '../state/filters/filter/Filter';

export interface ChartDataService {
  fetchChartData(
    dataSource: DataSource,
    columns: Column[],
    filters: Filter[],
    sortBys: Sort[]
  ): Promise<ColumnNameToValuesMap>;

  fetchMinAndMaxValues(
    dataSource: DataSource,
    minMaxMeasureColumns: MinMaxMeasureColumn[],
    dimensionColumns: Column[],
    filters: Filter[]
  ): Promise<ColumnNameToValuesMap>;

  fetchDimensionValues(dataSource: DataSource, dimensionColumns: Column[]): Promise<ColumnNameToValuesMap>;
}

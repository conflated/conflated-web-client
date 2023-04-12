import type { Column } from '../state/types/Column';
import type { ColumnNameToValuesMap } from '../state/chartdata/ColumnNameToValuesMap';
import type { MinMaxMeasureColumn } from '../state/types/MinMaxMeasureColumn';
import { ChartDataService } from './ChartDataService';
import HashValueCalculator from '../../../../../utils/HashValueCalculator';
import type { DataSource } from '../state/datasource/DataSource';
import type { SelectedSortBy } from '../state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { Filter } from '../state/filters/filter/Filter';

// TODO Encrypt cached data
export default class CachingChartDataService implements ChartDataService {
  static MAX_NUMBER_OF_CHART_DATAS_STORED = 50;

  static CACHED_CHART_DATA_KEYS = 'ChartDataCache-cachedChartDataKeys';

  constructor(private readonly chartDataService: ChartDataService) {}

  fetchChartData(
    dataSource: DataSource,
    columns: Column[],
    selectedFilters: Filter[],
    selectedSortBys: SelectedSortBy[]
  ): Promise<ColumnNameToValuesMap> {
    const chartDataKey = `ChartDataCache-ChartData-${HashValueCalculator.hashObject({
      dataSource,
      columns,
      filters: selectedFilters,
      sortBys: selectedSortBys
    })}`;

    const cachedChartDataInJson = localStorage.getItem(chartDataKey);

    if (cachedChartDataInJson) {
      return new Promise<ColumnNameToValuesMap>((resolve) => {
        const cachedChartData = JSON.parse(cachedChartDataInJson);
        resolve(cachedChartData);
      });
    }

    const chartDataFetchPromise = this.chartDataService.fetchChartData(
      dataSource,
      columns,
      selectedFilters,
      selectedSortBys
    );

    chartDataFetchPromise.then((columnNameToValuesMap: ColumnNameToValuesMap) => {
      let cachedChartDataKeys = [];
      const cachedChartDataKeysInJson = localStorage.getItem(CachingChartDataService.CACHED_CHART_DATA_KEYS);

      if (cachedChartDataKeysInJson) {
        cachedChartDataKeys = JSON.parse(cachedChartDataKeysInJson);
      }

      if (cachedChartDataKeys.length > CachingChartDataService.MAX_NUMBER_OF_CHART_DATAS_STORED) {
        const firstChartDataKey = cachedChartDataKeys.shift();
        localStorage.removeItem(firstChartDataKey);
      }

      const chartDataInJson = JSON.stringify(columnNameToValuesMap);

      let cacheUpdated = false;

      while (!cacheUpdated && cachedChartDataKeys.length > 0) {
        // noinspection UnusedCatchParameterJS
        try {
          localStorage.setItem(chartDataKey, chartDataInJson);
        } catch (error) {
          const firstChartDataKey = cachedChartDataKeys.shift();
          localStorage.removeItem(firstChartDataKey);
        }
        cacheUpdated = true;
      }

      cachedChartDataKeys.push(chartDataKey);
      localStorage.setItem(CachingChartDataService.CACHED_CHART_DATA_KEYS, JSON.stringify(cachedChartDataKeys));
    });

    return chartDataFetchPromise;
  }

  fetchMinAndMaxValues(
    dataSource: DataSource,
    minMaxMeasureColumns: MinMaxMeasureColumn[],
    dimensionColumns: Column[],
    selectedFilters: Filter[]
  ): Promise<ColumnNameToValuesMap> {
    return this.chartDataService.fetchMinAndMaxValues(
      dataSource,
      minMaxMeasureColumns,
      dimensionColumns,
      selectedFilters
    );
  }

  fetchDimensionValues(dataSource: DataSource, dimensionColumns: Column[]): Promise<ColumnNameToValuesMap> {
    return this.chartDataService.fetchDimensionValues(dataSource, dimensionColumns);
  }
}

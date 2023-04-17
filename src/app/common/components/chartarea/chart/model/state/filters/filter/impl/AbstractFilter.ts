/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';
import type { FilterType } from '../FilterType';
import type { FilterInputType } from '../inputtype/FilterInputType';
import type { DataScope } from '../../../types/DataScope';
import type { Filter } from '../Filter';
import type { FilterConfiguration } from '../FilterConfiguration';
import type { ColumnNameToValuesMap } from '../../../data/ColumnNameToValuesMap';
import type { ChartData } from '../../../data/ChartData';
import { Chart } from '../../../Chart';

export default abstract class AbstractFilter implements Filter {
  readonly measureOrDimension: Measure | Dimension;

  readonly sqlColumn: {
    readonly name: string;
    readonly expression: string;
  };

  readonly aggregationFunction: AggregationFunction;

  readonly type: FilterType;

  readonly filterExpression: string;

  readonly filterInputType: FilterInputType;

  readonly dataScope: DataScope;

  readonly allowedDimensionFilterInputTypes: FilterInputType[];

  readonly filteringChart: Chart | null;

  readonly isDrillDownFilter: boolean;

  constructor(filterConfiguration: FilterConfiguration) {
    this.measureOrDimension = filterConfiguration.measureOrDimension;
    this.sqlColumn = filterConfiguration.sqlColumn;
    this.aggregationFunction = filterConfiguration.aggregationFunction;
    this.type = filterConfiguration.type;
    this.filterExpression = filterConfiguration.filterExpression;
    this.filterInputType = filterConfiguration.filterInputType;
    this.dataScope = filterConfiguration.dataScopeType;
    this.allowedDimensionFilterInputTypes = filterConfiguration.allowedDimensionFilterInputTypes;
    this.filteringChart = filterConfiguration.filteringChart;
    this.isDrillDownFilter = filterConfiguration.isDrillDownFilter;
  }

  getConfiguration(): FilterConfiguration {
    return {
      measureOrDimension: this.measureOrDimension,
      sqlColumn: this.sqlColumn,
      aggregationFunction: this.aggregationFunction,
      type: this.type,
      filterExpression: this.filterExpression,
      filterInputType: this.filterInputType,
      dataScopeType: this.dataScope,
      allowedDimensionFilterInputTypes: this.allowedDimensionFilterInputTypes,
      filteringChart: this.filteringChart,
      isDrillDownFilter: this.isDrillDownFilter
    };
  }

  abstract applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap;

  abstract getFilterInputView(
    className: string,
    chartData: ChartData,
    changeFilterExpression: (filterExpression: string) => void
  ): JSX.Element;

  filterChartDataOtherColumns(chartData: ColumnNameToValuesMap, filteredInIndexes: number[]): ColumnNameToValuesMap {
    const newChartData = chartData;

    if (!_.isEmpty(filteredInIndexes)) {
      Object.keys(chartData)
        .filter((column: string) => !column.endsWith('___') && column !== this.sqlColumn.name)
        .forEach((column: string) => {
          if (chartData[column]) {
            newChartData[column] = (chartData as any)[column].filter((unused: any, index: number) =>
              filteredInIndexes.includes(index)
            );
          }
        });
    }

    return newChartData;
  }

  shouldFetchChartData(chartData: ChartData): boolean {
    const filterValues = chartData.getForFilter(this);

    return (
      (this.type === 'measure' &&
        this.filterInputType === 'Range filter' &&
        this.dataScope === 'already fetched' &&
        !filterValues) ||
      (this.type === 'dimension' &&
        this.dataScope === 'already fetched' &&
        !filterValues &&
        (this.filterInputType === 'Dropdown filter' ||
          this.filterInputType === 'Checkboxes filter' ||
          this.filterInputType === 'Radio buttons filter'))
    );
  }

  shouldFetchDimensionValues(chartData: ChartData): boolean {
    const allFilterValues = chartData.getAllValues(this);

    return (
      this.type === 'dimension' &&
      this.dataScope === 'all' &&
      !allFilterValues &&
      (this.filterInputType === 'Dropdown filter' ||
        this.filterInputType === 'Checkboxes filter' ||
        this.filterInputType === 'Radio buttons filter')
    );
  }

  shouldFetchMeasureMinMaxValues(chartData: ChartData): boolean {
    const [minValue, maxValue] = chartData.getMinAndMaxValueForFilter(this);

    return (
      this.type === 'measure' &&
      this.filterInputType === 'Range filter' &&
      this.dataScope === 'all' &&
      minValue == null &&
      maxValue == null
    );
  }
}
